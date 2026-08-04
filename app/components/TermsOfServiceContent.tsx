'use client';

import { LegalDocument, type LegalSection } from './LegalDocument';

const SUPPORT_EMAIL = 'hello@nudacompounds.com';

const SECTIONS: LegalSection[] = [
	{
		id: 'acceptance-of-terms',
		number: 1,
		title: 'Acceptance of Terms',
		body: (
			<p>
				By accessing or using the Nuda Compounds website (&quot;Site&quot;)
				and purchasing any products, you agree to be bound by these Terms of
				Service. If you do not agree to these terms, you must not use this
				Site or purchase any products. Nuda Compounds reserves the right to
				modify these terms at any time without prior notice. Continued use of
				the Site constitutes acceptance of any updated terms.
			</p>
		),
	},
	{
		id: 'research-use-only',
		number: 2,
		title: 'Research Use Only',
		body: (
			<p>
				All products sold by Nuda Compounds are intended exclusively for
				in-vitro laboratory and scientific research purposes. They are not
				intended for human or animal consumption, medical diagnosis,
				treatment, or prevention of any disease. By purchasing from Nuda
				Compounds, you represent and warrant that you are at least 21 years of
				age, that you possess the requisite knowledge and training to handle
				research compounds safely, and that all products will be used solely
				for lawful research purposes in compliance with all applicable local,
				state, and federal regulations.
			</p>
		),
	},
	{
		id: 'product-information',
		number: 3,
		title: 'Product Information & Accuracy',
		body: (
			<p>
				Nuda Compounds strives to provide accurate product descriptions,
				specifications, and analytical data. However, all information on this
				Site is provided for reference purposes only and does not constitute a
				guarantee or warranty of fitness for any particular application.
				Certificates of Analysis (COAs) are provided with every compound and
				reflect third-party verified testing results at the time of analysis.
				Nuda Compounds reserves the right to update product specifications,
				pricing, and availability without prior notice.
			</p>
		),
	},
	{
		id: 'intellectual-property',
		number: 4,
		title: 'Intellectual Property',
		body: (
			<p>
				All content on this Site — including but not limited to text,
				graphics, logos, trademarks, images, data compilations, and software —
				is the exclusive property of Nuda Compounds or its licensors and is
				protected by applicable intellectual property laws. You may not
				reproduce, distribute, modify, create derivative works from, publicly
				display, or exploit any content from this Site without express
				written permission from Nuda Compounds.
			</p>
		),
	},
	{
		id: 'prohibited-uses',
		number: 5,
		title: 'Prohibited Uses',
		body: (
			<>
				<p>You agree not to:</p>
				<ul className='list-disc space-y-2 pl-5 marker:text-amber'>
					<li>Use any Nuda Compounds product for human or animal consumption</li>
					<li>Resell or redistribute products without authorization</li>
					<li>Misrepresent the intended use of any product</li>
					<li>Use the Site to transmit harmful, fraudulent, or unlawful content</li>
					<li>
						Attempt to gain unauthorized access to any portion of the Site or
						its systems
					</li>
					<li>Use automated tools to scrape or extract data from the Site</li>
				</ul>
			</>
		),
	},
	{
		id: 'limitation-of-liability',
		number: 6,
		title: 'Limitation of Liability',
		body: (
			<p>
				To the maximum extent permitted by law, Nuda Compounds and its
				officers, directors, employees, and affiliates shall not be liable for
				any indirect, incidental, special, consequential, or punitive damages
				arising out of or related to your use of the Site or any products
				purchased. Nuda Compounds&apos; total liability for any claim shall
				not exceed the amount paid by you for the specific product giving rise
				to the claim. Nuda Compounds does not warrant uninterrupted or
				error-free access to the Site.
			</p>
		),
	},
	{
		id: 'indemnification',
		number: 7,
		title: 'Indemnification',
		body: (
			<p>
				You agree to indemnify, defend, and hold harmless Nuda Compounds and
				its affiliates from any claims, damages, losses, liabilities, and
				expenses (including reasonable legal fees) arising from your use of
				the Site, your violation of these Terms, or your misuse of any product
				purchased from Nuda Compounds.
			</p>
		),
	},
	{
		id: 'governing-law',
		number: 8,
		title: 'Governing Law',
		body: (
			<p>
				These Terms of Service shall be governed by and construed in
				accordance with the laws of the United States. Any disputes arising
				under these terms shall be resolved exclusively in the appropriate
				courts of the applicable jurisdiction. If any provision of these Terms
				is found to be unenforceable, the remaining provisions shall continue
				in full force and effect.
			</p>
		),
	},
	{
		id: 'delivery-guarantee',
		number: 9,
		title: 'Delivery Guarantee & Force Majeure',
		body: (
			<p>
				Nuda Compounds&apos; 5-business-day delivery guarantee (&quot;Nuda
				Promise&quot;) applies from the time tracking confirms the package has
				been accepted by the carrier, not from the time the order is placed.
				The replacement guarantee covers delivery delays caused by Nuda
				Compounds&apos; fulfillment process and applies only to standard
				shipments within the contiguous United States. The guarantee does not
				apply to delays caused by circumstances outside of Nuda Compounds&apos;
				reasonable control, including but not limited to: carrier delays, lost
				or misrouted packages, incorrect or incomplete shipping addresses
				provided by the customer, failed delivery attempts, package theft
				after delivery, customs or regulatory holds, weather events, natural
				disasters, holidays (including federal, state, religious, or
				carrier-observed holidays), fires, floods, earthquakes, pandemics,
				public health emergencies, acts of God, war, civil unrest, riots,
				strikes, labor disputes, transportation network disruptions, fuel
				shortages, government actions or restrictions, power or internet
				outages, or any other event or condition beyond Nuda Compounds&apos;
				reasonable control (collectively, &quot;Force Majeure Events&quot;).
				Nuda Compounds reserves the right to determine, in its sole
				discretion, whether a delay falls within the scope of this guarantee
				or is the result of a Force Majeure Event. Shipments to PO Boxes,
				APO/FPO addresses, Alaska, Hawaii, U.S. territories, or any address
				requiring additional handling, signature, customs clearance, or
				special routing are excluded from the 5-day guarantee. Nuda Compounds
				further reserves the right to modify, suspend, or discontinue the
				delivery guarantee at any time without prior notice. Replacement
				orders issued under this guarantee are limited to one (1) per original
				order and are shipped via standard service at Nuda Compounds&apos;
				discretion.
			</p>
		),
	},
	{
		id: 'contact',
		number: 10,
		title: 'Contact',
		body: (
			<p>
				For questions regarding these Terms of Service, please email us at{' '}
				<a
					href={`mailto:${SUPPORT_EMAIL}`}
					className='font-semibold text-amber hover:text-amber-dark transition-colors'
				>
					{SUPPORT_EMAIL}
				</a>
				.
			</p>
		),
	},
];

export function TermsOfServiceContent() {
	return (
		<LegalDocument
			title='Terms of Service'
			lastUpdated='August 4, 2026'
			sections={SECTIONS}
		/>
	);
}
