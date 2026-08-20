import type { Product } from '../data/products';
import { DownloadIcon, EyeIcon } from './icons';

export function ProductCoaCard({ product }: { product: Product }) {
	return (
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
					<dd className='font-semibold text-charcoal'>{product.size}</dd>
				</div>
				<div className='flex justify-between'>
					<dt className='text-warmgray'>Batch #</dt>
					<dd className='font-semibold text-charcoal'>
						{product.coa.batch}
					</dd>
				</div>
				<div className='flex justify-between'>
					<dt className='text-warmgray'>Form</dt>
					<dd className='font-semibold text-charcoal'>{product.coa.form}</dd>
				</div>
				<div className='flex justify-between'>
					<dt className='text-warmgray'>Tested</dt>
					<dd className='font-semibold text-charcoal'>
						{product.coa.tested}
					</dd>
				</div>
			</dl>

			<div className='mt-3 flex gap-3'>
				{product.coaAvailable ? (
					<>
						<a
							href={product.coaUrl}
							target='_blank'
							rel='noopener noreferrer'
							className='flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-navy/20 px-3 py-2 text-xs font-bold text-navy transition-colors hover:border-amber hover:text-amber-dark'
						>
							<EyeIcon className='h-4 w-4' />
							View
						</a>
						<a
							href={product.coaUrl}
							download
							className='flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-navy/20 px-3 py-2 text-xs font-bold text-navy transition-colors hover:border-amber hover:text-amber-dark'
						>
							<DownloadIcon className='h-4 w-4' />
							Download
						</a>
					</>
				) : (
					<>
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
					</>
				)}
			</div>
		</div>
	);
}
