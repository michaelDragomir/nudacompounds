'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckoutElementsProvider } from '@stripe/react-stripe-js/checkout';
import { useCart } from '../context/CartContext';
import { stripePromise } from '../lib/stripeClient';
import { checkoutAppearance } from './checkoutAppearance';
import { CheckoutForm } from './CheckoutForm';

type CartLine = {
	slug: string;
	qty: number;
	isBulk: boolean;
	isFree?: boolean;
};

// Cart edits made after the Stripe session is created (e.g. via the cart
// drawer, in another tab) never reach it — Stripe re-derives the session's
// line items from `items` server-side each time, but only when we actually
// create a new session. Debounced so a burst of quantity clicks results in
// one new session, not one per click.
const RECREATE_DEBOUNCE_MS = 600;

function cartKey(items: CartLine[]) {
	return [...items]
		.sort((a, b) =>
			`${a.slug}-${a.isBulk}-${a.isFree}`.localeCompare(
				`${b.slug}-${b.isBulk}-${b.isFree}`,
			),
		)
		.map((line) => `${line.slug}:${line.qty}:${line.isBulk}:${!!line.isFree}`)
		.join('|');
}

async function fetchClientSecret(items: CartLine[]) {
	const response = await fetch('/api/checkout', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ items }),
	});
	const data = await response.json().catch(() => null);
	if (!response.ok || !data?.clientSecret) {
		throw new Error(
			data?.error || 'Unable to start checkout. Please try again.',
		);
	}
	return data.clientSecret as string;
}

function LoadingScreen() {
	return (
		<div className='flex min-h-[60vh] items-center justify-center bg-offwhite'>
			<p className='text-sm text-charcoal/60'>Loading checkout&hellip;</p>
		</div>
	);
}

// Remounting with a new `key` tears down the old Elements provider and
// creates a brand-new Checkout Session for the current cart — the only way
// to change a custom-mode session's line items, since its client secret
// can only be set once per provider instance.
function CheckoutSession({ items }: { items: CartLine[] }) {
	const [clientSecretPromise] = useState(() => fetchClientSecret(items));

	return (
		<CheckoutElementsProvider
			stripe={stripePromise}
			options={{
				clientSecret: clientSecretPromise,
				elementsOptions: { appearance: checkoutAppearance },
			}}
		>
			<CheckoutForm />
		</CheckoutElementsProvider>
	);
}

export default function CheckoutPage() {
	const router = useRouter();
	const { items, hasHydrated } = useCart();
	const hasRegularItems = items.some((line) => !line.isFree);

	const itemsRef = useRef(items);
	useEffect(() => {
		itemsRef.current = items;
	}, [items]);

	const liveKey = cartKey(items);
	const [session, setSession] = useState({ key: liveKey, items });

	useEffect(() => {
		if (liveKey === session.key) return;
		const timeout = setTimeout(() => {
			setSession({ key: liveKey, items: itemsRef.current });
		}, RECREATE_DEBOUNCE_MS);
		return () => clearTimeout(timeout);
	}, [liveKey, session.key]);

	useEffect(() => {
		if (hasHydrated && !hasRegularItems) {
			router.replace('/products');
		}
	}, [hasHydrated, hasRegularItems, router]);

	if (!hasHydrated || !hasRegularItems) {
		return <LoadingScreen />;
	}

	return <CheckoutSession key={session.key} items={session.items} />;
}
