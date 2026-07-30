'use client';

import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
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
		(sum, line) => sum + line.product.price * line.qty,
		0,
	);

	const suggestion = products.find(
		(p) => !items.some((line) => line.slug === p.slug),
	);

	return (
		<>
			<div
				onClick={closeCart}
				aria-hidden='true'
				className={`fixed inset-0 z-60 bg-navy-dark/60 backdrop-blur-sm transition-opacity duration-300 ${
					isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
				}`}
			/>

			<aside
				role='dialog'
				aria-modal='true'
				aria-label='Shopping cart'
				className={`fixed right-0 top-0 z-70 flex h-full w-full max-w-md flex-col bg-navy-dark text-offwhite shadow-2xl transition-transform duration-300 ease-out ${
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
								href='/catalog'
								onClick={closeCart}
								className='text-sm font-bold text-amber-light hover:underline'
							>
								Browse the catalog
							</SectionLink>
						</div>
					) : (
						<ul className='space-y-5'>
							{lines.map(({ product, qty }) => (
								<li key={product.slug} className='flex gap-4'>
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
											</div>
											<span className='text-sm text-white/50'>
												{product.size}
											</span>
										</div>
										<div className='mt-2 flex items-center justify-between'>
											<div className='flex items-center gap-2 rounded-lg border border-offwhite/15 px-1'>
												<button
													type='button'
													onClick={() => updateQty(product.slug, -1)}
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
													onClick={() => updateQty(product.slug, 1)}
													aria-label={`Increase ${product.name} quantity`}
													className='flex h-6 w-6 items-center justify-center text-offwhite/70 transition-colors hover:text-amber'
												>
													+
												</button>
											</div>
											<div className='flex items-center gap-3'>
												<span className='font-bold text-amber-light'>
													${(product.price * qty).toFixed(2)}
												</span>
												<button
													type='button'
													onClick={() => removeItem(product.slug)}
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

					<button
						type='button'
						disabled
						className='flex w-full items-center justify-center gap-2 rounded-xl bg-amber px-4 py-3.5 text-sm font-bold uppercase tracking-widest text-navy-dark/50 disabled:cursor-not-allowed'
					>
						<LockIcon className='h-4 w-4' />
						Secure Checkout
					</button>
				</div>
			</aside>
		</>
	);
}
