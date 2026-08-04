'use client';

import Link from 'next/link';
import { LegalDocument, type LegalSection } from './LegalDocument';

const SECTIONS: LegalSection[] = [
	{
		id: 'research-use-only',
		number: 1,
		title: 'Research Use Only',
		body: (
			<>
				<p>
					All products sold by Nuda Compounds are intended exclusively for
					in-vitro laboratory and scientific research. They are not intended
					for human or veterinary use, and are not food additives, drugs,
					cosmetics, or household chemicals.
				</p>
				<p>
					Nuda Compounds operates solely as a supplier of research chemicals.
					Nuda Compounds is not a pharmacy, compounding pharmacy, or
					outsourcing facility as defined under Sections 503A or 503B of the
					Federal Food, Drug, and Cosmetic Act, and does not manufacture,
					compound, or supply any product for clinical, therapeutic, or
					human/veterinary use.
				</p>
			</>
		),
	},
	{
		id: 'general-disclaimer',
		number: 2,
		title: 'General Disclaimer',
		body: (
			<p>
				Information on this site is provided for general informational
				purposes only. While we work to keep it accurate and current, we make
				no representations or warranties of any kind, express or implied,
				about the completeness, accuracy, reliability, or suitability of any
				information, products, or services on this site.
			</p>
		),
	},
	{
		id: 'product-use',
		number: 3,
		title: 'Product Use',
		body: (
			<>
				<p>All Nuda Compounds products:</p>
				<ul className='list-disc space-y-2 pl-5 marker:text-amber'>
					<li>Are sold strictly for in-vitro research and laboratory use only</li>
					<li>Are not intended for human or veterinary use</li>
					<li>
						Are not intended for use as food additives, drugs, cosmetics, or
						household chemicals
					</li>
					<li>Are not intended to diagnose, treat, cure, or prevent any disease</li>
					<li>Should be handled only by qualified, licensed, and trained professionals</li>
				</ul>
			</>
		),
	},
	{
		id: 'no-medical-advice',
		number: 4,
		title: 'No Medical Advice',
		body: (
			<p>
				Nothing on this site constitutes medical advice and nothing here is a
				substitute for professional medical advice, diagnosis, or treatment.
				Always consult a licensed physician or qualified health provider
				regarding any medical condition.
			</p>
		),
	},
	{
		id: 'research-information',
		number: 5,
		title: 'Research Information',
		body: (
			<p>
				Any research summaries, scientific data, or study references on this
				site are provided for educational purposes only and do not constitute
				endorsement of any particular use of our products. Researchers are
				responsible for verifying all information and conducting their own due
				diligence.
			</p>
		),
	},
	{
		id: 'buyer-responsibility',
		number: 6,
		title: 'Buyer Responsibility',
		body: (
			<p>
				By purchasing from Nuda Compounds, you represent and warrant that you
				are at least 21 years of age; that you are purchasing for legitimate
				research purposes only; that you will comply with all applicable laws
				and regulations; that you will not use any product inconsistent with
				its intended research use; and that you accept full responsibility for
				proper handling, storage, and use.
			</p>
		),
	},
	{
		id: 'product-quality',
		number: 7,
		title: 'Product Quality',
		body: (
			<p>
				We work to provide high-purity, third-party-verified research
				compounds. Results may vary based on research conditions, storage,
				handling, and other factors beyond our control. COAs reflect quality at
				the time of testing and do not guarantee outcomes in any specific
				application.
			</p>
		),
	},
	{
		id: 'limitation-of-liability',
		number: 8,
		title: 'Limitation of Liability & Indemnification',
		body: (
			<>
				<p>
					You agree to indemnify, defend, and hold harmless Nuda Compounds,
					its owners, officers, directors, employees, agents, and affiliates
					from any and all claims, damages, losses, liabilities, and expenses
					(including reasonable attorneys&apos; fees) arising from:
				</p>
				<ul className='list-disc space-y-2 pl-5 marker:text-amber'>
					<li>
						(a) your use, misuse, handling, storage, or disposal of our
						products, including any injury, illness, or damage resulting from
						administration to any human or animal;
					</li>
					<li>
						(b) any statements, health claims, dosing or protocol
						recommendations, or representations you make to third parties
						regarding our products;
					</li>
					<li>
						(c) any advertising, marketing, affiliate, or promotional content
						you create or distribute referencing Nuda Compounds or its
						products;
					</li>
					<li>
						(d) your violation of this Disclaimer or our{' '}
						<Link
							href='/terms-of-service'
							className='font-semibold text-amber hover:text-amber-dark transition-colors'
						>
							Terms of Service
						</Link>
						; or
					</li>
					<li>
						(e) any regulatory action or investigation brought against Nuda
						Compounds as a result of your actions, statements, or content.
					</li>
				</ul>
				<p>
					This indemnification survives termination of your account and is in
					addition to the Limitation of Liability and Indemnification
					provisions in our{' '}
					<Link
						href='/terms-of-service'
						className='font-semibold text-amber hover:text-amber-dark transition-colors'
					>
						Terms of Service
					</Link>
					.
				</p>
			</>
		),
	},
	{
		id: 'external-links',
		number: 9,
		title: 'External Links',
		body: (
			<p>
				This site may link to external websites. We have no control over their
				content or practices and are not responsible for them. Inclusion of a
				link does not imply endorsement.
			</p>
		),
	},
	{
		id: 'changes',
		number: 10,
		title: 'Changes',
		body: (
			<p>
				We may modify this disclaimer at any time without prior notice.
				Changes take effect upon posting, and continued use constitutes
				acceptance.
			</p>
		),
	},
	{
		id: 'contact',
		number: 11,
		title: 'Contact',
		body: (
			<a
				href='mailto:hello@nudacompounds.com'
				className='font-semibold text-amber hover:text-amber-dark transition-colors'
			>
				hello@nudacompounds.com
			</a>
		),
	},
];

export function DisclaimerContent() {
	return (
		<LegalDocument
			title='Disclaimer'
			lastUpdated='August 3, 2026'
			sections={SECTIONS}
		/>
	);
}
