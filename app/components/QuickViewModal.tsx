'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { products, type Product } from '../data/products';
import { FREQUENTLY_BOUGHT_SLUGS } from '../data/frequentlyBoughtTogether';
import { useCart } from '../context/CartContext';
import { CartIcon, XIcon } from './icons';

const PAIRED_COUNT = 3;

type QuickViewModalProps = {
	product: Product | null;
	onClose: () => void;
};

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
	const { addItem, openCart } = useCart();

	useEffect(() => {
		if (!product) return;
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') onClose();
		};
		document.addEventListener('keydown', onKeyDown);
		document.body.style.overflow = 'hidden';
		return () => {
			document.removeEventListener('keydown', onKeyDown);
			document.body.style.overflow = '';
		};
	}, [product, onClose]);

	if (!product) return null;

	function handleAddToCart() {
		if (!product) return;
		addItem(product);
		openCart();
		onClose();
	}

	function handleQuickAdd(pairedProduct: Product) {
		addItem(pairedProduct, 1);
		openCart();
		onClose();
	}

	const pairedProducts = FREQUENTLY_BOUGHT_SLUGS.map((slug) =>
		products.find((candidate) => candidate.slug === slug),
	)
		.filter((candidate): candidate is Product => Boolean(candidate))
		.filter((candidate) => candidate.slug !== product.slug)
		.slice(0, PAIRED_COUNT);

	return (
		<div
			className='fixed inset-0 z-100 flex items-center justify-center bg-navy-dark/70 p-6 backdrop-blur-sm'
			onClick={onClose}
		>
			<div
				className='relative border border-amber/20 flex w-full max-w-lg max-h-[90vh] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl '
				onClick={(event) => event.stopPropagation()}
			>
				<button
					type='button'
					onClick={onClose}
					aria-label='Close quick view'
					className='absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-navy transition-colors hover:bg-navy/5 hover:text-amber-dark'
				>
					<XIcon className='h-5 w-5' />
				</button>

				<div className='overflow-y-auto'>
					<div className='relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-b from-navy-dark/5 to-navy-dark/10'>
						<Image
							src={product.image}
							alt={`${product.name} vial`}
							width={220}
							height={220}
							className='h-full w-auto object-contain p-6 drop-shadow-sm'
						/>
					</div>

					<div className='p-6'>
						<p className='text-xs font-bold uppercase tracking-wide text-warmgray'>
							{product.category}
						</p>
						<h3 className='mt-1 text-2xl font-bold text-navy'>
							{product.name}
						</h3>

						<div className='mt-3 flex items-center gap-4 text-sm text-charcoal/75'>
							<span>Purity: {product.purity}</span>
							<span className='h-4 w-px bg-black/10' />
							<span>{product.size}</span>
						</div>

						<p className='mt-4 text-sm leading-relaxed text-charcoal/75'>
							{product.description}
						</p>

						{pairedProducts.length > 0 && (
							<div className='mt-6 border-t border-black/5 pt-6'>
								<p className='text-xs font-bold uppercase tracking-wide text-navy'>
									Commonly Paired With
								</p>
								<ul className='mt-3 space-y-2'>
									{pairedProducts.map((pairedProduct) => (
										<li
											key={pairedProduct.slug}
											className='flex items-center gap-3 rounded-xl border border-amber/30 bg-linear-to-b from-navy-dark/5 to-navy-dark/10 p-2 transition-colors hover:border-amber/60'
										>
											<Link
												href={`/products/${pairedProduct.slug}`}
												className='relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-white'
											>
												<Image
													src={pairedProduct.image}
													alt={pairedProduct.name}
													fill
													sizes='44px'
													className='object-contain p-1'
												/>
											</Link>
											<Link
												href={`/products/${pairedProduct.slug}`}
												className='min-w-0 flex-1'
											>
												<p className='truncate text-sm font-bold text-navy hover:text-amber-dark transition-colors'>
													{pairedProduct.name}
												</p>
												<p className='text-xs font-semibold text-amber-dark'>
													${pairedProduct.price.toFixed(2)}
												</p>
											</Link>
											<button
												type='button'
												onClick={() => handleQuickAdd(pairedProduct)}
												aria-label={`Add ${pairedProduct.name} to cart`}
												className='flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-amber text-white transition-colors hover:bg-amber-dark'
											>
												<CartIcon className='h-3.5 w-3.5' />
											</button>
										</li>
									))}
								</ul>
							</div>
						)}

						<div className='mt-6 flex items-center justify-between border-t border-black/5 pt-6'>
							<span className='text-2xl font-bold text-navy'>
								${product.price.toFixed(2)}
							</span>
							<button
								type='button'
								onClick={handleAddToCart}
								className='cursor-pointer rounded-full bg-amber px-6 py-3 text-xs font-bold uppercase tracking-widest text-navy-dark transition-colors hover:bg-amber-dark'
							>
								Add to Cart
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
