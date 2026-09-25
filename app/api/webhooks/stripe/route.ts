import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';
import { getSupabaseAdmin } from '../../../lib/supabaseAdmin';
import { FREE_SHIPPING_THRESHOLD } from '../../../lib/cart';

const FROM_ADDRESS = 'Nuda Compounds <hello@nudacompounds.com>';
const MERCHANT_EMAIL = process.env.CONTACT_EMAIL || 'hello@nudacompounds.com';

// Site palette (see app/globals.css) — kept as literal hex/hsl-equivalent
// values here since email clients can't read CSS custom properties.
const COLOR_NAVY = '#2f4a78';
const COLOR_NAVY_DARK = '#131f38';
const COLOR_AMBER = '#d9a05b';
const COLOR_AMBER_DARK = '#c48a3d';
const COLOR_OFFWHITE = '#faf9f6';
const COLOR_CHARCOAL = '#2e2e2e';

function formatCents(cents: number) {
	return (cents / 100).toFixed(2);
}

function formatShippingAddress(
	shipping:
		| Stripe.Checkout.Session.CollectedInformation.ShippingDetails
		| null
		| undefined,
) {
	const address = shipping?.address;
	if (!address || !address.line1) return null;

	const parts = [
		address.line1,
		address.line2,
		[address.city, address.state, address.postal_code]
			.filter(Boolean)
			.join(', '),
		address.country,
	].filter(Boolean);

	return parts.join(', ');
}

export async function POST(request: Request) {
	const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
	const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

	if (!stripeSecretKey || !webhookSecret) {
		console.error(
			'Stripe webhook is not configured (missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET).',
		);
		return NextResponse.json(
			{ error: 'Webhook not configured.' },
			{ status: 500 },
		);
	}

	const signature = request.headers.get('stripe-signature');
	if (!signature) {
		return NextResponse.json(
			{ error: 'Missing Stripe signature.' },
			{ status: 400 },
		);
	}

	const stripe = new Stripe(stripeSecretKey);
	const rawBody = await request.text();

	let event: Stripe.Event;
	try {
		event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
	} catch (err) {
		console.error('Stripe webhook signature verification failed:', err);
		return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 });
	}

	if (event.type === 'charge.refunded') {
		return handleChargeRefunded(event.data.object as Stripe.Charge);
	}

	if (event.type === 'checkout.session.async_payment_failed') {
		return handleAsyncPaymentFailed(
			event.data.object as Stripe.Checkout.Session,
		);
	}

	if (event.type !== 'checkout.session.completed') {
		return NextResponse.json({ received: true });
	}

	const session = event.data.object as Stripe.Checkout.Session;

	try {
		const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
			expand: ['data.price.product'],
			limit: 100,
		});

		const supabase = getSupabaseAdmin();

		// Idempotency guard: if this session was already fully processed (a
		// prior delivery of this same event, or a Stripe retry), skip
		// straight to done. Without this, a retried webhook would re-send
		// both notification emails every time.
		const { data: existingOrder } = await supabase
			.from('orders')
			.select('id, status')
			.eq('stripe_session_id', session.id)
			.maybeSingle();

		if (existingOrder && existingOrder.status === 'paid') {
			return NextResponse.json({ received: true, alreadyProcessed: true });
		}

		const shippingAddress = formatShippingAddress(
			session.collected_information?.shipping_details,
		);
		if (!shippingAddress) {
			console.error(
				`Checkout session ${session.id} completed with no shipping address — shipping_address_collection may be misconfigured.`,
			);
		}

		const { data: order, error: orderError } = await supabase
			.from('orders')
			.upsert(
				{
					stripe_session_id: session.id,
					stripe_payment_intent_id:
						typeof session.payment_intent === 'string'
							? session.payment_intent
							: null,
					status: 'paid',
					customer_email:
						session.customer_details?.email || 'unknown@nudacompounds.com',
					customer_name: session.customer_details?.name || null,
					customer_address: shippingAddress || 'Not provided',
					customer_phone: session.customer_details?.phone || null,
					subtotal: session.amount_subtotal ?? session.amount_total ?? 0,
					total: session.amount_total ?? 0,
					currency: session.currency || 'usd',
					updated_at: new Date().toISOString(),
				},
				{ onConflict: 'stripe_session_id' },
			)
			.select()
			.single();

		if (orderError || !order) {
			throw orderError || new Error('Order upsert returned no row.');
		}

		// Clear any existing items for this order — a safe no-op on first
		// delivery, and correct behavior if Stripe retries after a prior
		// partial failure.
		const { error: deleteError } = await supabase
			.from('order_items')
			.delete()
			.eq('order_id', order.id);
		if (deleteError) throw deleteError;

		const itemRows = lineItems.data.map((lineItem) => {
			const product = lineItem.price?.product;
			const metadata =
				product && typeof product === 'object' && 'metadata' in product
					? (product.metadata as Record<string, string>)
					: {};

			return {
				order_id: order.id,
				product_slug: metadata.slug || 'unknown',
				product_name: lineItem.description || 'Unknown item',
				is_bulk: metadata.is_bulk === 'true',
				quantity: lineItem.quantity || 1,
				unit_price: lineItem.price?.unit_amount ?? 0,
				line_total: lineItem.amount_total ?? 0,
			};
		});

		if (itemRows.length > 0) {
			const { error: itemsError } = await supabase
				.from('order_items')
				.insert(itemRows);
			if (itemsError) throw itemsError;
		}

		await sendOrderEmails(order, itemRows);

		return NextResponse.json({ received: true });
	} catch (err) {
		console.error('Stripe webhook processing failed:', err);
		return NextResponse.json(
			{ error: 'Webhook processing failed.' },
			{ status: 500 },
		);
	}
}

