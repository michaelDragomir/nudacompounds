'use client';

import {
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
	type ReactNode,
} from 'react';
import type { Product } from '../data/products';

const MAX_QTY = 10;
const MAX_KITS = 10;

type CartLine = { slug: string; qty: number; isBulk: boolean };

type CartContextValue = {
	items: CartLine[];
	isOpen: boolean;
	totalCount: number;
	celebrationTick: number;
	addItem: (product: Product, qty?: number, isBulk?: boolean) => void;
	updateQty: (slug: string, delta: number, isBulk?: boolean) => void;
	removeItem: (slug: string, isBulk?: boolean) => void;
	openCart: () => void;
	closeCart: () => void;
	toggleCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
	const [items, setItems] = useState<CartLine[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [celebrationTick, setCelebrationTick] = useState(0);

	const addItem = useCallback(
		(product: Product, qty = 1, isBulk = false) => {
			const cap = isBulk ? MAX_KITS : MAX_QTY;
			setItems((prev) => {
				const existing = prev.find(
					(line) => line.slug === product.slug && line.isBulk === isBulk
				);
				if (existing) {
					return prev.map((line) =>
						line.slug === product.slug && line.isBulk === isBulk
							? { ...line, qty: Math.min(cap, line.qty + qty) }
							: line
					);
				}
				return [
					...prev,
					{ slug: product.slug, qty: Math.min(cap, qty), isBulk },
				];
			});
			setCelebrationTick((tick) => tick + 1);
		},
		[]
	);

	const updateQty = useCallback(
		(slug: string, delta: number, isBulk = false) => {
			const cap = isBulk ? MAX_KITS : MAX_QTY;
			setItems((prev) =>
				prev
					.map((line) =>
						line.slug === slug && line.isBulk === isBulk
							? { ...line, qty: Math.min(cap, line.qty + delta) }
							: line
					)
					.filter((line) => line.qty > 0)
			);
		},
		[]
	);

	const removeItem = useCallback((slug: string, isBulk = false) => {
		setItems((prev) =>
			prev.filter((line) => !(line.slug === slug && line.isBulk === isBulk))
		);
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
			addItem,
			updateQty,
			removeItem,
			openCart: () => setIsOpen(true),
			closeCart: () => setIsOpen(false),
			toggleCart: () => setIsOpen((open) => !open),
		}),
		[items, isOpen, totalCount, celebrationTick, addItem, updateQty, removeItem]
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
