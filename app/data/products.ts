export type Product = {
	slug: string;
	name: string;
	category: string;
	description: string;
	purity: string;
	size: string;
	price: number;
	bulkPrice10: number;
	image: string;
	inStock: boolean;
	kitEligible: boolean;
	coa: {
		batch: string;
		form: string;
		endotoxins: string;
		tested: string;
	};
};

export const products: Product[] = [
	{
		slug: '3-rt',
		name: 'GLP-3 RT',
		category: 'Metabolic Research',
		description:
			'A synthetic tri-receptor agonist peptide (GIP/GLP-1/glucagon) referenced in published in-vitro receptor-binding literature. Supplied lyophilized as a laboratory reference compound.',
		purity: '≥99%',
		size: '10mg vial',
		price: 40,
		bulkPrice10: 190,
		image: '/images/3rt.png',
		inStock: false,
		kitEligible: true,
		coa: {
			batch: 'AUR-908157',
			form: 'Lyophilized Powder',
			endotoxins: 'PASS',
			tested: '07/20/26',
		},
	},
	{
		slug: '2-trz',
		name: 'GLP-2 TRZ',
		category: 'Metabolic Research',
		description:
			'A synthetic dual-receptor agonist peptide (GIP/GLP-1) referenced in published in-vitro receptor-binding literature. Supplied lyophilized as a laboratory reference compound.',
		purity: '≥99%',
		size: '10mg vial',
		price: 30,
		bulkPrice10: 150,
		image: '/images/2rt.png',
		inStock: true,
		kitEligible: true,
		coa: {
			batch: 'AUR-914402',
			form: 'Lyophilized Powder',
			endotoxins: 'PASS',
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
		price: 30,
		bulkPrice10: 230,
		image: '/images/bpc.png',
		inStock: true,
		kitEligible: false,
		coa: {
			batch: 'AUR-902210',
			form: 'Lyophilized Powder',
			endotoxins: 'PASS',
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
		bulkPrice10: 280,
		image: '/images/ghk.png',
		inStock: true,
		kitEligible: false,
		coa: {
			batch: 'AUR-920071',
			form: 'Lyophilized Powder',
			endotoxins: 'PASS',
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
		price: 150,
		bulkPrice10: 400,
		image: '/images/tesamorelin.png',
		inStock: true,
		kitEligible: false,
		coa: {
			batch: 'AUR-931588',
			form: 'Lyophilized Powder',
			endotoxins: 'PASS',
			tested: '07/10/26',
		},
	},
	{
		slug: 'mots-c',
		name: 'MOTS-c',
		category: 'Metabolic Research',
		description:
			'A mitochondrial-derived peptide referenced in published metabolic and cellular-energy research literature. Supplied lyophilized as a laboratory reference compound.',
		purity: '≥99%',
		size: '10mg vial',
		price: 40,
		bulkPrice10: 520,
		image: '/images/mots.png',
		inStock: true,
		kitEligible: false,
		coa: {
			batch: 'AUR-984127',
			form: 'Lyophilized Powder',
			endotoxins: 'PASS',
			tested: '06/25/26',
		},
	},
	{
		slug: 'nad-plus',
		name: 'NAD+',
		category: 'Metabolic Research',
		description:
			'Nicotinamide adenine dinucleotide, a coenzyme studied in published cellular-energy and longevity research literature. Supplied lyophilized as a laboratory reference compound.',
		purity: '≥99%',
		size: '500mg vial',
		price: 50,
		bulkPrice10: 1200,
		image: '/images/nad.png',
		inStock: true,
		kitEligible: false,
		coa: {
			batch: 'AUR-990284',
			form: 'Lyophilized Powder',
			endotoxins: 'PASS',
			tested: '06/22/26',
		},
	},
	{
		slug: 'bac-water',
		name: 'BAC Water',
		category: 'Lab Supplies',
		description:
			'Bacteriostatic water used to reconstitute lyophilized peptides for laboratory handling. Sterile-filtered and supplied in a sealed vial.',
		purity: 'USP Grade',
		size: '10mL vial',
		price: 20,
		bulkPrice10: 85,
		image: '/images/bacWater.png',
		inStock: true,
		kitEligible: false,
		coa: {
			batch: 'AUR-899142',
			form: 'Sterile Liquid',
			endotoxins: 'PASS',
			tested: '07/08/26',
		},
	},
];
