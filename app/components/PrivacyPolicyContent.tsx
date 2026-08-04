'use client';

import { LegalDocument, type LegalSection } from './LegalDocument';

const SUPPORT_EMAIL = 'hello@nudacompounds.com';

const SECTIONS: LegalSection[] = [
	{
		id: 'information-we-collect',
		number: 1,
		title: 'Information We Collect',
		body: (
			<p>
				Nuda Compounds collects information that you voluntarily provide when
				placing an order, creating an account, or contacting support. This
				includes your name, email address, shipping address, billing
				information, and any correspondence you send us. We do not collect
				sensitive personal data beyond what is necessary to fulfill your order
				and provide customer support.
			</p>
		),
	},
	{
		id: 'automatic-data-collection',
		number: 2,
		title: 'Automatic Data Collection',
		body: (
			<p>
				When you visit our Site, we automatically collect certain technical
				information including your IP address, browser type and version,
				operating system, referring URL, pages viewed, time spent on each
				page, and the date and time of your visit. This data is collected
				through server logs and analytics tools to improve Site performance
				and user experience.
			</p>
		),
	},
	{
		id: 'cookies-tracking',
		number: 3,
		title: 'Cookies & Tracking Technologies',
		body: (
			<p>
				Nuda Compounds uses essential cookies to enable core Site
				functionality such as session management and shopping cart
				persistence. We may also use analytical cookies (e.g., Google
				Analytics) to understand aggregate usage patterns. You may disable
				cookies through your browser settings; however, this may limit certain
				Site features. We do not use cookies for targeted advertising. No
				personal data is sold to third-party advertisers.
			</p>
		),
	},
	{
		id: 'how-we-use-your-information',
		number: 4,
		title: 'How We Use Your Information',
		body: (
			<>
				<p>We use collected information to:</p>
				<ul className='list-disc space-y-2 pl-5 marker:text-amber'>
					<li>Process and fulfill your orders</li>
					<li>Communicate order status, shipping updates, and support responses</li>
					<li>Maintain and improve the Site</li>
					<li>Detect and prevent fraud or unauthorized activity</li>
					<li>Comply with legal obligations</li>
				</ul>
				<p>
					We will not use your information for unsolicited marketing without
					your explicit consent. Users can opt-out of marketing messages at
					any time by replying STOP or emailing{' '}
					<a
						href={`mailto:${SUPPORT_EMAIL}`}
						className='font-semibold text-amber hover:text-amber-dark transition-colors'
					>
						{SUPPORT_EMAIL}
					</a>
					.
				</p>
			</>
		),
	},
	{
		id: 'sms-notifications',
		number: 5,
		title: 'SMS Notifications',
		body: (
			<p>
				By providing your phone number during checkout or opting in on our
				website, you consent to receive SMS messages from Nuda Compounds
				regarding your order status, shipping updates, and promotional
				offers. Standard message and data rates may apply. Messages may be
				sent periodically based on your order and follow-up cycles. You may
				opt-out at any time by replying STOP to any message, or for help,
				reply HELP or contact support at{' '}
				<a
					href={`mailto:${SUPPORT_EMAIL}`}
					className='font-semibold text-amber hover:text-amber-dark transition-colors'
				>
					{SUPPORT_EMAIL}
				</a>
				. Your phone number will never be shared with third parties for their
				own marketing purposes.
			</p>
		),
	},
	{
		id: 'third-party-services',
		number: 6,
		title: 'Third-Party Services',
		body: (
			<p>
				Nuda Compounds may share limited information with trusted
				third-party service providers who assist in operating our business —
				including payment processors, shipping carriers, and analytics
				providers. These parties are contractually obligated to protect your
				data and may only use it for the specific services they provide to
				Nuda Compounds. We do not sell, rent, or trade your personal
				information to any third party.
			</p>
		),
	},
	{
		id: 'data-security',
		number: 7,
		title: 'Data Security',
		body: (
			<p>
				We implement industry-standard security measures including SSL/TLS
				encryption for all data transmission, secure payment processing
				through PCI-DSS compliant providers, and restricted access to personal
				information within our organization. While we take every reasonable
				precaution, no method of electronic storage or transmission is 100%
				secure, and we cannot guarantee absolute data security.
			</p>
		),
	},
	{
		id: 'data-retention',
		number: 8,
		title: 'Data Retention',
		body: (
			<p>
				We retain your personal information only as long as necessary to
				fulfill the purposes for which it was collected, including order
				fulfillment, legal compliance, dispute resolution, and enforcement of
				our agreements. Order records are maintained for a minimum period as
				required by applicable tax and commerce regulations.
			</p>
		),
	},
	{
		id: 'your-rights',
		number: 9,
		title: 'Your Rights',
		body: (
			<>
				<p>Depending on your jurisdiction, you may have the right to:</p>
				<ul className='list-disc space-y-2 pl-5 marker:text-amber'>
					<li>Access the personal data we hold about you</li>
					<li>Request correction of inaccurate data</li>
					<li>Request deletion of your data, subject to legal retention requirements</li>
					<li>Opt out of non-essential data processing</li>
					<li>Request a portable copy of your data</li>
				</ul>
				<p>
					To exercise any of these rights, please email us at{' '}
					<a
						href={`mailto:${SUPPORT_EMAIL}`}
						className='font-semibold text-amber hover:text-amber-dark transition-colors'
					>
						{SUPPORT_EMAIL}
					</a>
					.
				</p>
			</>
		),
	},
	{
		id: 'childrens-privacy',
		number: 10,
		title: "Children's Privacy",
		body: (
			<p>
				Nuda Compounds does not knowingly collect personal information from
				individuals under the age of 21. Our products are intended for
				qualified researchers and laboratory professionals. If we become aware
				that we have inadvertently collected data from a minor, we will
				promptly delete such information.
			</p>
		),
	},
	{
		id: 'changes-to-policy',
		number: 11,
		title: 'Changes to This Policy',
		body: (
			<p>
				Nuda Compounds reserves the right to update this Privacy Policy at any
				time. Changes will be posted on this page with an updated revision
				date. We encourage you to review this policy periodically. Continued
				use of the Site after any modifications constitutes acceptance of the
				updated policy.
			</p>
		),
	},
	{
		id: 'contact',
		number: 12,
		title: 'Contact',
		body: (
			<p>
				For questions or concerns regarding this Privacy Policy or your
				personal data, please email us at{' '}
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

export function PrivacyPolicyContent() {
	return (
		<LegalDocument
			title='Privacy Policy'
			lastUpdated='August 4, 2026'
			sections={SECTIONS}
		/>
	);
}
