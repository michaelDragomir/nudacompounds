import { products } from './products';

// Powers the /coas directory page — one entry per product. Products whose
// coaAvailable flag is still false show a "currently out for testing"
// message instead of View/Download links (see products.ts).
export const coaListings = products.map((product) => ({
	productName: product.name,
	label: `${product.size.replace(/\s*vial$/i, '')} COA`,
	purity: product.purity,
	batch: product.coa.batch,
	coaUrl: product.coaUrl,
	coaAvailable: product.coaAvailable,
}));
