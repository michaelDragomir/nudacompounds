import type { Metadata } from 'next';
import { PrivacyPolicyContent } from '../components/PrivacyPolicyContent';

export const metadata: Metadata = {
	title: 'Privacy Policy',
	description:
		'How Nuda Compounds collects, uses, and protects your personal information.',
	alternates: { canonical: '/privacy-policy' },
};

export default function PrivacyPolicyPage() {
	return <PrivacyPolicyContent />;
}
