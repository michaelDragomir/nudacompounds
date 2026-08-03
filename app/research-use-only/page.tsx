import type { Metadata } from 'next';
import { ComingSoonPage } from '../components/ComingSoonPage';

export const metadata: Metadata = {
	title: 'Research Use Only',
	alternates: { canonical: '/research-use-only' },
	robots: { index: false, follow: true },
};

export default function ResearchUseOnlyPage() {
	return <ComingSoonPage title='Research Use Only' />;
}
