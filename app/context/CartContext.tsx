'use client';

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from 'react';
import type { Product } from '../data/products';
import { trackAddToCart } from '../lib/gtagEvents';
import { FREE_GIFT_SLUG } from '../lib/cart';

const MAX_QTY = 10;
const MAX_KITS = 10;
const CART_STORAGE_KEY = 'nuda_cart';

export { FREE_GIFT_SLUG };

type CartLine = { slug: string; qty: number; isBulk: boolean; isFree?: boolean };

// Enforces the free-gift invariant: exactly one free-gift line whenever the
// cart has anything else in it, none otherwise. Called from every mutator
// so the invariant holds within a single state update rather than via a
// separate effect reacting to `items` (which would cause an extra render).
function withFreeGift(lines: CartLine[]): CartLine[] {
	const hasOtherItems = lines.some((line) => !line.isFree);
	const hasFreeLine = lines.some((line) => line.isFree);
	if (hasOtherItems && !hasFreeLine) {
		return [
			...lines,
			{ slug: FREE_GIFT_SLUG, qty: 1, isBulk: false, isFree: true },
		];
	}
	if (!hasOtherItems && hasFreeLine) {
		return lines.filter((line) => !line.isFree);
	}
	return lines;
}

function isCartLine(value: unknown): value is CartLine {
	if (!value || typeof value !== 'object') return false;
	const line = value as Record<string, unknown>;
	return (
		typeof line.slug === 'string' &&
		typeof line.qty === 'number' &&
		typeof line.isBulk === 'boolean' &&
		(line.isFree === undefined || typeof line.isFree === 'boolean')
	);
}

type CartContextValue = {
	items: CartLine[];
	isOpen: boolean;
	totalCount: number;
	celebrationTick: number;
	hasHydrated: boolean;
	addItem: (product: Product, qty?: number, isBulk?: boolean) => void;
	updateQty: (slug: string, delta: number, isBulk?: boolean) => void;
	removeItem: (slug: string, isBulk?: boolean) => void;
	clearCart: () => void;
	openCart: () => void;
	closeCart: () => void;
	toggleCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
	const [items, setItems] = useState<CartLine[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [celebrationTick, setCelebrationTick] = useState(0);
	const [hasHydrated, setHasHydrated] = useState(false);

	useEffect(() => {
		try {
			const stored = window.localStorage.getItem(CART_STORAGE_KEY);
			if (stored) {
				const parsed = JSON.parse(stored);
				if (Array.isArray(parsed) && parsed.every(isCartLine)) {
					// eslint-disable-next-line react-hooks/set-state-in-effect -- syncing initial state from localStorage, an external system, on mount
					setItems(withFreeGift(parsed));
				}
			}
		} catch {
			// Corrupt or inaccessible storage — start with an empty cart.
		}
		setHasHydrated(true);
	}, []);

	useEffect(() => {
		if (!hasHydrated) return;
		try {
			window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
		} catch {
			// Storage full or unavailable (e.g. private browsing) — fail silently.
		}
	}, [items, hasHydrated]);

	const addItem = useCallback(
		(product: Product, qty = 1, isBulk = false) => {
			const cap = isBulk ? MAX_KITS : MAX_QTY;
			// The cap can silently reduce how much is actually added (e.g.
			// requesting 5 more when 8 of 10 are already in the cart only adds
			// 2) — track the amount actually applied, not the requested qty,
			// so add_to_cart in GA4 doesn't overstate the cart/revenue impact.
			let appliedQty = 0;
			setItems((prev) => {
				// Never merge into the automatic free-gift line — a manually
				// added unit is always a separate, normally-priced line, even
				// for the same product.
				const existing = prev.find(
					(line) =>
						line.slug === product.slug &&
						line.isBulk === isBulk &&
						!line.isFree
				);
				if (existing) {
					const newQty = Math.min(cap, existing.qty + qty);
					appliedQty = newQty - existing.qty;
					return withFreeGift(
						prev.map((line) =>
							line === existing ? { ...line, qty: newQty } : line
						)
					);
				}
				const newQty = Math.min(cap, qty);
				appliedQty = newQty;
				return withFreeGift([
					...prev,
					{ slug: product.slug, qty: newQty, isBulk },
				]);
			});
			setCelebrationTick((tick) => tick + 1);
			if (appliedQty > 0) {
				trackAddToCart(product, appliedQty, isBulk);
			}
		},
		[]
	);

	const updateQty = useCallback(
		(slug: string, delta: number, isBulk = false) => {
			const cap = isBulk ? MAX_KITS : MAX_QTY;
			setItems((prev) =>
				withFreeGift(
					prev
						.map((line) =>
							line.slug === slug && line.isBulk === isBulk && !line.isFree
								? { ...line, qty: Math.min(cap, line.qty + delta) }
								: line
						)
						.filter((line) => line.qty > 0)
				)
			);
		},
		[]
	);

	const removeItem = useCallback((slug: string, isBulk = false) => {
		setItems((prev) =>
			withFreeGift(
				prev.filter(
					(line) => !(line.slug === slug && line.isBulk === isBulk && !line.isFree)
				)
			)
		);
	}, []);

	const clearCart = useCallback(() => {
		setItems([]);
	}, []);

	const totalCount = useMemo(
		() =>
			items.reduce(
				(sum, line) => sum + (line.isBulk ? line.qty * 10 : line.qty),
				0
			),
		[items]
	);

	const value = useMemo<CartContextValue>(
		() => ({
			items,
			isOpen,
			totalCount,
			celebrationTick,
			hasHydrated,
			addItem,
			updateQty,
			removeItem,
			clearCart,
			openCart: () => setIsOpen(true),
			closeCart: () => setIsOpen(false),
			toggleCart: () => setIsOpen((open) => !open),
		}),
		[
			items,
			isOpen,
			totalCount,
			celebrationTick,
			hasHydrated,
			addItem,
			updateQty,
			removeItem,
			clearCart,
		]
	);

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
	const ctx = useContext(CartContext);
	if (!ctx) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return ctx;
}
