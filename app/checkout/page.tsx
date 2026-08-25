'use client';

import { useEffect, useState } from 'react';
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
		<div className='flex min-h-[60vh] items-center justify-center bg-navy-dark'>
			<p className='text-sm text-offwhite/60'>Loading checkout&hellip;</p>
		</div>
	);
}

// Creates the Checkout Session exactly once for this page visit, capturing
// the cart at the moment it mounts — the session isn't kept in sync with
// further cart edits, matching how Stripe's custom-mode client secret can
// only be set once per Elements provider.
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

	useEffect(() => {
		if (hasHydrated && !hasRegularItems) {
			router.replace('/products');
		}
	}, [hasHydrated, hasRegularItems, router]);

	if (!hasHydrated || !hasRegularItems) {
		return <LoadingScreen />;
	}

	return <CheckoutSession items={items} />;
}
