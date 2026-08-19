'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import type { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { renderWithBold } from '../lib/renderWithBold';
import { DownloadIcon, EyeIcon, XIcon } from './icons';

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

	return (
		<div
			className='fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-navy-dark/70 p-6 backdrop-blur-sm'
			onClick={onClose}
		>
			<div
				className='relative border border-amber/20 flex w-full max-w-2xl flex-col rounded-2xl bg-white shadow-2xl'
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

				<div className='p-5'>
					<div className='flex flex-col gap-5 sm:flex-row'>
						<div className='relative flex h-36 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-linear-to-b from-navy-dark/5 to-navy-dark/10 shadow-xl sm:h-auto sm:w-36'>
							<Image
								src={product.image}
								alt={`${product.name} vial`}
								width={140}
								height={140}
								className='h-full w-auto object-contain p-4 drop-shadow-lg'
							/>
						</div>

						<div className='flex-1'>
							<p className='text-xs font-bold uppercase tracking-wide text-warmgray'>
								{product.category}
							</p>
							<h3 className='mt-1 text-2xl font-bold text-navy'>
								{product.name}
							</h3>

							<div className='mt-2 flex items-center gap-4 text-sm text-charcoal/75'>
								<span>Purity: {product.purity}</span>
								<span className='h-4 w-px bg-black/10' />
								<span>{product.size}</span>
							</div>

							<div className='mt-3 flex items-center justify-between'>
								<span className='text-2xl font-bold text-navy'>
									${product.price.toFixed(2)}
								</span>
								<button
									type='button'
									onClick={handleAddToCart}
									className='cursor-pointer rounded-full bg-amber px-6 py-3 text-xs font-bold uppercase tracking-widest text-navy-dark transition-colors hover:bg-amber-dark shadow-xl'
								>
									Add to Cart
								</button>
							</div>

							<p className='mt-3 text-sm leading-relaxed text-charcoal/75'>
								{renderWithBold(product.description)}
							</p>
						</div>
					</div>

					<div className='mt-4 rounded-2xl border border-black/5 bg-offwhite p-4 shadow-xl'>
						<p className='mb-2 text-xs font-bold uppercase tracking-widest text-navy'>
							Certificate of Analysis
						</p>
						<span className='inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-emerald-700'>
							Latest
						</span>
						<p className='mt-2 text-lg font-bold text-navy'>
							Exceeds {product.purity} Purity
						</p>

						<dl className='mt-2 space-y-1 text-sm'>
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

						<div className='mt-3 flex gap-3'>
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
	);
}
