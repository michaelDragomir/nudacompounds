export type Product = {
	slug: string;
	name: string;
	category: string;
	description: string;
	// Optional trailing text rendered in bold after `description` — for a
	// disclaimer or caveat that should stand out from the rest of the copy.
	descriptionEmphasis?: string;
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
	// Public path to this batch's Certificate of Analysis PDF (served from
	// /public/coas). Every product currently points at the same placeholder
	// file until real per-batch PDFs are uploaded.
	coaUrl: string;
	// Whether coaUrl is a real, product-specific PDF. Only one has been
	// uploaded so far — the rest still point at the placeholder file above,
	// so their View/Download buttons stay muted until real ones are added.
	coaAvailable: boolean;
};

const PLACEHOLDER_COA_URL = '/coas/NUDA-1010.pdf';

export const products: Product[] = [
	{
		slug: '3-rt',
		name: 'GLP-3 RT',
		category: 'Metabolic Research',
		description:
			'GLP-3 RT Retatrutide is a synthetic peptide research material used in laboratory investigation of GLP-1, GIP, and glucagon receptor signaling. Its distinctive triple-receptor profile makes it a compelling research candidate for studying receptor interactions, downstream signaling pathways, and metabolic signaling mechanisms.',
		purity: '≥99%',
		size: '10mg vial',
		price: 40,
		bulkPrice10: 190,
		image: '/images/3rt.png',
		inStock: true,
		kitEligible: true,
		coa: {
			batch: 'NUDA-1010',
			form: 'Lyophilized Powder',
			endotoxins: 'PASS',
			tested: '07/20/26',
		},
		coaUrl: PLACEHOLDER_COA_URL,
		coaAvailable: true,
	},
	{
		slug: '2-trz',
		name: 'GLP-2 TRZ',
		category: 'Metabolic Research',
		description:
			'AGLP-2 TRZ Tirzepatide is a synthetic peptide research material used in laboratory investigation of GLP-1 and GIP receptor signaling. Its distinctive dual-receptor profile makes it a compelling research candidate for studying receptor interactions, downstream signaling pathways, and metabolic signaling mechanisms.',
		purity: '≥99%',
		size: '10mg vial',
		price: 30,
		bulkPrice10: 180,
		image: '/images/2rt.png',
		inStock: true,
		kitEligible: true,
		coa: {
			batch: 'NUDA-1011',
			form: 'Lyophilized Powder',
			endotoxins: 'PASS',
			tested: '07/18/26',
		},
		coaUrl: PLACEHOLDER_COA_URL,
		coaAvailable: false,
	},
	{
		slug: 'bpc-157',
		name: 'BPC-157',
		category: 'Recovery Research',
		description:
			'BPC-157 is a widely studied synthetic peptide research material with a distinctive profile across cellular signaling and tissue-response research. Its versatility makes it a compelling candidate for investigating cellular migration, angiogenic signaling, tissue remodeling, and related biological mechanisms.',
		purity: '≥99%',
		size: '10mg vial',
		price: 30,
		bulkPrice10: 230,
		image: '/images/bpc.png',
		inStock: true,
		kitEligible: false,
		coa: {
			batch: 'NUDA-1012',
			form: 'Lyophilized Powder',
			endotoxins: 'PASS',
			tested: '07/15/26',
		},
		coaUrl: PLACEHOLDER_COA_URL,
		coaAvailable: false,
	},
	{
		slug: 'ghk-cu',
		name: 'GHK-Cu',
		category: 'Recovery Research',
		description:
			'GHK-Cu is a widely studied copper-binding tripeptide valued for its unique combination of peptide signaling and copper-binding activity. Its distinctive research profile has generated significant interest in experimental models of **skin and hair biology**, extracellular matrix signaling, cellular remodeling, and copper-dependent biological pathways, making GHK-Cu a versatile subject for advanced peptide research.',
		purity: '≥99%',
		size: '50mg vial',
		price: 35,
		bulkPrice10: 280,
		image: '/images/ghk.png',
		inStock: true,
		kitEligible: false,
		coa: {
			batch: 'NUDA-1013',
			form: 'Lyophilized Powder',
			endotoxins: 'PASS',
			tested: '07/12/26',
		},
		coaUrl: PLACEHOLDER_COA_URL,
		coaAvailable: false,
	},
	{
		slug: 'tesamorelin',
		name: 'Tesamorelin',
		category: 'Metabolic Research',
		description:
			'Tesamorelin is a synthetic peptide research material recognized for its distinctive activity within growth hormone–releasing hormone (GHRH) receptor signaling. Its targeted research profile makes it a compelling subject for investigating GH-axis signaling, endocrine pathway dynamics, and downstream metabolic signaling mechanisms across controlled experimental models.',
		purity: '≥99%',
		size: '10mg vial',
		price: 40,
		bulkPrice10: 400,
		image: '/images/tesamorelin.png',
		inStock: true,
		kitEligible: false,
		coa: {
			batch: 'NUDA-1014',
			form: 'Lyophilized Powder',
			endotoxins: 'PASS',
			tested: '07/10/26',
		},
		coaUrl: PLACEHOLDER_COA_URL,
		coaAvailable: false,
	},
	{
		slug: 'mots-c',
		name: 'MOTS-c',
		category: 'Metabolic Research',
		description:
			'MOTS-c is a mitochondrial-derived peptide research material recognized for its growing scientific interest in cellular energy and metabolic signaling. Its distinctive research profile makes it a compelling subject for investigating mitochondrial communication, cellular stress-response pathways, energy homeostasis, and metabolic adaptation across controlled experimental models.',
		purity: '≥99%',
		size: '10mg vial',
		price: 40,
		bulkPrice10: 520,
		image: '/images/mots.png',
		inStock: true,
		kitEligible: false,
		coa: {
			batch: 'NUDA-1015',
			form: 'Lyophilized Powder',
			endotoxins: 'PASS',
			tested: '06/25/26',
		},
		coaUrl: PLACEHOLDER_COA_URL,
		coaAvailable: false,
	},
	{
		slug: 'nad-plus',
		name: 'NAD+',
		category: 'Metabolic Research',
		description:
			'NAD+ (Nicotinamide Adenine Dinucleotide) is a foundational cellular cofactor and a prominent subject of research into energy metabolism, mitochondrial biology, and cellular resilience. Its central role in redox reactions and NAD+-dependent signaling makes it a versatile research material for exploring metabolic regulation, cellular stress responses, and pathways associated with cellular aging',
		purity: '≥99%',
		size: '500mg vial',
		price: 50,
		bulkPrice10: 1200,
		image: '/images/nad.png',
		inStock: true,
		kitEligible: false,
		coa: {
			batch: 'NUDA-1016',
			form: 'Lyophilized Powder',
			endotoxins: 'PASS',
			tested: '06/22/26',
		},
		coaUrl: PLACEHOLDER_COA_URL,
		coaAvailable: false,
	},
	{
		slug: 'bac-water',
		name: 'BAC Water',
		category: 'Lab Supplies',
		description:
			'Bacteriostatic water used to reconstitute lyophilized peptides for laboratory handling. Sterile-filtered and supplied in a sealed vial.',
		purity: 'USP Grade',
		size: '10mL vial',
		price: 9.99,
		bulkPrice10: 85,
		image: '/images/bacWater.png',
		inStock: true,
		kitEligible: false,
		coa: {
			batch: 'NUDA-1017',
			form: 'Sterile Liquid',
			endotoxins: 'PASS',
			tested: '07/08/26',
		},
		coaUrl: PLACEHOLDER_COA_URL,
		coaAvailable: false,
	},
];
