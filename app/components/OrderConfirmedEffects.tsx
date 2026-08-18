'use client';

import { useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { trackPurchase } from '../lib/gtagEvents';

const MAX_AUTO_REFRESH_ATTEMPTS = 6;
const REFRESH_INTERVAL_MS = 2500;

type OrderSummary = { order_number: string; total: number };
type ItemSummary = {
	product_slug: string;
	product_name: string;
	quantity: number;
	unit_price: number;
};

// Handles the side effects of landing on the confirmation page:
// - order found: clear the (now-purchased) cart, and fire the GA4 purchase
//   event, both exactly once.
// - order not yet found: the webhook may simply not have landed yet, so
//   auto-refresh a few times before giving up and showing a static message.
export function OrderConfirmedEffects({
	order,
	items,
}: {
	order: OrderSummary | null;
	items: ItemSummary[];
}) {
	const { clearCart, hasHydrated } = useCart();
	const hasCleared = useRef(false);
	const orderFound = Boolean(order);

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
		if (!order) return;
		// A page refresh (the auto-retry loop below, or a manual reload) would
		// otherwise re-fire purchase every time — dedupe per order in this tab.
		const key = `nuda_purchase_tracked_${order.order_number}`;
		if (window.sessionStorage.getItem(key)) return;
		window.sessionStorage.setItem(key, '1');
		trackPurchase(order, items);
	}, [order, items]);

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
