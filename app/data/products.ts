export type Product = {
	slug: string;
	name: string;
	category: string;
	description: string;
	purity: string;
	size: string;
	price: number;
	image: string;
	inStock: boolean;
};

export const products: Product[] = [
	{
		slug: 'retatrutide',
		name: 'Retatrutide',
		category: 'Metabolic Research',
		description: 'Triple agonist GLP-1 / GIP / glucagon receptor',
		purity: '≥99%',
		size: '24mg vial',
		price: 140,
		image: '/retatrutide-vial.png',
		inStock: true,
	},
	{
		slug: 'tirzepatide',
		name: 'Tirzepatide',
		category: 'Metabolic Research',
		description: 'Dual GIP / GLP-1 receptor agonist',
		purity: '≥99%',
		size: '10mg vial',
		price: 149,
		image: '/tirzepatide-vial.png',
		inStock: false,
	},
	{
		slug: 'bpc-157',
		name: 'BPC-157',
		category: 'Recovery Research',
		description: 'Body protective compound for research',
		purity: '≥99%',
		size: '10mg vial',
		price: 29,
		image: '/bpc157-vial.png',
		inStock: true,
	},
];
