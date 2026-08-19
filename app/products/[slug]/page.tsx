import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { products } from '../../data/products';
import { ProductDetail } from '../../components/ProductDetail';
import { SITE_URL } from '../../lib/site';

export function generateStaticParams() {
	return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const product = products.find((p) => p.slug === slug);

	if (!product) {
		return { title: 'Product Not Found' };
	}

	const url = `/products/${product.slug}`;

	return {
		title: product.name,
		description: product.description,
		alternates: {
			canonical: url,
		},
		openGraph: {
			type: 'website',
			url,
			title: product.name,
			description: product.description,
			images: [
				{
					url: product.image,
					width: 400,
					height: 400,
					alt: `${product.name} vial`,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: product.name,
			description: product.description,
			images: [product.image],
		},
	};
}

export default async function ProductPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const product = products.find((p) => p.slug === slug);

	if (!product) {
		notFound();
	}

	const productUrl = `${SITE_URL}/products/${product.slug}`;

	const productJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: product.name,
		description: product.description,
		image: `${SITE_URL}${product.image}`,
		sku: product.slug,
		category: product.category,
		url: productUrl,
		offers: {
			'@type': 'Offer',
			url: productUrl,
			priceCurrency: 'USD',
			price: product.price,
			availability: product.inStock
				? 'https://schema.org/InStock'
				: 'https://schema.org/OutOfStock',
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
			{
				'@type': 'ListItem',
				position: 3,
				name: product.name,
				item: productUrl,
			},
		],
	};

	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
			/>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>
			<ProductDetail product={product} />
		</>
	);
}
