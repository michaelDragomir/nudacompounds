import type { Metadata } from 'next';
import { ResearchUseOnlyContent } from '../components/ResearchUseOnlyContent';

export const metadata: Metadata = {
	title: 'Research Use Only',
	description:
		'How Nuda Compounds research peptides may be used, handled, and documented, and what researchers agree to when placing an order.',
	alternates: { canonical: '/research-use-only' },
};

export default function ResearchUseOnlyPage() {
	return <ResearchUseOnlyContent />;
}
