'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDownIcon } from './icons';
import { SectionLink } from './SectionLink';

const NAVIGATE_LINKS = [
	{ href: '/', label: 'Home' },
	{ href: '/catalog', label: 'Catalog' },
	{ href: '/#standards', label: 'COAs' },
	{ href: '/faq', label: 'FAQs' },
	{ href: '/contact', label: 'Contact' },
];

const LEGAL_LINKS = [
	{ href: '/terms-of-service', label: 'Terms of Service' },
	{ href: '/privacy-policy', label: 'Privacy Policy' },
	{ href: '/refund-policy', label: 'Refund Policy' },
	{ href: '/accessibility', label: 'Accessibility' },
];

const CONTACT_EMAIL = 'hello@nudacompounds.com';
const CONTACT_PHONE = '(555) 123-4567';

const FDA_NOTICE_PARAGRAPHS = [
	'The statements on this website have not been evaluated by the U.S. Food and Drug Administration.',
	'All products sold by Nuda Compounds are intended for laboratory research and identification purposes only. They are not intended for human or animal consumption, dosing, injection, or ingestion.',
	'These products are not intended to diagnose, treat, cure, or prevent any disease and are not approved for clinical or therapeutic applications.',
	'Nuda Compounds operates as a chemical supplier and is not a compounding pharmacy or outsourcing facility as defined under Sections 503A or 503B of the Federal Food, Drug, and Cosmetic Act.',
	'By purchasing from Nuda Compounds, the buyer agrees that these products will be used exclusively for in-vitro research and will not be used for any other purpose, including but not limited to food, drug, cosmetic, or medical device use. Purchasers are responsible for ensuring compliance with all applicable laws and regulations governing research materials.',
	'By accessing this website and placing an order, you confirm that you are at least 21 years of age and legally permitted to purchase research chemicals in your jurisdiction.',
	'Products may not be available in all regions. It is the sole responsibility of the purchaser to determine whether the acquisition, possession, and use of any product complies with the laws and regulations of their local, state, or national jurisdiction. Nuda Compounds assumes no liability for purchases made in jurisdictions where such products are restricted or prohibited.',
];

const NUDA_DISCLAIMER = [
	<>
		The 5-business-day delivery guarantee applies from the time tracking
		confirms the package has been accepted by the carrier. The replacement
		guarantee does not apply to delays caused by circumstances outside of Nuda
		Compounds&apos; reasonable control, including but not limited to: carrier
		delays, lost or misrouted packages, incorrect or incomplete shipping
		addresses, failed delivery attempts, package theft after delivery, weather
		events, natural disasters, holidays, acts of God, strikes, labor disputes,
		government actions, or any other event beyond Nuda Compounds&apos;
		reasonable control. Shipments to PO Boxes, APO/FPO addresses, Alaska,
		Hawaii, and U.S. territories are excluded. Nuda Compounds reserves the right
		to determine, in its sole discretion, whether a delay falls within the scope
		of this guarantee. See{' '}
		<Link
			href='/terms-of-service'
			className='transition-colors text-amber hover:text-amber-dark'
		>
			Terms of Service
		</Link>{' '}
		for full details.
	</>,
	'*Business days are Monday through Friday and exclude weekends and federal holidays. The 5-business-day delivery guarantee begins once tracking confirms the package has been accepted by the carrier, not when the order is placed. If a package is accepted by the carrier on a weekend, holiday, or after normal carrier processing hours, the business-day count may begin on the next business day.',
];

export function Footer() {
	const [disclaimerOpen, setDisclaimerOpen] = useState(false);

	return (
		<footer className='mt-auto bg-offwhite border-t border-navy'>
			<div className='mx-auto max-w-6xl px-6 py-16'>
				<div className='grid grid-cols-2 gap-10 sm:grid-cols-4'>
					<div className='col-span-2 sm:col-span-1'>
						<Image
							src='/images/nudaLogo.png'
							alt='Nuda Compounds'
							width={423}
							height={144}
							className='h-9 w-auto'
						/>
						<p className='mt-4 text-sm leading-relaxed text-navy-dark/60'>
							Research peptides for laboratory use only. Third-party tested.
							Certificate of analysis included with every compound.
						</p>
					</div>

					<div>
						<h3 className='text-xs font-bold uppercase tracking-[0.2em] text-navy-dark'>
							Navigate
						</h3>
						<ul className='mt-4 space-y-3'>
							{NAVIGATE_LINKS.map((link) => (
								<li key={link.href}>
									<SectionLink
										href={link.href}
										className='text-sm text-navy-dark/60 transition-colors hover:text-amber'
									>
										{link.label}
									</SectionLink>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h3 className='text-xs font-bold uppercase tracking-[0.2em] text-navy-dark'>
							Legal
						</h3>
						<ul className='mt-4 space-y-3'>
							{LEGAL_LINKS.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className='text-sm text-navy-dark/60 transition-colors hover:text-amber'
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h3 className='text-xs font-bold uppercase tracking-[0.2em] text-navy-dark'>
							Contact
						</h3>
						<ul className='mt-4 space-y-3 text-sm text-navy-dark/60'>
							<li>
								<a
									href={`mailto:${CONTACT_EMAIL}`}
									className='transition-colors hover:text-amber'
								>
									{CONTACT_EMAIL}
								</a>
							</li>
							<li>{CONTACT_PHONE}</li>
							<li>
								Mon–Sat 9:00 AM – 5:00 PM MST
								<br />
								Closed Sunday
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className='border-t border-navy-dark/60'>
				<div className='mx-auto max-w-6xl px-6 py-10'>
					<button
						type='button'
						onClick={() => setDisclaimerOpen((open) => !open)}
						aria-expanded={disclaimerOpen}
						className='flex w-full cursor-pointer items-center justify-between gap-4 text-left'
					>
						<h3 className='text-xs font-bold uppercase tracking-[0.2em] text-navy-dark'>
							Nuda Disclaimer
						</h3>
						<ChevronDownIcon
							className={`h-5 w-5 shrink-0 text-navy-dark transition-transform duration-300 ${
								disclaimerOpen ? 'rotate-180' : ''
							}`}
						/>
					</button>
					<div
						className={`grid transition-all duration-300 ease-out ${
							disclaimerOpen
								? 'grid-rows-[1fr] opacity-100'
								: 'grid-rows-[0fr] opacity-0'
						}`}
					>
						<div className='overflow-hidden'>
							<div className='mt-4 space-y-4 text-sm leading-relaxed text-navy-dark/60'>
								{NUDA_DISCLAIMER.map((paragraph, index) => (
									<p key={index}>{paragraph}</p>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='border-t border-navy-dark/60'>
				<div className='mx-auto max-w-6xl px-6 py-10'>
					<h3 className='text-xs font-bold uppercase tracking-[0.2em] text-navy-dark'>
						FDA &amp; Regulatory Notice
					</h3>
					<div className='mt-4 space-y-4 text-sm leading-relaxed text-navy-dark/60'>
						{FDA_NOTICE_PARAGRAPHS.map((paragraph) => (
							<p key={paragraph}>{paragraph}</p>
						))}
					</div>
					<p className='mt-8 text-xs text-navy-dark/40'>
						&copy; 2026 Nuda Compounds. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
