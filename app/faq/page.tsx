import type { Metadata } from 'next';
import { FAQ } from '../components/FAQ';

export const metadata: Metadata = {
	title: 'FAQs',
	description:
		'Answers to common questions about Certificates of Analysis, shipping, and how Nuda Compounds handles research peptide orders.',
	alternates: {
		canonical: '/faq',
	},
};

export default function FAQPage() {
	return <FAQ />;
}
