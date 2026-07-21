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

type CartLine = { slug: string; qty: number };

type CartContextValue = {
	items: CartLine[];
	isOpen: boolean;
	totalCount: number;
	celebrationTick: number;
	addItem: (product: Product, qty?: number) => void;
	updateQty: (slug: string, delta: number) => void;
	removeItem: (slug: string) => void;
	openCart: () => void;
	closeCart: () => void;
	toggleCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
	const [items, setItems] = useState<CartLine[]>([]);
	const [isOpen, setIsOpen] = useState(false);
	const [celebrationTick, setCelebrationTick] = useState(0);

	const addItem = useCallback((product: Product, qty = 1) => {
		setItems((prev) => {
			const existing = prev.find((line) => line.slug === product.slug);
			if (existing) {
				return prev.map((line) =>
					line.slug === product.slug
						? { ...line, qty: Math.min(MAX_QTY, line.qty + qty) }
						: line
				);
			}
			return [...prev, { slug: product.slug, qty: Math.min(MAX_QTY, qty) }];
		});
		setCelebrationTick((tick) => tick + 1);
	}, []);

	const updateQty = useCallback((slug: string, delta: number) => {
		setItems((prev) =>
			prev
				.map((line) =>
					line.slug === slug
						? { ...line, qty: Math.min(MAX_QTY, line.qty + delta) }
						: line
				)
				.filter((line) => line.qty > 0)
		);
	}, []);

	const removeItem = useCallback((slug: string) => {
		setItems((prev) => prev.filter((line) => line.slug !== slug));
	}, []);

	const totalCount = useMemo(
		() => items.reduce((sum, line) => sum + line.qty, 0),
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
