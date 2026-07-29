import type { MetadataRoute } from 'next';
import { products } from './data/products';
import { SITE_URL } from './lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date();

	const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
		url: `${SITE_URL}/products/${product.slug}`,
		lastModified: now,
		changeFrequency: 'weekly',
		priority: 0.8,
	}));

	return [
		{
			url: SITE_URL,
			lastModified: now,
			changeFrequency: 'weekly',
			priority: 1,
		},
		{
			url: `${SITE_URL}/catalog`,
			lastModified: now,
			changeFrequency: 'weekly',
			priority: 0.9,
		},
		{
			url: `${SITE_URL}/faq`,
			lastModified: now,
			changeFrequency: 'monthly',
			priority: 0.6,
		},
		{
			url: `${SITE_URL}/contact`,
			lastModified: now,
			changeFrequency: 'monthly',
			priority: 0.6,
		},
		...productEntries,
	];
}
