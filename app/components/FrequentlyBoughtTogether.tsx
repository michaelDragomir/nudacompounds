'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { products, type Product } from '../data/products';
import { ArrowRightIcon, CartIcon } from './icons';

// Add a slug here for any compound that should appear in the "Frequently
// Bought Together" carousel. The carousel automatically shows 3 at a time
// and paddles cycle through the rest, however many are listed.
const FREQUENTLY_BOUGHT_SLUGS = [
	'3-rt',
	'2-rt',
	'bpc-157',
	'ghk-cu',
	'tesamorelin',
	'mots-c',
	'nad-plus',
];

const VISIBLE_COUNT = 3;

export function FrequentlyBoughtTogether({
	currentSlug,
}: {
	currentSlug: string;
}) {
	const { addItem } = useCart();
	const [startIndex, setStartIndex] = useState(0);

	const items = FREQUENTLY_BOUGHT_SLUGS.map((slug) =>
		products.find((product) => product.slug === slug),
	)
		.filter((product): product is Product => Boolean(product))
		.filter((product) => product.slug !== currentSlug);

	if (items.length === 0) return null;

	const visibleCount = Math.min(VISIBLE_COUNT, items.length);
	const maxStartIndex = items.length - visibleCount;
	const canCycle = maxStartIndex > 0;
	const isAtStart = startIndex <= 0;
	const isAtEnd = startIndex >= maxStartIndex;

	const visibleItems = items.slice(startIndex, startIndex + visibleCount);

	function goPrev() {
		setStartIndex((i) => Math.max(0, i - 1));
	}

	function goNext() {
		setStartIndex((i) => Math.min(maxStartIndex, i + 1));
	}

	return (
		<section className='bg-offwhite pb-14'>
			<div className='mx-auto max-w-6xl px-14 sm:px-18'>
				<div className='flex items-center justify-between gap-4'>
					<div>
						<h2 className='font-sora text-2xl font-extrabold leading-tight text-navy sm:text-3xl'>
							Frequently Bought Together
						</h2>
						<p className='mt-2 text-md text-warmgray'>
							Commonly paired to support consistent, reliable experimentation.
						</p>
					</div>

					{canCycle && (
						<div className='flex shrink-0 items-center gap-2'>
							<button
								type='button'
								onClick={goPrev}
								disabled={isAtStart}
								aria-label='Previous compounds'
								className='flex h-9 w-9 items-center justify-center rounded-full border border-navy/20 text-navy transition-colors hover:border-amber hover:text-amber-dark disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-navy/20 disabled:hover:text-navy'
							>
								<ArrowRightIcon className='h-3.5 w-3.5 rotate-180' />
							</button>
							<button
								type='button'
								onClick={goNext}
								disabled={isAtEnd}
								aria-label='Next compounds'
								className='flex h-9 w-9 items-center justify-center rounded-full border border-navy/20 text-navy transition-colors hover:border-amber hover:text-amber-dark disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-navy/20 disabled:hover:text-navy'
							>
								<ArrowRightIcon className='h-3.5 w-3.5' />
							</button>
						</div>
					)}
				</div>

				<div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3'>
					{visibleItems.map((product) => (
						<div
							key={product.slug}
							className='flex flex-col items-center rounded-xl border border-amber/50 bg-linear-to-b from-navy-dark/5 to-navy-dark/10 p-3 transition-colors hover:border-amber shadow-xl'
						>
							<Link
								href={`/products/${product.slug}`}
								className='relative flex h-72 w-72 shrink-0 items-center justify-center overflow-hidden rounded-lg'
							>
								<Image
									src={product.image}
									alt={product.name}
									fill
									sizes='288px'
									className='object-contain p-4 drop-shadow-sm'
								/>
							</Link>

							<div className='w-full text-left'>
								<Link href={`/products/${product.slug}`}>
									<h3 className='mt-2 text-sm font-bold text-navy hover:text-amber-dark transition-colors'>
										{product.name}
									</h3>
								</Link>
								<p className='mt-0.5 text-sm font-bold text-amber-dark'>
									${product.price.toFixed(2)}
								</p>
								<p className='text-xs text-warmgray'>{product.category}</p>
							</div>

							<button
								type='button'
								onClick={() => addItem(product, 1)}
								className='mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg bg-amber px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-amber-dark cursor-pointer'
							>
								<CartIcon className='h-3 w-3' />
								Add to Cart
							</button>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
