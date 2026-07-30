import type { Metadata } from 'next';
import { ComingSoonPage } from '../components/ComingSoonPage';

export const metadata: Metadata = {
	title: 'Privacy Policy',
	alternates: { canonical: '/privacy-policy' },
	robots: { index: false, follow: true },
};

export default function PrivacyPolicyPage() {
	return <ComingSoonPage title='Privacy Policy' />;
}
