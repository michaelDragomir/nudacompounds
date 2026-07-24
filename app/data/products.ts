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
	{
		slug: 'ghk-cu',
		name: 'GHK-Cu',
		category: 'Recovery Research',
		description:
			'A naturally occurring copper-binding tripeptide studied in published literature for its role in tissue remodeling and dermal research models. Supplied lyophilized for laboratory use.',
		purity: '≥99%',
		size: '50mg vial',
		price: 35,
		image: '/retatrutide.png',
		inStock: true,
		coa: {
			batch: 'AUR-920071',
			form: 'Lyophilized Powder',
			tested: '07/12/26',
		},
	},
	{
		slug: 'tesamorelin',
		name: 'Tesamorelin',
		category: 'Metabolic Research',
		description:
			'A synthetic growth-hormone-releasing hormone (GHRH) analog referenced in published endocrine research literature. Supplied lyophilized as a laboratory reference compound.',
		purity: '≥99%',
		size: '10mg vial',
		price: 50,
		image: '/tirzepatide.png',
		inStock: false,
		coa: {
			batch: 'AUR-931588',
			form: 'Lyophilized Powder',
			tested: '07/10/26',
		},
	},
	{
		slug: 'reconstitution-solution',
		name: 'Reconstitution Solution',
		category: 'Lab Supplies',
		description:
			'Bacteriostatic water used to reconstitute lyophilized peptides for laboratory handling. Sterile-filtered and supplied in a sealed vial.',
		purity: 'USP Grade',
		size: '10mL vial',
		price: 10,
		image: '/bpc157.png',
		inStock: true,
		coa: {
			batch: 'AUR-899142',
			form: 'Sterile Liquid',
			tested: '07/08/26',
		},
	},
	{
		slug: 'semaglutide',
		name: 'Semaglutide',
		category: 'Metabolic Research',
		description:
			'A synthetic GLP-1 receptor agonist referenced in published metabolic research literature. Supplied lyophilized as a laboratory reference compound.',
		purity: '≥99%',
		size: '10mg vial',
		price: 120,
		image: '/tirzepatide.png',
		inStock: true,
		coa: {
			batch: 'AUR-945213',
			form: 'Lyophilized Powder',
			tested: '07/05/26',
		},
	},
	{
		slug: 'ipamorelin',
		name: 'Ipamorelin',
		category: 'Recovery Research',
		description:
			'A selective growth-hormone secretagogue peptide referenced in published endocrine research literature. Supplied lyophilized as a laboratory reference compound.',
		purity: '≥99%',
		size: '5mg vial',
		price: 45,
		image: '/bpc157.png',
		inStock: true,
		coa: {
			batch: 'AUR-951087',
			form: 'Lyophilized Powder',
			tested: '07/03/26',
		},
	},
	{
		slug: 'cjc-1295',
		name: 'CJC-1295',
		category: 'Recovery Research',
		description:
			'A synthetic GHRH analog referenced in published endocrine research literature, often studied alongside growth-hormone secretagogues. Supplied lyophilized for laboratory use.',
		purity: '≥99%',
		size: '5mg vial',
		price: 55,
		image: '/retatrutide.png',
		inStock: true,
		coa: {
			batch: 'AUR-962345',
			form: 'Lyophilized Powder',
			tested: '07/01/26',
		},
	},
	{
		slug: 'cagrilintide',
		name: 'Cagrilintide',
		category: 'Metabolic Research',
		description:
			'A long-acting amylin receptor agonist referenced in published metabolic research literature. Supplied lyophilized as a laboratory reference compound.',
		purity: '≥99%',
		size: '10mg vial',
		price: 135,
		image: '/tirzepatide.png',
		inStock: false,
		coa: {
			batch: 'AUR-973456',
			form: 'Lyophilized Powder',
			tested: '06/28/26',
		},
	},
];
