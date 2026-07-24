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
	coa: {
		batch: string;
		form: string;
		tested: string;
	};
};

export const products: Product[] = [
	{
		slug: '3-rt',
		name: '3-RT',
		category: 'Metabolic Research',
		description:
			'A synthetic tri-receptor agonist peptide (GIP/GLP-1/glucagon) referenced in published in-vitro receptor-binding literature. Supplied lyophilized as a laboratory reference compound.',
		purity: '≥99%',
		size: '24mg vial',
		price: 140,
		image: '/retatrutide.png',
		inStock: true,
		coa: {
			batch: 'AUR-908157',
			form: 'Lyophilized Powder',
			tested: '07/20/26',
		},
	},
	{
		slug: '2-rt',
		name: '2-RT',
		category: 'Metabolic Research',
		description:
			'A synthetic dual-receptor agonist peptide (GIP/GLP-1) referenced in published in-vitro receptor-binding literature. Supplied lyophilized as a laboratory reference compound.',
		purity: '≥99%',
		size: '10mg vial',
		price: 149,
		image: '/tirzepatide.png',
		inStock: false,
		coa: {
			batch: 'AUR-914402',
			form: 'Lyophilized Powder',
			tested: '07/18/26',
		},
	},
	{
		slug: 'bpc-157',
		name: 'BPC-157',
		category: 'Recovery Research',
		description:
			'A synthetic pentadecapeptide derived from a partial sequence of body protective compound (BPC), commonly referenced in gastrointestinal and tissue-repair research literature.',
		purity: '≥99%',
		size: '10mg vial',
		price: 29,
		image: '/bpc157.png',
		inStock: true,
		coa: {
			batch: 'AUR-902210',
			form: 'Lyophilized Powder',
			tested: '07/15/26',
		},
	},
];