async function handleChargeRefunded(charge: Stripe.Charge) {
	const paymentIntentId =
		typeof charge.payment_intent === 'string'
			? charge.payment_intent
			: charge.payment_intent?.id;

	if (!paymentIntentId) {
		console.error(
			`Charge ${charge.id} refunded with no associated payment intent — cannot match to an order.`,
		);
		return NextResponse.json({ received: true });
	}

	try {
		const supabase = getSupabaseAdmin();

		const { data: order, error: findError } = await supabase
			.from('orders')
			.select('id, order_number, status, customer_email, total')
			.eq('stripe_payment_intent_id', paymentIntentId)
			.maybeSingle();

		if (findError) throw findError;

		if (!order) {
			console.error(
				`Refund received for payment intent ${paymentIntentId} but no matching order was found.`,
			);
			return NextResponse.json({ received: true });
		}

		// Idempotency guard, same reasoning as the checkout-completed path —
		// a retried delivery of this same event shouldn't re-send the email.
		if (order.status === 'refunded') {
			return NextResponse.json({ received: true, alreadyProcessed: true });
		}

		const { error: updateError } = await supabase
			.from('orders')
			.update({ status: 'refunded', updated_at: new Date().toISOString() })
			.eq('id', order.id);
		if (updateError) throw updateError;

		const isFullRefund = charge.amount_refunded >= charge.amount;
		await sendRefundEmail(order, charge.amount_refunded, isFullRefund);

		return NextResponse.json({ received: true });
	} catch (err) {
		console.error('Stripe refund webhook processing failed:', err);
		return NextResponse.json(
			{ error: 'Webhook processing failed.' },
			{ status: 500 },
		);
	}
}

