import type { Metadata } from 'next';
import { Catalog } from '../components/Catalog';
import { CatalogHero } from '../components/CatalogHero';
import { SITE_URL } from '../lib/site';

export const metadata: Metadata = {
	title: 'Catalog',
	description:
		'Browse the full Nuda Compounds research catalog. Every vial ships with a published Certificate of Analysis and batch-level documentation.',
	alternates: {
		canonical: '/catalog',
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
			name: 'Catalog',
			item: `${SITE_URL}/catalog`,
		},
	],
};

export default function CatalogPage() {
	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<CatalogHero />
			<Catalog />
		</>
	);
}
