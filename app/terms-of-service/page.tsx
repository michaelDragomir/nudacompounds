import type { Metadata } from 'next';
import { ComingSoonPage } from '../components/ComingSoonPage';

export const metadata: Metadata = {
	title: 'Terms of Service',
	alternates: { canonical: '/terms-of-service' },
	robots: { index: false, follow: true },
};

export default function TermsOfServicePage() {
	return <ComingSoonPage title='Terms of Service' />;
}
