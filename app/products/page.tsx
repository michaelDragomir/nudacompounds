import type { Metadata } from 'next';
import { Products } from '../components/Products';
import { ProductsHero } from '../components/ProductsHero';
import { SITE_URL } from '../lib/site';

export const metadata: Metadata = {
	title: 'Products',
	description:
		'Browse the full Nuda Compounds product line. Every vial ships with a published Certificate of Analysis and batch-level documentation.',
	alternates: {
		canonical: '/products',
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
			name: 'Products',
			item: `${SITE_URL}/products`,
		},
	],
};

export default function ProductsPage() {
	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<ProductsHero />
			<Products />
		</>
	);
}
