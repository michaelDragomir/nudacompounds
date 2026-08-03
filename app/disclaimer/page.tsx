import type { Metadata } from 'next';
import { ComingSoonPage } from '../components/ComingSoonPage';

export const metadata: Metadata = {
	title: 'Disclaimer',
	alternates: { canonical: '/disclaimer' },
	robots: { index: false, follow: true },
};

export default function DisclaimerPage() {
	return <ComingSoonPage title='Disclaimer' />;
}
