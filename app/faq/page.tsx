import type { Metadata } from 'next';
import { FAQ } from '../components/FAQ';
import { FAQ_ITEMS } from '../data/faq';

export const metadata: Metadata = {
	title: 'FAQs',
	description:
		'Answers to common questions about Certificates of Analysis, shipping, and how Nuda Compounds handles research peptide orders.',
	alternates: {
		canonical: '/faq',
	},
};

export default function FAQPage() {
	const faqJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: FAQ_ITEMS.map((item) => ({
			'@type': 'Question',
			name: item.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: item.answer,
			},
		})),
	};

	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>
			<FAQ />
		</>
	);
}
