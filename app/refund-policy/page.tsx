import type { Metadata } from 'next';
import { RefundPolicyContent } from '../components/RefundPolicyContent';

export const metadata: Metadata = {
	title: 'Refund & Returns Policy',
	description:
		'How Nuda Compounds handles order cancellations, delivery delays, damaged or incorrect shipments, and purity disputes.',
	alternates: { canonical: '/refund-policy' },
};

export default function RefundPolicyPage() {
	return <RefundPolicyContent />;
}
