import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { products } from '../../data/products';
import { SITE_URL } from '../../lib/site';
import { getClientIp, rateLimit } from '../../lib/rateLimit';
import { FREE_GIFT_SLUG } from '../../lib/cart';

const MAX_QTY = 10;
const MAX_KITS = 10;
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60_000;

type CartLineInput = {
	slug?: unknown;
	qty?: unknown;
	isBulk?: unknown;
	isFree?: unknown;
};

export async function POST(request: Request) {
	const ip = getClientIp(request);
	const { allowed, retryAfterSeconds } = rateLimit(
		`checkout:${ip}`,
		RATE_LIMIT,
		RATE_WINDOW_MS,
	);
	if (!allowed) {
		return NextResponse.json(
			{ error: 'Too many requests. Please try again shortly.' },
			{ status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } },
		);
	}

	const apiKey = process.env.STRIPE_SECRET_KEY;
	if (!apiKey) {
		console.error('STRIPE_SECRET_KEY is not set');
		return NextResponse.json(
			{ error: 'Payments are not configured.' },
			{ status: 500 },
		);
	}

	let body: { items?: CartLineInput[] };
	try {
		body = await request.json();
	} catch {
		return NextResponse.json(
			{ error: 'Invalid request body.' },
			{ status: 400 },
		);
	}

	const rawItems = Array.isArray(body.items) ? body.items : [];
	if (rawItems.length === 0) {
		return NextResponse.json({ error: 'Your cart is empty.' }, { status: 400 });
	}

	const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

	for (const line of rawItems) {
		const slug = typeof line.slug === 'string' ? line.slug : null;
		const product = slug ? products.find((p) => p.slug === slug) : undefined;

		if (!product) {
			return NextResponse.json(
				{ error: `Unknown product in cart: ${String(line.slug)}` },
				{ status: 400 },
			);
		}

		if (!product.inStock) {
			return NextResponse.json(
				{ error: `${product.name} is currently out of stock.` },
				{ status: 400 },
			);
		}

		const isBulk = line.isBulk === true;

		if (isBulk && !product.kitEligible) {
			return NextResponse.json(
				{ error: `${product.name} is not available as a kit of 10.` },
				{ status: 400 },
			);
		}

		const cap = isBulk ? MAX_KITS : MAX_QTY;
		const rawQty = Number(line.qty);
		const qty = Math.min(cap, Math.max(1, Math.floor(rawQty)));

		if (!Number.isFinite(rawQty) || qty <= 0) {
			return NextResponse.json(
				{ error: `Invalid quantity for ${product.name}.` },
				{ status: 400 },
			);
		}

		// The free-gift flag is only ever honored for the one designated
		// product, at qty 1 — a client sending isFree on anything else (or a
		// larger qty) just gets charged normally instead of erroring out.
		const isFreeGift =
			line.isFree === true && slug === FREE_GIFT_SLUG && !isBulk;

		// Price is always recomputed from our own catalog — never trust a
		// client-supplied amount.
		const unitPrice = isFreeGift
			? 0
			: isBulk
				? product.bulkPrice10
				: product.price;

		lineItems.push({
			quantity: isFreeGift ? 1 : qty,
			price_data: {
				currency: 'usd',
				unit_amount: Math.round(unitPrice * 100),
				product_data: {
					name: isBulk ? `${product.name} — Kit of 10` : product.name,
					metadata: {
						slug: product.slug,
						is_bulk: String(isBulk),
					},
				},
			},
		});
	}

	const origin = request.headers.get('origin') || SITE_URL;
	const stripe = new Stripe(apiKey);

	try {
		const session = await stripe.checkout.sessions.create({
			mode: 'payment',
			// Without this, Stripe falls back to auto-detecting locale from the
			// buyer's browser and shows "US$35.00" instead of "$35.00" whenever
			// it can't confirm the locale maps unambiguously to USD.
			locale: 'en',
			line_items: lineItems,
			payment_method_types: ['card'],
			shipping_address_collection: {
				allowed_countries: ['US'],
			},
			phone_number_collection: {
				enabled: true,
			},
			consent_collection: {
				terms_of_service: 'required',
			},
			custom_text: {
				terms_of_service_acceptance: {
					message:
						'I am 21+ and confirm these compounds are for in-vitro laboratory research only — not for human or veterinary use. See our [Research Use Only](https://nudacompounds.com/research-use-only) page.',
				},
			},
			success_url: `${origin}/order/confirmed?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${origin}/products`,
		});

		if (!session.url) {
			throw new Error('Stripe did not return a session URL.');
		}

		return NextResponse.json({ url: session.url });
	} catch (err) {
		console.error('Stripe checkout session creation failed:', err);
		return NextResponse.json(
			{ error: 'Unable to start checkout. Please try again.' },
			{ status: 500 },
		);
	}
}
