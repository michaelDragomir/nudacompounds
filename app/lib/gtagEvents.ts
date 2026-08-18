import type { Product } from '../data/products';

declare global {
	interface Window {
		gtag?: (...args: unknown[]) => void;
	}
}

type GAItem = {
	item_id: string;
	item_name: string;
	item_category?: string;
	price: number;
	quantity: number;
};

function gtagEvent(name: string, params: Record<string, unknown>) {
	if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
	window.gtag('event', name, params);
}

export function trackViewItem(product: Product) {
	gtagEvent('view_item', {
		currency: 'USD',
		value: product.price,
		items: [
			{
				item_id: product.slug,
				item_name: product.name,
				item_category: product.category,
				price: product.price,
				quantity: 1,
			} satisfies GAItem,
		],
	});
}

export function trackAddToCart(product: Product, qty: number, isBulk: boolean) {
	const price = isBulk ? product.bulkPrice10 : product.price;
	gtagEvent('add_to_cart', {
		currency: 'USD',
		value: price * qty,
		items: [
			{
				item_id: product.slug,
				item_name: isBulk ? `${product.name} — Kit of 10` : product.name,
				item_category: product.category,
				price,
				quantity: qty,
			} satisfies GAItem,
		],
	});
}

export function trackBeginCheckout(
	lines: { product: Product; qty: number; isBulk: boolean }[],
	subtotal: number,
) {
	gtagEvent('begin_checkout', {
		currency: 'USD',
		value: subtotal,
		items: lines.map(
			({ product, qty, isBulk }): GAItem => ({
				item_id: product.slug,
				item_name: isBulk ? `${product.name} — Kit of 10` : product.name,
				item_category: product.category,
				price: isBulk ? product.bulkPrice10 : product.price,
				quantity: qty,
			}),
		),
	});
}

export function trackPurchase(
	order: { order_number: string; total: number },
	items: {
		product_slug: string;
		product_name: string;
		quantity: number;
		unit_price: number;
	}[],
) {
	gtagEvent('purchase', {
		transaction_id: order.order_number,
		currency: 'USD',
		value: order.total / 100,
		items: items.map(
			(item): GAItem => ({
				item_id: item.product_slug,
				item_name: item.product_name,
				price: item.unit_price / 100,
				quantity: item.quantity,
			}),
		),
	});
}
