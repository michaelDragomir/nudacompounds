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
		...productEntries,
	];
}
