import type { Metadata } from 'next';
import { TermsOfServiceContent } from '../components/TermsOfServiceContent';

export const metadata: Metadata = {
	title: 'Terms of Service',
	description:
		'Terms governing use of the Nuda Compounds website and purchase of research peptides.',
	alternates: { canonical: '/terms-of-service' },
};

export default function TermsOfServicePage() {
	return <TermsOfServiceContent />;
}
