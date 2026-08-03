'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { products, type Product } from '../data/products';
import { EyeIcon } from './icons';
import { QuickViewModal } from './QuickViewModal';

const BEST_SELLER_SLUGS = ['3-rt', '2-rt', 'tesamorelin', 'ghk-cu', 'bpc-157'];

const bestSellers = BEST_SELLER_SLUGS.map((slug) =>
	products.find((product) => product.slug === slug),
).filter((product): product is Product => Boolean(product));

export function BestSellers() {
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

	return (
		<section className='py-8 bg-linear-to-b from-navy to-navy-dark'>
			<div className='mx-auto max-w-7xl px-6'>
				<div className='mx-auto mb-8 max-w-3xl text-center'>
					<h2 className='text-4xl font-bold font-sora leading-tight text-offwhite tracking-wide'>
						Our Best Selling Compounds
					</h2>
					<p className='mt-4 text-md text-white/70'>
						All compounds are third-party tested and include a Certificate of
						Analysis. For research use only.
					</p>
				</div>

				<div className='grid grid-cols-2 gap-6 sm:grid-cols-5'>
					{bestSellers.map((product) => (
						<div
							key={product.slug}
							className='group relative flex flex-col overflow-hidden rounded-2xl border border-amber bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl shadow-xl'
						>
							<button
								type='button'
								onClick={() => setSelectedProduct(product)}
								aria-label={`Quick view ${product.name}`}
								className='group/quickview absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-2xl bg-white/90 text-navy shadow-sm transition-colors hover:bg-amber hover:text-navy-dark border border-amber/20'
							>
								<span className='pointer-events-none absolute right-full top-1/2 mr-2 -translate-y-1/2 whitespace-nowrap rounded-md bg-navy-dark px-2.5 py-1 text-xs font-bold text-white opacity-0 transition-opacity duration-200 group-hover/quickview:opacity-100'>
									Quick View
								</span>
								<EyeIcon className='h-4 w-4' />
							</button>

							<div className='relative flex aspect-square items-center justify-center overflow-hidden bg-linear-to-b from-navy-dark/5 to-navy-dark/10'>
								<Image
									src={product.image}
									alt={`${product.name}`}
									width={300}
									height={300}
									className='h-full w-auto object-contain p-4 drop-shadow-sm transition-transform duration-300 group-hover:scale-110'
								/>
							</div>

							<div className='flex flex-1 flex-col p-5'>
								<h3 className='font-bold text-navy'>
									{product.name}{' '}
									<span className='font-normal text-navy'>
										{' '}
										- {product.size.replace(/\s*vial$/i, '')}
									</span>
								</h3>
								<p className='mt-1 text-sm font-bold text-amber-dark'>
									${product.price.toFixed(2)}
								</p>
							</div>
						</div>
					))}
				</div>

				<div className='mt-10 flex justify-center'>
					<Link
						href='/catalog'
						className='rounded-2xl bg-amber px-10 py-4 text-md font-bold uppercase tracking-widest text-white shadow-xl transition-colors hover:bg-amber-dark'
					>
						View all compounds
					</Link>
				</div>
			</div>

			<QuickViewModal
				product={selectedProduct}
				onClose={() => setSelectedProduct(null)}
			/>
		</section>
	);
}
