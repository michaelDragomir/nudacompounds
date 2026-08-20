'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { trackBeginCheckout } from '../lib/gtagEvents';
import { CartIcon, LockIcon, TrashIcon, XIcon } from './icons';
import { SectionLink } from './SectionLink';

const TRUST_BADGES = ['Discreet Packaging', 'COA Included', 'Fast Delivery'];

export function CartDrawer() {
	const {
		items,
		isOpen,
		closeCart,
		updateQty,
		removeItem,
		addItem,
		totalCount,
	} = useCart();

	const [checkingOut, setCheckingOut] = useState(false);
	const [checkoutError, setCheckoutError] = useState<string | null>(null);

	async function handleCheckout() {
		setCheckoutError(null);
		setCheckingOut(true);
		try {
			const response = await fetch('/api/checkout', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ items }),
			});

			const data = await response.json().catch(() => null);

			if (!response.ok || !data?.url) {
				throw new Error(
					data?.error || 'Unable to start checkout. Please try again.',
				);
			}

			// Only fire once the session was actually created — firing
			// unconditionally on click would re-report begin_checkout on every
			// retry after a failed attempt, inflating the funnel.
			trackBeginCheckout(lines, subtotal);

			// eslint-disable-next-line react-hooks/immutability -- navigation from an event handler, not render
			window.location.href = data.url;
		} catch (err) {
			setCheckoutError(
				err instanceof Error
					? err.message
					: 'Unable to start checkout. Please try again.',
			);
			setCheckingOut(false);
		}
	}

	const lines = items
		.map((line) => ({
			...line,
			product: products.find((p) => p.slug === line.slug),
		}))
		.filter(
			(
				line,
			): line is typeof line & { product: NonNullable<typeof line.product> } =>
				Boolean(line.product),
		);

	const subtotal = lines.reduce(
		(sum, line) =>
			sum +
			(line.isBulk
				? line.product.bulkPrice10 * line.qty
				: line.product.price * line.qty),
		0,
	);

	const suggestion = products.find(
		(p) => p.inStock && !items.some((line) => line.slug === p.slug),
	);

	return (
		<>
			<div
				onClick={closeCart}
				aria-hidden='true'
				className={`fixed inset-0 z-60 bg-linear-to-b from-navy to-navy-dark backdrop-blur-sm transition-opacity duration-300 ${
					isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
				}`}
			/>

			<aside
				role='dialog'
				aria-modal='true'
				aria-label='Shopping cart'
				className={`fixed right-0 top-0 z-70 flex h-full w-full border-l border-amber/40 max-w-md flex-col bg-navy-dark text-offwhite shadow-2xl transition-transform duration-300 ease-out ${
					isOpen ? 'translate-x-0' : 'translate-x-full'
				}`}
			>
				<div className='flex items-center justify-between border-b border-offwhite/10 px-6 py-5'>
					<div className='flex items-center gap-2'>
						<CartIcon className='h-5 w-5 text-amber-light' />
						<span className='text-sm font-bold uppercase tracking-widest'>
							Your Cart
						</span>
					</div>
					<button
						type='button'
						onClick={closeCart}
						aria-label='Close cart'
						className='text-offwhite/60 transition-colors hover:text-offwhite'
					>
						<XIcon className='h-5 w-5' />
					</button>
				</div>

				<p className='px-6 pt-4 text-xs text-offwhite/50'>
					{totalCount} {totalCount === 1 ? 'item' : 'items'}
				</p>

				<div className='flex-1 overflow-y-auto px-6 py-4'>
					{lines.length === 0 ? (
						<div className='flex h-full flex-col items-center justify-center gap-3 text-center'>
							<CartIcon className='h-10 w-10 text-offwhite/20' />
							<p className='text-sm text-offwhite/60'>Your cart is empty.</p>
							<SectionLink
								href='/products'
								onClick={closeCart}
								className='text-sm font-bold text-amber-light hover:underline'
							>
								Browse the products
							</SectionLink>
						</div>
					) : (
						<ul className='space-y-5'>
							{lines.map(({ product, qty, isBulk }) => (
								<li key={`${product.slug}-${isBulk}`} className='flex gap-4'>
									<div className='relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-offwhite/5'>
										<Image
											src={product.image}
											alt={product.name}
											fill
											sizes='64px'
											className='object-contain p-1.5'
										/>
									</div>
									<div className='flex-1'>
										<div className='flex items-start justify-between gap-2'>
											<div>
												<p className='text-[11px] font-bold uppercase tracking-wide text-amber-light'>
													{product.category}
												</p>
												<p className='font-bold text-white'>{product.name}</p>
												{isBulk && (
													<p className='text-[11px] font-bold uppercase tracking-wide text-amber'>
														Kit of 10
													</p>
												)}
											</div>
											<span className='text-sm text-white/70'>
												{isBulk ? `${qty * 10} vials` : product.size}
											</span>
										</div>
										<div className='mt-2 flex items-center justify-between'>
											<div className='flex items-center gap-2 rounded-lg border border-offwhite/15 px-1'>
												<button
													type='button'
													onClick={() => updateQty(product.slug, -1, isBulk)}
													aria-label={`Decrease ${product.name} quantity`}
													className='flex h-6 w-6 items-center justify-center text-offwhite/70 transition-colors hover:text-amber'
												>
													&minus;
												</button>
												<span className='w-4 text-center text-sm font-semibold'>
													{qty}
												</span>
												<button
													type='button'
													onClick={() => updateQty(product.slug, 1, isBulk)}
													aria-label={`Increase ${product.name} quantity`}
													className='flex h-6 w-6 items-center justify-center text-offwhite/70 transition-colors hover:text-amber'
												>
													+
												</button>
											</div>
											<div className='flex items-center gap-3'>
												<span className='font-bold text-amber-light'>
													$
													{(
														(isBulk ? product.bulkPrice10 : product.price) * qty
													).toFixed(2)}
												</span>
												<button
													type='button'
													onClick={() => removeItem(product.slug, isBulk)}
													aria-label={`Remove ${product.name}`}
													className='text-offwhite/40 transition-colors hover:text-offwhite'
												>
													<TrashIcon className='h-4 w-4' />
												</button>
											</div>
										</div>
									</div>
								</li>
							))}
						</ul>
					)}

					{lines.length > 0 && suggestion && (
						<div className='mt-8 border-t border-offwhite/10 pt-6'>
							<p className='text-[11px] font-bold uppercase tracking-wide text-offwhite/50'>
								Complete your research set
							</p>
							<div className='mt-3 flex items-center gap-3'>
								<div className='relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-offwhite/5'>
									<Image
										src={suggestion.image}
										alt={suggestion.name}
										fill
										sizes='48px'
										className='object-contain p-1'
									/>
								</div>
								<div className='flex-1'>
									<p className='text-sm font-bold text-offwhite'>
										{suggestion.name}
									</p>
									<p className='text-xs text-offwhite/50'>
										${suggestion.price.toFixed(2)}
									</p>
								</div>
								<button
									type='button'
									onClick={() => addItem(suggestion, 1)}
									className='rounded-lg border border-amber/40 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-amber-light transition-colors hover:bg-amber/10'
								>
									+ Add
								</button>
							</div>
						</div>
					)}
				</div>

				<div className='border-t border-offwhite/10 px-6 py-5'>
					<div className='mb-4 flex flex-wrap items-center justify-center gap-2'>
						{TRUST_BADGES.map((label) => (
							<span
								key={label}
								className='rounded-full border border-offwhite/15 px-3 py-1 text-[11px] text-offwhite/70'
							>
								{label}
							</span>
						))}
					</div>

					<div className='mb-4 flex items-center justify-between'>
						<span className='text-xs uppercase tracking-widest text-offwhite/50'>
							Subtotal
						</span>
						<span className='text-xl font-bold text-amber-light'>
							${subtotal.toFixed(2)}
						</span>
					</div>

					{checkoutError && (
						<p className='mb-3 text-center text-sm font-medium text-red-400'>
							{checkoutError}
						</p>
					)}

					<button
						type='button'
						disabled={lines.length === 0 || checkingOut}
						onClick={handleCheckout}
						className='flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-amber px-4 py-3.5 text-sm font-bold uppercase tracking-widest text-navy-dark transition-colors hover:bg-amber-dark disabled:cursor-not-allowed disabled:bg-amber/40 disabled:text-navy-dark/50'
					>
						<LockIcon className='h-4 w-4' />
						{checkingOut ? 'Redirecting…' : 'Secure Checkout'}
					</button>

					<p className='mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-offwhite/40'>
						<LockIcon className='h-3 w-3' />
						Powered by Stripe &middot; Encrypted checkout
					</p>
				</div>
			</aside>
		</>
	);
}
