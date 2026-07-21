'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { CartIcon, LockIcon } from './icons';

const MIN_QTY = 1;
const MAX_QTY = 10;

export function Catalog() {
	const { addItem } = useCart();
	const [quantities, setQuantities] = useState(() =>
		Object.fromEntries(products.map((p) => [p.slug, MIN_QTY]))
	);

	function changeQty(slug: string, delta: number) {
		setQuantities((prev) => ({
			...prev,
			[slug]: Math.min(MAX_QTY, Math.max(MIN_QTY, prev[slug] + delta)),
		}));
	}

	return (
		<section id='catalog' className='bg-offwhite py-24'>
			<div className='mx-auto max-w-6xl px-6'>
				<div className='mx-auto mb-14 max-w-2xl text-center'>
					<div className='mb-4 flex items-center justify-center gap-3'>
						<span className='h-px w-8 bg-amber' />
						<span className='text-xs font-bold uppercase tracking-[0.2em] text-navy'>
							Research Catalog
						</span>
					</div>
					<h2 className='text-3xl font-bold leading-tight text-navy tracking-wide'>
						Available Compounds
					</h2>
					<p className='mt-4 text-charcoal tracking-wide'>
						Every vial ships with a published Certificate of Analysis and
						batch-level documentation. Ordering is launching soon.
					</p>
				</div>

				<div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 drop-shadow-md'>
					{products.map((product) => {
						const qty = quantities[product.slug];

						return (
							<div
								key={product.slug}
								className='group relative flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white transition-colors hover:border-amber/40'
							>
								<div className='relative flex aspect-square items-center justify-center bg-gradient-to-b from-navy-dark/5 to-navy-dark/10 p-8'>
									<Image
										src={product.image}
										alt={`${product.name} vial`}
										width={400}
										height={400}
										className='h-full w-auto object-contain drop-shadow-sm rounded-2xl transition-transform group-hover:scale-105'
									/>
								</div>

								<div className='flex flex-1 flex-col p-6'>
									<h3 className='text-lg font-bold text-navy'>{product.name}</h3>
									<p className='mt-1 flex-1 text-sm text-charcoal'>
										{product.description}
									</p>

									<dl className='mt-4 space-y-1.5 text-sm'>
										<div className='flex justify-between'>
											<dt className='text-warmgray'>Purity</dt>
											<dd className='font-semibold text-charcoal'>
												{product.purity}
											</dd>
										</div>
										<div className='flex justify-between'>
											<dt className='text-warmgray'>Size</dt>
											<dd className='font-semibold text-charcoal'>
												{product.size}
											</dd>
										</div>
									</dl>

									<div className='mt-4 flex items-baseline gap-2'>
										<span className='text-2xl font-bold text-navy'>
											${product.price.toFixed(2)}
										</span>
										<span className='text-xs text-warmgray'>per vial</span>
									</div>

									<div className='mt-4 flex items-center justify-between'>
										<span className='text-sm text-charcoal tracking-wide'>
											Quantity
										</span>
										<div className='flex items-center gap-3 rounded-lg border border-black/10 px-1 text-warmgray'>
											<button
												type='button'
												disabled={qty <= MIN_QTY /* || !product.inStock */}
												onClick={() => changeQty(product.slug, -1)}
												aria-label='Decrease quantity'
												className='flex h-7 w-7 items-center justify-center text-base transition-colors hover:text-navy disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-warmgray'
											>
												&minus;
											</button>
											<span className='w-4 text-center text-sm font-semibold text-charcoal'>
												{qty}
											</span>
											<button
												type='button'
												disabled={qty >= MAX_QTY /* || !product.inStock */}
												onClick={() => changeQty(product.slug, 1)}
												aria-label='Increase quantity'
												className='flex h-7 w-7 items-center justify-center text-base transition-colors hover:text-navy disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-warmgray'
											>
												+
											</button>
										</div>
									</div>

									<button
										type='button'
										onClick={() => addItem(product, qty)}
										className='mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-amber px-4 py-3 text-sm font-bold transition-colors hover:bg-amber-dark'
									>
										<span className='flex items-center gap-2 [text-shadow:0_1px_2px_rgba(0,0,0,0.35)] text-white tracking-wide'>
											<CartIcon className='h-4 w-4' />
											Add to Cart
										</span>
									</button>
									<button
										type='button'
										disabled
										className='mt-2 w-full rounded-xl border border-navy/20 px-4 py-3 text-sm font-bold text-navy/50 disabled:cursor-not-allowed'
									>
										View Details &amp; COA
									</button>
								</div>
							</div>
						);
					})}
				</div>

				<div className='mt-10 flex items-center justify-center gap-2 text-xs text-warmgray'>
					<LockIcon className='h-4 w-4' />
					Ordering opens soon &mdash; join the list via the contact form to be
					notified.
				</div>
			</div>
		</section>
	);
}
