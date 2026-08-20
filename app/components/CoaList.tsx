import { coaListings } from '../data/coaListings';
import { DocumentIcon, DownloadIcon, EyeIcon } from './icons';

function groupByProduct() {
	const groups = new Map<string, typeof coaListings>();
	for (const item of coaListings) {
		const existing = groups.get(item.productName) ?? [];
		existing.push(item);
		groups.set(item.productName, existing);
	}
	return Array.from(groups.entries());
}

export function CoaList() {
	const groups = groupByProduct();

	return (
		<section className='bg-offwhite py-16'>
			<div className='mx-auto max-w-4xl px-6'>
				{groups.map(([productName, items]) => (
					<div key={productName} className='mb-10 last:mb-0'>
						<div className='flex items-center gap-4'>
							<h2 className='text-lg font-bold text-navy'>{productName}</h2>
							<span className='h-px flex-1 bg-black/10' />
						</div>

						<div className='mt-4 space-y-3'>
							{items.map((item) => (
								<div
									key={item.label}
									className='flex flex-col gap-4 rounded-2xl border border-amber/40 bg-white px-5 py-4 shadow-lg sm:flex-row sm:items-center sm:justify-between transition-colors hover:border-amber/80'
								>
									<div className='flex items-center gap-4'>
										<span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-amber/30 bg-amber/10 text-amber-dark'>
											<DocumentIcon className='h-5 w-5' />
										</span>
										<div>
											<p className='font-bold text-navy'>{item.label}</p>
											<p className='text-sm text-warmgray'>
												Purity {item.purity} &middot; Batch #{item.batch}
											</p>
										</div>
									</div>

									<div className='flex shrink-0 items-center gap-3'>
										<a
											href={item.coaUrl}
											target='_blank'
											rel='noopener noreferrer'
											className='flex items-center gap-1.5 rounded-full border border-navy/20 px-4 py-2 text-xs font-bold uppercase tracking-wide text-navy transition-colors hover:border-amber hover:text-amber-dark'
										>
											<EyeIcon className='h-4 w-4' />
											View
										</a>
										<a
											href={item.coaUrl}
											download
											className='flex items-center gap-1.5 rounded-full bg-amber px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-amber-dark'
										>
											<DownloadIcon className='h-4 w-4' />
											Download
										</a>
									</div>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
