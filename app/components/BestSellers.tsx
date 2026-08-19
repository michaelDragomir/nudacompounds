'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { products, type Product } from '../data/products';
import { QuickViewModal } from './QuickViewModal';

const BEST_SELLER_SLUGS = ['3-rt', '2-trz', 'tesamorelin', 'ghk-cu', 'bpc-157'];

const bestSellers = BEST_SELLER_SLUGS.map((slug) =>
	products.find((product) => product.slug === slug),
).filter((product): product is Product => Boolean(product));

export function BestSellers() {
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

	return (
		<section className='py-14 bg-linear-to-b from-navy to-navy-dark'>
			<div className='mx-auto max-w-6xl px-6'>
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
						<Link
							key={product.slug}
							href={`/products/${product.slug}`}
							onClick={(event) => {
								event.preventDefault();
								setSelectedProduct(product);
							}}
							aria-label={`Quick view ${product.name}`}
							className='group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-amber bg-white text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl shadow-xl'
						>
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
						</Link>
					))}
				</div>

				<div className='mt-10 flex justify-center'>
					<Link
						href='/products'
						className='rounded-2xl bg-amber px-10 py-4 text-md font-bold uppercase tracking-widest text-white shadow-xl transition-colors hover:bg-amber-dark border border-amber'
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
