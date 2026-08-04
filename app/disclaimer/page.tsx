import type { Metadata } from 'next';
import { DisclaimerContent } from '../components/DisclaimerContent';

export const metadata: Metadata = {
	title: 'Disclaimer',
	description:
		'Research use, product use, liability, and buyer responsibility disclaimer for Nuda Compounds research peptides.',
	alternates: { canonical: '/disclaimer' },
};

export default function DisclaimerPage() {
	return <DisclaimerContent />;
}
