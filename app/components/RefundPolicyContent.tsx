'use client';

import Link from 'next/link';
import { LegalDocument, type LegalSection } from './LegalDocument';

const SUPPORT_EMAIL = 'hello@nudacompounds.com';
const SUPPORT_PHONE = '(555) 123-4567';

const CLAIM_STEPS = [
	{
		number: '01',
		title: 'Record & Photograph',
		body: 'Capture a full unboxing video from the moment the package is first opened, and take clear photos of the outer packaging, the contents, and the packing slip.',
	},
	{
		number: '02',
		title: 'Email Us Within 3 Days',
		body: `Send all documentation to ${SUPPORT_EMAIL} with your order number within 3 calendar days of delivery.`,
	},
	{
		number: '03',
		title: 'Receive Your Resolution',
		body: "Once your claim is verified, we'll ship a replacement of the affected items promptly.",
	},
];

const SECTIONS: LegalSection[] = [
	{
		id: 'general-policy',
		number: 1,
		title: 'General Policy',
		body: (
			<>
				<p>
					Because our products are research-grade compounds with strict
					chain-of-custody and handling requirements, we are unable to accept
					returns, cancellations, or refunds once an order has been placed and
					shipped, regardless of delivery status. This protects the
					quality-assurance chain and ensures every compound that reaches you
					meets our identity and purity standards. The exceptions to this
					policy — verified shipping damage, fulfillment errors, and COA
					discrepancies — are covered in detail below.
				</p>
				<p>
					<span className='font-bold text-white'>Order cancellations:</span>{' '}
					orders may be cancelled for a full refund only within{' '}
					<span className='font-bold text-white'>one (1) hour</span> of the
					time the order is placed. After this one-hour window, the order is
					locked and cannot be cancelled. To request a cancellation, email{' '}
					<a
						href={`mailto:${SUPPORT_EMAIL}`}
						className='font-semibold text-amber hover:text-amber-dark transition-colors'
					>
						{SUPPORT_EMAIL}
					</a>{' '}
					immediately with your order number — cancellation requests received
					outside the one-hour window will be denied.
				</p>
			</>
		),
	},
	{
		id: 'delivered-packages',
		number: 2,
		title: 'Delivered Packages',
		body: (
			<>
				<p>
					Once a shipment is marked{' '}
					<span className='font-semibold text-white'>&quot;Delivered&quot;</span>{' '}
					by the carrier, responsibility for the package transfers to the
					customer.
				</p>
				<p>
					Nuda Compounds is not responsible for packages that are lost or
					stolen after a confirmed delivery scan, including theft from
					porches, mailrooms, front desks, lockers, or other delivery
					locations. Refunds, credits, or replacements are not issued for
					packages confirmed as delivered by the carrier.
				</p>
			</>
		),
	},
	{
		id: 'delivery-delays',
		number: 3,
		title: 'Delivery Delays & the Nuda Promise',
		body: (
			<>
				<p>
					Standard orders within the contiguous United States are backed by
					the Nuda Promise — our 5-business-day delivery guarantee, measured
					from the moment the carrier accepts the package (not from when the
					order is placed). If a qualifying order isn&apos;t delivered within
					that window due to our fulfillment process, you&apos;re eligible for
					one replacement shipment per original order.
				</p>
				<p>
					This guarantee carries conditions and exclusions — including carrier
					delays, weather, incorrect addresses, PO Boxes, APO/FPO, Alaska,
					Hawaii, U.S. territories, and other circumstances outside our
					reasonable control. The complete terms, including the full list of
					exclusions and Force Majeure conditions, are set out in{' '}
					<Link
						href='/terms-of-service'
						className='font-semibold text-amber hover:text-amber-dark transition-colors'
					>
						Section 9 of our Terms of Service
					</Link>
					.
				</p>
			</>
		),
	},
	{
		id: 'damaged-defective-incorrect',
		number: 4,
		title: 'Damaged, Defective, or Incorrect Items',
		body: (
			<>
				<p>
					In the event of a verified Nuda Compounds fulfillment or shipping
					error — incorrect items, missing items, or damage that occurred in
					transit prior to delivery — you must notify us within three (3)
					calendar days of the carrier&apos;s delivery date.
				</p>
				<p>
					This reporting window is firm. Requests submitted outside this
					timeframe may be denied. We keep the window this way to protect both
					sides against fraud and to keep resolutions fast for everyone.
				</p>
			</>
		),
	},
	{
		id: 'how-to-file-a-claim',
		number: 5,
		title: 'How to File a Claim',
		body: (
			<>
				<p>
					If your order arrives damaged, incomplete, or incorrect, here&apos;s
					exactly what to do:
				</p>
				<div className='space-y-4'>
					{CLAIM_STEPS.map((step) => (
						<div key={step.number} className='flex gap-4'>
							<span className='font-sora text-2xl font-extrabold text-amber/40'>
								{step.number}
							</span>
							<div>
								<p className='text-sm font-bold text-white'>{step.title}</p>
								<p className='mt-1 leading-relaxed'>{step.body}</p>
							</div>
						</div>
					))}
				</div>
			</>
		),
	},
	{
		id: 'required-documentation',
		number: 6,
		title: 'Required Documentation',
		body: (
			<>
				<p>
					To keep resolutions fair and fast, every damage/error claim must
					include complete, verifiable documentation:
				</p>
				<ul className='list-disc space-y-2 pl-5 marker:text-amber'>
					<li>
						A full unboxing video, recorded from the moment the package is
						first opened
					</li>
					<li>Photos of the external packaging</li>
					<li>Photos of the package contents</li>
					<li>Photos of the packing slip enclosed with the order</li>
				</ul>
				<p>
					Claims submitted without all required documentation may not be
					eligible for resolution.
				</p>
			</>
		),
	},
	{
		id: 'resolution',
		number: 7,
		title: 'Resolution',
		body: (
			<>
				<p>
					Upon confirmation of an eligible shipping or fulfillment error
					caused by Nuda Compounds, we will issue a replacement of the
					affected items, or — at our discretion — store credit or a refund of
					the affected items including applicable shipping.
				</p>
				<p>
					Cash refunds, store credits, or alternative compensation are not
					guaranteed and are not provided for delivered, refused, or stolen
					packages (see Sections 2 and 9).
				</p>
			</>
		),
	},
	{
		id: 'purity-quality-disputes',
		number: 8,
		title: 'Purity & Quality Disputes',
		body: (
			<>
				<p>
					Every Nuda Compounds product ships with a Certificate of Analysis
					(COA) reflecting third-party verified purity testing via HPLC and
					LC-MS, and each batch can be verified on our COA batch-verification
					page.
				</p>
				<p>
					If you believe a product does not meet the specifications stated on
					its COA, you may submit a formal dispute by providing independent
					third-party analytical data conducted by an accredited laboratory.
					We will review the submitted data and respond within 10 business
					days. If a legitimate discrepancy is confirmed, we will issue a
					replacement or full credit at our discretion.
				</p>
			</>
		),
	},
	{
		id: 'non-refundable',
		number: 9,
		title: 'Non-Refundable Circumstances',
		body: (
			<>
				<p>Refunds and replacements will not be issued for:</p>
				<ul className='list-disc space-y-2 pl-5 marker:text-amber'>
					<li>Buyer&apos;s remorse or change of mind after purchase</li>
					<li>
						Products used, opened, or tampered with in a manner inconsistent
						with proper handling
					</li>
					<li>
						Orders shipped to an incorrect, incomplete, or outdated address
						provided by the customer at checkout
					</li>
					<li>Delays caused by shipping carriers beyond Nuda Compounds&apos; control</li>
					<li>
						Products seized by customs or regulatory authorities in
						jurisdictions where the buyer is responsible for compliance
					</li>
					<li>Packages confirmed as delivered but reported lost or stolen</li>
				</ul>
				<p>
					It is the customer&apos;s sole responsibility to provide a complete
					and accurate shipping address at checkout — including street
					number, unit or apartment, city, state, and ZIP. Orders are shipped
					exactly as entered. Nuda Compounds is not responsible for packages
					that are delayed, misdelivered, returned to sender, lost, or stolen
					as a result of an address error provided by the customer. If a
					package is returned to us by the carrier due to an address error,
					the customer is responsible for the cost of re-shipment. If you spot
					a mistake after ordering, email{' '}
					<a
						href={`mailto:${SUPPORT_EMAIL}`}
						className='font-semibold text-amber hover:text-amber-dark transition-colors'
					>
						{SUPPORT_EMAIL}
					</a>{' '}
					immediately — we can only correct addresses on orders that have not
					yet been handed to the carrier.
				</p>
			</>
		),
	},
	{
		id: 'crypto-overpayments',
		number: 10,
		title: 'Crypto & Overpayments',
		body: (
			<>
				<p>
					If you pay with cryptocurrency and send more than the required
					amount, the overpayment will be converted to store credit and
					applied to your account. Due to the irreversible nature of crypto
					transactions and exchange-rate volatility, we are unable to process
					crypto refunds to external wallets.
				</p>
				<p>Store credits from crypto overpayments:</p>
				<ul className='list-disc space-y-2 pl-5 marker:text-amber'>
					<li>
						Are calculated based on the USD value at the time of payment
						confirmation
					</li>
					<li>Never expire and can be used on any future purchase</li>
					<li>
						Are applied to your account within 24 hours of payment
						confirmation
					</li>
				</ul>
				<p>
					To avoid overpayment, please send the exact amount displayed on the
					payment screen. Questions about an overpayment? Email{' '}
					<a
						href={`mailto:${SUPPORT_EMAIL}`}
						className='font-semibold text-amber hover:text-amber-dark transition-colors'
					>
						{SUPPORT_EMAIL}
					</a>{' '}
					with your order number.
				</p>
			</>
		),
	},
	{
		id: 'store-credit',
		number: 11,
		title: 'Store Credit',
		body: (
			<p>
				Where a refund is not applicable but Nuda Compounds determines a
				resolution is warranted, we may issue store credit at our sole
				discretion. Store credits do not expire and may be applied to any
				future order. Store credits are non-transferable and hold no cash
				value.
			</p>
		),
	},
	{
		id: 'chargebacks',
		number: 12,
		title: 'Chargebacks',
		body: (
			<p>
				Chargebacks filed for delivered, refused, or stolen packages will be
				disputed using carrier confirmation, delivery records, and the
				customer&apos;s agreement to these terms. If you believe there&apos;s
				an issue with your order, please contact us first (email support or
				call/text {SUPPORT_PHONE}) — we resolve verified problems quickly, and
				a direct claim is always faster than a chargeback.
			</p>
		),
	},
	{
		id: 'our-commitment',
		number: 13,
		title: 'Our Commitment',
		body: (
			<p>
				We&apos;re committed to accurate fulfillment and timely shipment of
				every order. The policies above exist to keep resolutions fair,
				prevent abuse, and protect every customer we serve. By placing an
				order with Nuda Compounds, you acknowledge and agree to these terms.
			</p>
		),
	},
	{
		id: 'changes-to-policy',
		number: 14,
		title: 'Changes to This Policy',
		body: (
			<p>
				We reserve the right to update or revise this Refund & Returns Policy
				at any time. Updates will be posted on this page with a revised
				&quot;Last updated&quot; date.
			</p>
		),
	},
	{
		id: 'contact',
		number: 15,
		title: 'Contact',
		body: (
			<p>
				For all refund inquiries, damaged-product claims, or order disputes,
				email{' '}
				<a
					href={`mailto:${SUPPORT_EMAIL}`}
					className='font-semibold text-amber hover:text-amber-dark transition-colors'
				>
					{SUPPORT_EMAIL}
				</a>
				. Include your order number, a description of the issue, and any
				supporting documentation (unboxing video, photos, third-party test
				results) to expedite review.
			</p>
		),
	},
];

export function RefundPolicyContent() {
	return (
		<LegalDocument
			title='Refund & Returns Policy'
			lastUpdated='July 1, 2026'
			description={
				<>
					We stand behind every order we ship. Due to the sensitive,
					research-grade nature of our products and the strict handling
					requirements needed to preserve compound integrity,{' '}
					<span className='font-bold text-white'>all sales are final</span> —
					but we know issues can occasionally arise in transit, and the
					policy below explains exactly how we handle them, quickly and
					fairly.
				</>
			}
			sections={SECTIONS}
		/>
	);
}