// Fires when a delayed/async payment method (e.g. Cash App Pay) ultimately
// fails after the customer already left the checkout flow believing they'd
// paid. Without this, the order simply never appears anywhere — the customer
// isn't charged, but no one at Nuda is alerted that a sale fell through.
async function handleAsyncPaymentFailed(session: Stripe.Checkout.Session) {
	try {
		const supabase = getSupabaseAdmin();

		const { data: existingOrder } = await supabase
			.from('orders')
			.select('id, status')
			.eq('stripe_session_id', session.id)
			.maybeSingle();

		if (existingOrder && existingOrder.status === 'failed') {
			return NextResponse.json({ received: true, alreadyProcessed: true });
		}

		const { data: order, error: orderError } = await supabase
			.from('orders')
			.upsert(
				{
					stripe_session_id: session.id,
					stripe_payment_intent_id:
						typeof session.payment_intent === 'string'
							? session.payment_intent
							: null,
					status: 'failed',
					customer_email:
						session.customer_details?.email || 'unknown@nudacompounds.com',
					customer_name: session.customer_details?.name || null,
					customer_address:
						formatShippingAddress(
							session.collected_information?.shipping_details,
						) || 'Not provided',
					customer_phone: session.customer_details?.phone || null,
					subtotal: session.amount_subtotal ?? session.amount_total ?? 0,
					total: session.amount_total ?? 0,
					currency: session.currency || 'usd',
					updated_at: new Date().toISOString(),
				},
				{ onConflict: 'stripe_session_id' },
			)
			.select()
			.single();

		if (orderError || !order) {
			throw orderError || new Error('Order upsert returned no row.');
		}

		await sendAsyncPaymentFailedEmail(order);

		return NextResponse.json({ received: true });
	} catch (err) {
		console.error(
			'Stripe async-payment-failed webhook processing failed:',
			err,
		);
		return NextResponse.json(
			{ error: 'Webhook processing failed.' },
			{ status: 500 },
		);
	}
}

async function sendAsyncPaymentFailedEmail(order: {
	order_number: string;
	customer_email: string;
	total: number;
}) {
	const apiKey = process.env.RESEND_API_KEY;
	if (!apiKey) {
		console.error(
			'RESEND_API_KEY is not set — skipping payment-failed notification email.',
		);
		return;
	}

	const resend = new Resend(apiKey);

	try {
		await resend.emails.send({
			from: FROM_ADDRESS,
			to: MERCHANT_EMAIL,
			subject: `Payment failed for ${order.order_number} — $${formatCents(order.total)}`,
			text: [
				`A delayed payment method (e.g. Cash App Pay) ultimately failed for order ${order.order_number}.`,
				'',
				`Customer: ${order.customer_email}`,
				`Amount: $${formatCents(order.total)}`,
				'',
				'No charge went through — the customer has not paid. Stripe notifies the customer of this directly; no action is needed unless they reach out.',
			].join('\n'),
		});
	} catch (err) {
		console.error('Payment-failed notification email failed:', err);
	}
}

async function sendRefundEmail(
	order: { order_number: string; customer_email: string; total: number },
	amountRefundedCents: number,
	isFullRefund: boolean,
) {
	const apiKey = process.env.RESEND_API_KEY;
	if (!apiKey) {
		console.error(
			'RESEND_API_KEY is not set — skipping refund notification email.',
		);
		return;
	}

	const resend = new Resend(apiKey);

	try {
		await resend.emails.send({
			from: FROM_ADDRESS,
			to: MERCHANT_EMAIL,
			subject: `Order ${order.order_number} refunded — $${formatCents(amountRefundedCents)}`,
			text: [
				`Order ${order.order_number} has been ${isFullRefund ? 'fully' : 'partially'} refunded.`,
				'',
				`Customer: ${order.customer_email}`,
				`Order total: $${formatCents(order.total)}`,
				`Refunded: $${formatCents(amountRefundedCents)}`,
			].join('\n'),
		});
	} catch (err) {
		console.error('Refund notification email failed:', err);
	}
}

type OrderRow = {
	order_number: string;
	customer_email: string;
	customer_address: string | null;
	customer_phone: string | null;
	subtotal: number;
	total: number;
};

type ItemRow = {
	product_name: string;
	quantity: number;
	unit_price: number;
	line_total: number;
};

// A line is the free BAC Water gift if its unit price was zeroed out
// server-side — see the isFreeGift check in /api/checkout/route.ts.
function isFreeLine(item: ItemRow) {
	return item.unit_price === 0;
}

