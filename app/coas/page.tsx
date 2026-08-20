import type { Metadata } from 'next';
import { coaListings } from '../data/coaListings';
import { SITE_URL } from '../lib/site';
import { DocumentIcon, DownloadIcon, EyeIcon } from '../components/icons';

export const metadata: Metadata = {
	title: 'Certificates of Analysis',
	description:
		'Complete analytical documentation for every compound. View and download batch-specific Certificates of Analysis (COAs) for your records.',
	alternates: {
		canonical: '/coas',
	},
};

const breadcrumbJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'BreadcrumbList',
	itemListElement: [
		{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
		{
			'@type': 'ListItem',
			position: 2,
			name: 'Certificates of Analysis',
			item: `${SITE_URL}/coas`,
		},
	],
};

function groupByProduct() {
	const groups = new Map<string, typeof coaListings>();
	for (const item of coaListings) {
		const existing = groups.get(item.productName) ?? [];
		existing.push(item);
		groups.set(item.productName, existing);
	}
	return Array.from(groups.entries());
}

export default function CoasPage() {
	const groups = groupByProduct();

	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>

			<section className='bg-navy-dark pb-20 pt-28'>
				<div className='mx-auto max-w-4xl px-6 text-center'>
					<span className='text-xs font-bold uppercase tracking-[0.3em] text-amber'>
						Documentation
					</span>
					<h1 className='mt-2 font-sora text-4xl font-extrabold leading-tight text-offwhite sm:text-5xl'>
						Certificates of Analysis
					</h1>
					<p className='mx-auto mt-4 max-w-2xl text-white/60'>
						Complete analytical documentation for every compound. View and
						download batch-specific COAs for your records.
					</p>
				</div>

				<div className='mx-auto mt-14 max-w-4xl px-6'>
					{groups.map(([productName, items]) => (
						<div key={productName} className='mb-10 last:mb-0'>
							<div className='flex items-center gap-4'>
								<h2 className='text-lg font-bold text-offwhite'>
									{productName}
								</h2>
								<span className='h-px flex-1 bg-white/10' />
							</div>

							<div className='mt-4 space-y-3'>
								{items.map((item) => (
									<div
										key={item.label}
										className='flex flex-col gap-4 rounded-2xl border border-amber/20 bg-white/5 px-5 py-4 shadow-lg sm:flex-row sm:items-center sm:justify-between'
									>
										<div className='flex items-center gap-4'>
											<span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-amber/30 bg-amber/10 text-amber'>
												<DocumentIcon className='h-5 w-5' />
											</span>
											<div>
												<p className='font-bold text-offwhite'>
													{item.label}
												</p>
												<p className='text-sm text-white/50'>
													Purity {item.purity} &middot; Batch #{item.batch}
												</p>
											</div>
										</div>

										<div className='flex shrink-0 items-center gap-3'>
											<a
												href={item.coaUrl}
												target='_blank'
												rel='noopener noreferrer'
												className='flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-xs font-bold uppercase tracking-wide text-offwhite/80 transition-colors hover:border-amber hover:text-amber'
											>
												<EyeIcon className='h-4 w-4' />
												View
											</a>
											<a
												href={item.coaUrl}
												download
												className='flex items-center gap-1.5 rounded-full border border-amber/50 px-4 py-2 text-xs font-bold uppercase tracking-wide text-amber transition-colors hover:bg-amber hover:text-navy-dark'
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
		</>
	);
}
