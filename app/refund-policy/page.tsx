import type { Metadata } from 'next';
import { ComingSoonPage } from '../components/ComingSoonPage';

export const metadata: Metadata = {
	title: 'Refund Policy',
	alternates: { canonical: '/refund-policy' },
	robots: { index: false, follow: true },
};

export default function RefundPolicyPage() {
	return <ComingSoonPage title='Refund Policy' />;
}
