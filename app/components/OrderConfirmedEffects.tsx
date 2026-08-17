'use client';

import { useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';

const MAX_AUTO_REFRESH_ATTEMPTS = 6;
const REFRESH_INTERVAL_MS = 2500;

// Handles the two side effects of landing on the confirmation page:
// - order found: clear the (now-purchased) cart exactly once.
// - order not yet found: the webhook may simply not have landed yet, so
//   auto-refresh a few times before giving up and showing a static message.
export function OrderConfirmedEffects({ orderFound }: { orderFound: boolean }) {
	const { clearCart, hasHydrated } = useCart();
	const hasCleared = useRef(false);

	useEffect(() => {
		// Must wait for the cart to finish reading from localStorage first —
		// otherwise that hydration (which runs on this same fresh page load)
		// can fire after this clear and silently restore the stale cart.
		if (orderFound && hasHydrated && !hasCleared.current) {
			hasCleared.current = true;
			clearCart();
		}
	}, [orderFound, hasHydrated, clearCart]);

	useEffect(() => {
		if (orderFound) return;

		const attempts = Number(
			window.sessionStorage.getItem('nuda_order_confirm_attempts') || '0',
		);
		if (attempts >= MAX_AUTO_REFRESH_ATTEMPTS) return;

		const timer = setTimeout(() => {
			window.sessionStorage.setItem(
				'nuda_order_confirm_attempts',
				String(attempts + 1),
			);
			window.location.reload();
		}, REFRESH_INTERVAL_MS);

		return () => clearTimeout(timer);
	}, [orderFound]);

	return null;
}
