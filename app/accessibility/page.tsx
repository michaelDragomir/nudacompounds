import type { Metadata } from 'next';
import { ComingSoonPage } from '../components/ComingSoonPage';

export const metadata: Metadata = {
	title: 'Accessibility',
	alternates: { canonical: '/accessibility' },
	robots: { index: false, follow: true },
};

export default function AccessibilityPage() {
	return <ComingSoonPage title='Accessibility' />;
}