function buildItemLine(item: ItemRow) {
	if (isFreeLine(item)) {
		return `${item.quantity} ${item.product_name} — Included with order`;
	}
	return `${item.quantity} ${item.product_name} — $${formatCents(item.line_total)}`;
}

function buildOrderEmailHtml({
	introHtml,
	order,
	items,
	includeContact,
}: {
	introHtml: string;
	order: OrderRow;
	items: ItemRow[];
	includeContact: boolean;
}) {
	const shipping = order.total - order.subtotal;
	const itemRowsHtml = items
		.map(
			(item) => `
				<tr>
					<td style="padding:10px 0;border-bottom:1px solid #e5e2da;color:${COLOR_NAVY};font-size:14px;">
						${item.quantity} ${item.product_name}
					</td>
					<td style="padding:10px 0;border-bottom:1px solid #e5e2da;color:${isFreeLine(item) ? COLOR_AMBER_DARK : COLOR_NAVY};font-weight:700;font-size:14px;text-align:right;white-space:nowrap;">
						${isFreeLine(item) ? 'Included with order' : `$${formatCents(item.line_total)}`}
					</td>
				</tr>`,
		)
		.join('');

	const contactRowsHtml = includeContact
		? `
				<tr>
					<td style="padding:6px 0;color:${COLOR_CHARCOAL};font-size:14px;"><strong>Customer</strong></td>
					<td style="padding:6px 0;color:${COLOR_CHARCOAL};font-size:14px;text-align:right;">${order.customer_email}</td>
				</tr>
				${
					order.customer_phone
						? `<tr>
					<td style="padding:6px 0;color:${COLOR_CHARCOAL};font-size:14px;"><strong>Phone</strong></td>
					<td style="padding:6px 0;color:${COLOR_CHARCOAL};font-size:14px;text-align:right;">${order.customer_phone}</td>
				</tr>`
						: ''
				}`
		: '';

	return `
<!DOCTYPE html>
<html>
	<body style="margin:0;padding:0;background-color:${COLOR_OFFWHITE};font-family:Helvetica,Arial,sans-serif;">
		<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${COLOR_OFFWHITE};padding:32px 16px;">
			<tr>
				<td align="center">
					<table role="presentation" width="100%" style="max-width:520px;background-color:#ffffff;border-radius:16px;border:1px solid rgba(217,160,91,0.4);overflow:hidden;">
						<tr>
							<td style="background-color:${COLOR_NAVY_DARK};padding:24px 32px;">
								<span style="color:${COLOR_AMBER};font-size:12px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;">Nuda Compounds</span>
							</td>
						</tr>
						<tr>
							<td style="padding:32px;">
								${introHtml}

								<table role="presentation" width="100%" style="margin-top:16px;">
									<tr>
										<td style="padding:6px 0;color:${COLOR_CHARCOAL};font-size:14px;"><strong>Order</strong></td>
										<td style="padding:6px 0;color:${COLOR_NAVY};font-size:14px;font-weight:700;text-align:right;">${order.order_number}</td>
									</tr>
									${contactRowsHtml}
								</table>

								<hr style="border:none;border-top:1px solid #e5e2da;margin:20px 0;" />

								<p style="margin:0 0 8px;color:${COLOR_CHARCOAL};font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">Items</p>
								<table role="presentation" width="100%" style="border-collapse:collapse;">
									${itemRowsHtml}
								</table>

								<table role="presentation" width="100%" style="margin-top:12px;">
									<tr>
										<td style="padding:4px 0;color:${COLOR_CHARCOAL};font-size:13px;">Subtotal</td>
										<td style="padding:4px 0;color:${COLOR_CHARCOAL};font-size:13px;text-align:right;">$${formatCents(order.subtotal)}</td>
									</tr>
									<tr>
										<td style="padding:4px 0;color:${COLOR_CHARCOAL};font-size:13px;">Shipping</td>
										<td style="padding:4px 0;color:${COLOR_CHARCOAL};font-size:13px;text-align:right;">${shipping === 0 ? 'Free' : `$${formatCents(shipping)}`}</td>
									</tr>
								</table>
								<p style="margin:4px 0 0;color:${COLOR_CHARCOAL};font-size:11px;opacity:0.6;">Free shipping on orders over $${FREE_SHIPPING_THRESHOLD}.</p>

								<hr style="border:none;border-top:1px solid #e5e2da;margin:16px 0;" />

								<table role="presentation" width="100%">
									<tr>
										<td style="padding:2px 0;color:${COLOR_NAVY};font-size:16px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;">Total</td>
										<td style="padding:2px 0;color:${COLOR_AMBER_DARK};font-size:20px;font-weight:700;text-align:right;">$${formatCents(order.total)}</td>
									</tr>
								</table>

								<hr style="border:none;border-top:1px solid #e5e2da;margin:20px 0;" />

								<p style="margin:0 0 10px;color:${COLOR_CHARCOAL};font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">Shipping to:</p>
								<p style="margin:0;color:${COLOR_CHARCOAL};font-size:14px;">${order.customer_address || 'Not provided'}</p>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	</body>
</html>`;
}

