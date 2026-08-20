import { products } from './products';

// Powers the /coas directory page. Each entry represents one published COA
// document, grouped by product. All three currently point at the same
// placeholder PDF (see products.ts) until real per-batch files replace them.
const COA_LISTING_SLUGS = ['3-rt', '2-trz', 'bpc-157'];

export const coaListings = COA_LISTING_SLUGS.map((slug) => {
	const product = products.find((p) => p.slug === slug);
	if (!product) {
		throw new Error(`coaListings references unknown product slug: ${slug}`);
	}
	return {
		productName: product.name,
		label: `${product.size.replace(/\s*vial$/i, '')} COA`,
		purity: product.purity,
		batch: product.coa.batch,
		coaUrl: product.coaUrl,
	};
});
