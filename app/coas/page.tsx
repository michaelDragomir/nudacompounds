import type { Metadata } from 'next';
import { CoaList } from '../components/CoaList';
import { SITE_URL } from '../lib/site';

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

export default function CoasPage() {
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

				<CoaList />
			</section>
		</>
	);
}
