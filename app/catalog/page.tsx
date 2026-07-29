import type { Metadata } from 'next';
import { Catalog } from '../components/Catalog';

export const metadata: Metadata = {
	title: 'Catalog',
	description:
		'Browse the full Nuda Compounds research catalog. Every vial ships with a published Certificate of Analysis and batch-level documentation.',
	alternates: {
		canonical: '/catalog',
	},
};

export default function CatalogPage() {
	return <Catalog />;
}
