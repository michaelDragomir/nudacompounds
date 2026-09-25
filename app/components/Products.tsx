'use client';

import Link from 'next/link';
import Image from 'next/image';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { CartIcon } from './icons';

export function Products() {
	const { addItem } = useCart();

	return (
		<section id='products' className='bg-offwhite py-16'>
			<div className='mx-auto max-w-6xl px-6'>
				<div className='grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4'>
					{products.map((product) => (
						<Link
							key={product.slug}
							href={`/products/${product.slug}`}
							className='group relative flex flex-col overflow-hidden rounded-2xl border border-amber/30 bg-white transition-all duration-300 shadow-md hover:-translate-y-1 hover:border-amber/50 hover:shadow-xl'
						>
							<div className='relative flex aspect-square items-center justify-center overflow-hidden bg-linear-to-b from-navy-dark/5 to-navy-dark/10'>
								{!product.inStock && (
									<span className='absolute right-3 top-3 z-10 rounded-full bg-navy-dark/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white'>
										Out of Stock
									</span>
								)}
								<Image
									src={product.image}
									alt={`${product.name} vial`}
									width={300}
									height={300}
									className={`h-full w-auto object-contain p-6 drop-shadow-sm transition-transform duration-300 group-hover:scale-110 ${
										product.inStock ? '' : 'opacity-50'
									}`}
								/>
							</div>

							<div className='flex flex-1 flex-col p-5'>
								<p className='text-[11px] font-bold uppercase tracking-wide text-warmgray'>
									{product.category}
								</p>
								<h3 className='mt-1 font-bold text-navy transition-colors duration-300 group-hover:text-amber-dark'>
									{product.name}
								</h3>

								<div className='mt-4 border-t border-black/5 pt-4'>
									<div className='flex items-center justify-between text-sm'>
										<span className='text-warmgray'>
											Purity: {product.purity}
										</span>
										<span className='font-bold text-navy'>
											${product.price.toFixed(2)}
										</span>
									</div>
								</div>

								<button
									type='button'
									disabled={!product.inStock}
									onClick={(event) => {
										event.preventDefault();
										event.stopPropagation();
										addItem(product, 1, false);
									}}
									aria-label={`Add ${product.name} to cart`}
									className='mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-amber px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-amber-dark disabled:cursor-not-allowed disabled:bg-black/10 disabled:text-warmgray'
								>
									<CartIcon className='h-3 w-3' />
									Add to Cart
								</button>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