async function sendOrderEmails(order: OrderRow, items: ItemRow[]) {
	const apiKey = process.env.RESEND_API_KEY;
	if (!apiKey) {
		console.error(
			'RESEND_API_KEY is not set — skipping order notification emails.',
		);
		return;
	}

	const resend = new Resend(apiKey);
	const itemLines = items.map(buildItemLine).join('\n');
	const shipping = order.total - order.subtotal;
	const shippingLine = `Shipping: ${shipping === 0 ? 'Free' : `$${formatCents(shipping)}`} (free over $${FREE_SHIPPING_THRESHOLD})`;
	const addressLine = `Shipping to: ${order.customer_address || 'Not provided'}`;
	const phoneLine = order.customer_phone
		? `Phone: ${order.customer_phone}`
		: null;

	try {
		await resend.emails.send({
			from: FROM_ADDRESS,
			to: MERCHANT_EMAIL,
			subject: `New order ${order.order_number} — $${formatCents(order.total)}`,
			html: buildOrderEmailHtml({
				introHtml: `<h1 style="margin:0;color:${COLOR_NAVY};font-size:22px;">New order placed</h1>`,
				order,
				items,
				includeContact: true,
			}),
			text: [
				'New order placed.',
				'',
				`Order: ${order.order_number}`,
				`Customer: ${order.customer_email}`,
				phoneLine,
				'',
				'Items:',
				itemLines,
				'',
				`Subtotal: $${formatCents(order.subtotal)}`,
				shippingLine,
				`Total: $${formatCents(order.total)}`,
				'',
				addressLine,
			]
				.filter((line) => line !== null)
				.join('\n'),
		});

		await resend.emails.send({
			from: FROM_ADDRESS,
			to: order.customer_email,
			subject: `Your Nuda Compounds Order Confirmation`,
			html: buildOrderEmailHtml({
				introHtml: `
					<p style="margin:0 0 4px;color:${COLOR_AMBER_DARK};font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;">Order Confirmed</p>
					<h1 style="margin:0;color:${COLOR_NAVY};font-size:22px;">Thank you for your order!</h1>`,
				order,
				items,
				includeContact: false,
			}),
			text: [
				'Thank you for ordering from Nuda Compounds!',
				'',
				`Order: ${order.order_number}`,
				'',
				'Items:',
				itemLines,
				'',
				`Subtotal: $${formatCents(order.subtotal)}`,
				shippingLine,
				`Total: $${formatCents(order.total)}`,
				'',
				addressLine,
				phoneLine,
				'',
			]
				.filter((line) => line !== null)
				.join('\n'),
		});
	} catch (err) {
		// Money and DB state are already correct at this point — an email
		// hiccup shouldn't fail the webhook and trigger a Stripe retry.
		console.error('Order notification email failed:', err);
	}
}
