import type { Metadata } from 'next';
import { Coa } from '../components/Coa';
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

			<Coa />
		</>
	);
}
