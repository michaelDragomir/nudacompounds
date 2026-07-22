'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import type { Product } from '../data/products';
import {
	ArrowRightIcon,
	CartIcon,
	CheckBadgeIcon,
	DownloadIcon,
	EyeIcon,
	ShieldIcon,
	TruckIcon,
} from './icons';

const MIN_QTY = 1;
const MAX_QTY = 10;

const TRUST_ITEMS = [
	{ icon: ShieldIcon, label: 'cGMP-Aligned Facilities' },
	{ icon: CheckBadgeIcon, label: 'Third-Party Verified' },
	{ icon: TruckIcon, label: 'Discreet Shipping' },
];

export function ProductDetail({ product }: { product: Product }) {
	const { addItem } = useCart();
	const [qty, setQty] = useState(MIN_QTY);

	function changeQty(delta: number) {
		setQty((prev) => Math.min(MAX_QTY, Math.max(MIN_QTY, prev + delta)));
	}

	return (
		<div className='bg-offwhite py-16'>
			<div className='mx-auto max-w-6xl px-6'>
				<Link
					href='/#catalog'
					className='inline-flex items-center gap-2 text-sm font-bold text-navy hover:text-amber-dark transition-colors'
				>
					<ArrowRightIcon className='h-4 w-4 rotate-180' />
					Back to Catalog
				</Link>

				<div className='mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2'>
					<div>
						<div className='relative aspect-square overflow-hidden rounded-2xl border border-black/5 bg-linear-to-b from-navy-dark/5 to-navy-dark/10'>
							<Image
								src={product.image}
								alt={`${product.name} vial`}
								width={500}
								height={500}
								priority
								className='h-full w-full object-contain p-10 drop-shadow-sm'
							/>
						</div>

						<ul className='mt-6 flex flex-wrap items-center gap-x-6 gap-y-2'>
							{TRUST_ITEMS.map(({ icon: Icon, label }) => (
								<li key={label} className='flex items-center gap-2'>
									<Icon className='h-4 w-4 shrink-0 text-amber-dark' />
									<span className='text-sm font-medium text-charcoal'>
										{label}
									</span>
								</li>
							))}
						</ul>
					</div>

					<div>
						<p className='text-[11px] font-bold uppercase tracking-wide text-warmgray'>
							{product.category}
						</p>
						<h1 className='mt-1 font-display text-3xl font-bold text-navy sm:text-4xl'>
							{product.name}
						</h1>
						<span className='mt-3 block h-1 w-12 rounded-full bg-amber' />

						<div className='mt-6 flex items-baseline gap-2'>
							<span className='text-3xl font-bold text-navy'>
								${product.price.toFixed(2)}
							</span>
							<span className='text-sm text-warmgray'>per vial</span>
						</div>

						<dl className='mt-4 grid max-w-xs grid-cols-2 gap-y-1.5 text-sm'>
							<dt className='text-warmgray'>Purity</dt>
							<dd className='text-right font-semibold text-charcoal'>
								{product.purity}
							</dd>
							<dt className='text-warmgray'>Size</dt>
							<dd className='text-right font-semibold text-charcoal'>
								{product.size}
							</dd>
						</dl>

						<div className='mt-8'>
							<span className='text-sm font-bold uppercase tracking-wide text-navy'>
								Quantity
							</span>
							<div className='mt-2 flex items-center gap-4'>
								<div className='flex items-center gap-3 rounded-lg border border-navy/70 px-1 text-warmgray'>
									<button
										type='button'
										disabled={qty <= MIN_QTY}
										onClick={() => changeQty(-1)}
										aria-label='Decrease quantity'
										className='flex h-9 w-9 items-center justify-center text-lg transition-colors hover:text-navy disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer'
									>
										&minus;
									</button>
									<span className='w-6 text-center text-base font-semibold text-navy'>
										{qty}
									</span>
									<button
										type='button'
										disabled={qty >= MAX_QTY}
										onClick={() => changeQty(1)}
										aria-label='Increase quantity'
										className='flex h-9 w-9 items-center justify-center text-lg transition-colors hover:text-navy disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer'
									>
										+
									</button>
								</div>

								<button
									type='button'
									onClick={() => addItem(product, qty)}
									className='flex flex-1 items-center justify-center gap-2 rounded-lg bg-amber px-6 py-2.25 text-sm font-bold uppercase tracking-wide text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.35)] transition-colors hover:bg-amber-dark cursor-pointer'
								>
									<CartIcon className='h-4 w-4' />
									Add to Cart
								</button>
							</div>

							<button
								type='button'
								onClick={() => addItem(product, MAX_QTY)}
								className='mt-3 w-full cursor-pointer rounded-lg border border-navy/70 px-6 py-2.25 text-sm font-bold uppercase tracking-wide text-navy/70 transition-colors hover:border-navy-dark hover:bg-navy-dark hover:text-white'
							>
								Bulk Order 10+
							</button>
						</div>

						<div className='mt-8 rounded-xl border border-black/5 bg-white p-5'>
							<p className='text-xs font-bold uppercase tracking-widest text-navy'>
								Research Overview
							</p>
							<p className='mt-2 text-sm leading-relaxed text-charcoal'>
								{product.description}
							</p>
							<p className='mt-3 text-xs font-semibold text-amber-dark'>
								For in-vitro research use only &mdash; not for human or
								veterinary use.
							</p>
						</div>

						<div className='mt-8'>
							<div className='rounded-2xl border border-black/5 bg-white p-6'>
								<p className='mb-4 text-xs font-bold uppercase tracking-widest text-navy'>
									Certificate of Analysis
								</p>
								<span className='inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-emerald-700'>
									Latest
								</span>
								<p className='mt-3 text-xl font-bold text-navy'>
									Exceeds {product.purity} Purity
								</p>

								<dl className='mt-4 space-y-1.5 text-sm'>
									<div className='flex justify-between'>
										<dt className='text-warmgray'>Variant</dt>
										<dd className='font-semibold text-charcoal'>
											{product.size}
										</dd>
									</div>
									<div className='flex justify-between'>
										<dt className='text-warmgray'>Batch #</dt>
										<dd className='font-semibold text-charcoal'>
											{product.coa.batch}
										</dd>
									</div>
									<div className='flex justify-between'>
										<dt className='text-warmgray'>Form</dt>
										<dd className='font-semibold text-charcoal'>
											{product.coa.form}
										</dd>
									</div>
									<div className='flex justify-between'>
										<dt className='text-warmgray'>Tested</dt>
										<dd className='font-semibold text-charcoal'>
											{product.coa.tested}
										</dd>
									</div>
								</dl>

								<div className='mt-5 flex gap-3'>
									<button
										type='button'
										disabled
										className='flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-navy/20 px-3 py-2 text-xs font-bold text-navy/50 disabled:cursor-not-allowed'
									>
										<EyeIcon className='h-4 w-4' />
										View
									</button>
									<button
										type='button'
										disabled
										className='flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-navy/20 px-3 py-2 text-xs font-bold text-navy/50 disabled:cursor-not-allowed'
									>
										<DownloadIcon className='h-4 w-4' />
										Download
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
