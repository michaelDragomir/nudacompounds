import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';
import { getSupabaseAdmin } from '../../../lib/supabaseAdmin';

const FROM_ADDRESS = 'Nuda Compounds <hello@nudacompounds.com>';
const MERCHANT_EMAIL = process.env.CONTACT_EMAIL || 'hello@nudacompounds.com';

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
		console.error('Stripe async-payment-failed webhook processing failed:', err);
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
	total: number;
};

type ItemRow = {
	product_name: string;
	quantity: number;
	line_total: number;
};

async function sendOrderEmails(order: OrderRow, items: ItemRow[]) {
	const apiKey = process.env.RESEND_API_KEY;
	if (!apiKey) {
		console.error(
			'RESEND_API_KEY is not set — skipping order notification emails.',
		);
		return;
	}

	const resend = new Resend(apiKey);
	const itemLines = items
		.map(
			(item) =>
				`- ${item.product_name} x${item.quantity} — $${formatCents(item.line_total)}`,
		)
		.join('\n');

	const shippingLine = `Shipping to: ${order.customer_address || 'Not provided'}`;
	const phoneLine = order.customer_phone
		? `Phone: ${order.customer_phone}`
		: null;

	try {
		await resend.emails.send({
			from: FROM_ADDRESS,
			to: MERCHANT_EMAIL,
			subject: `New order ${order.order_number} — $${formatCents(order.total)}`,
			text: [
				'New order placed.',
				'',
				`Order: ${order.order_number}`,
				`Customer: ${order.customer_email}`,
				phoneLine,
				shippingLine,
				`Total: $${formatCents(order.total)}`,
				'',
				'Items:',
				itemLines,
			]
				.filter((line) => line !== null)
				.join('\n'),
		});

		await resend.emails.send({
			from: FROM_ADDRESS,
			to: order.customer_email,
			subject: `Your Nuda Compounds order ${order.order_number}`,
			text: [
				'Thanks for your order!',
				'',
				`Order: ${order.order_number}`,
				`Total: $${formatCents(order.total)}`,
				shippingLine,
				phoneLine,
				'',
				'Items:',
				itemLines,
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
