import type { Metadata } from 'next';
import { Contact } from '../components/Contact';
import { ContactHero } from '../components/ContactHero';

export const metadata: Metadata = {
	title: 'Contact',
	description:
		'Get in touch with the Nuda Compounds team about products, orders, or research applications.',
	alternates: {
		canonical: '/contact',
	},
};

export default function ContactPage() {
	return (
		<>
			<ContactHero />
			<Contact />
		</>
	);
}
