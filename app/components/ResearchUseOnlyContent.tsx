'use client';

import Link from 'next/link';
import { LegalDocument, type LegalSection } from './LegalDocument';

const STANDARD_TAGS = [
	'Not for Human Use',
	'Not for Veterinary Use',
	'Not for Consumption',
];

const COMPOUND_CONTEXTS = [
	{
		title: 'Analytical Reference & Standards',
		body: 'Use as characterized reference material for calibration, method development, and instrument validation.',
	},
	{
		title: 'Structure & Stability Research',
		body: 'Study peptide folding, degradation, and storage stability under controlled laboratory conditions.',
	},
	{
		title: 'In-Vitro Assay Development',
		body: 'Build and validate binding, activity, and screening assays in cell-free or cultured systems.',
	},
	{
		title: 'Educational & Method Training',
		body: 'Support teaching labs and protocol training where documented, traceable materials are required.',
	},
];

const PROOF_STATS = [
	{ stat: '99%+', label: 'Verified purity (HPLC)' },
	{ stat: '3rd-Party', label: 'Independent laboratory testing' },
	{ stat: 'COA', label: 'Certificate of Analysis with every batch' },
];

const HANDLING_ITEMS = [
	{
		title: 'Storage',
		body: 'Keep lyophilized material at -20°C for long-term stability, or 2–8°C for short-term use (up to ~4 weeks). Protect from light and moisture, minimize freeze-thaw cycles, and keep sealed until use.',
	},
	{
		title: 'Safe Handling',
		body: 'Wear appropriate PPE, work in a clean laboratory setting, follow standard lab safety practices, review any available Safety Data Sheets before handling, and avoid cross-contamination between compounds.',
	},
	{
		title: 'Verify Your Batch',
		body: 'Match the batch number on your vial to its Certificate of Analysis. Confirm identity and purity against the HPLC and mass-spec data provided, and contact us immediately if you observe any discrepancy.',
	},
];

const SECTIONS: LegalSection[] = [
	{
		id: 'our-standard',
		number: 1,
		title: 'Our Standard',
		body: (
			<>
				<p>
					Nuda Compounds supplies research peptides and related compounds
					strictly for in-vitro study, analytical work, and laboratory
					education. These materials are not drugs, supplements, cosmetics, or
					consumer products, and they are not intended to diagnose, treat,
					cure, or prevent any condition. This page explains how our products
					may be used, how to handle them, and what you agree to when you
					order.
				</p>
				<div className='flex flex-wrap gap-2'>
					{STANDARD_TAGS.map((tag) => (
						<span
							key={tag}
							className='rounded-full border border-amber/40 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-amber'
						>
							{tag}
						</span>
					))}
				</div>
			</>
		),
	},
	{
		id: 'where-compounds-fit',
		number: 2,
		title: 'Where Nuda Compounds Fit',
		body: (
			<>
				<p>
					Every Nuda compound is characterized and released with in-vitro
					research in mind. The four contexts below reflect the primary
					settings in which our materials are used by qualified researchers.
				</p>
				<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
					{COMPOUND_CONTEXTS.map((context) => (
						<div
							key={context.title}
							className='rounded-xl border border-white/10 bg-white/5 p-4'
						>
							<p className='text-sm font-bold text-white'>{context.title}</p>
							<p className='mt-1.5 text-sm leading-relaxed text-white/60'>
								{context.body}
							</p>
						</div>
					))}
				</div>
			</>
		),
	},
	{
		id: 'proof-standard',
		number: 3,
		title: 'The Nuda Proof Standard',
		body: (
			<>
				<div className='grid grid-cols-1 gap-6 sm:grid-cols-3'>
					{PROOF_STATS.map(({ stat, label }) => (
						<div key={label} className='text-center sm:text-left'>
							<p className='font-sora text-3xl font-extrabold text-amber'>
								{stat}
							</p>
							<p className='mt-1 text-sm text-white/60'>{label}</p>
						</div>
					))}
				</div>
				<p>
					We publish analytical data because verifiable materials are the
					foundation of reproducible research.
				</p>
			</>
		),
	},
	{
		id: 'handling-stewardship',
		number: 4,
		title: 'Handling & Stewardship',
		body: (
			<div className='space-y-5'>
				{HANDLING_ITEMS.map((item) => (
					<div key={item.title}>
						<p className='text-sm font-bold text-white'>{item.title}</p>
						<p className='mt-1 leading-relaxed'>{item.body}</p>
					</div>
				))}
			</div>
		),
	},
	{
		id: 'what-you-agree-to',
		number: 5,
		title: 'What You Agree To',
		body: (
			<>
				<p>
					By ordering from Nuda Compounds, you confirm that you are at least
					21 years old, that you are a qualified researcher or are purchasing
					for legitimate research purposes, and that you will use every
					product solely for lawful in-vitro research. You accept full
					responsibility for proper use, handling, and disposal, and you agree
					to indemnify and hold harmless Nuda Compounds against any claim
					arising from misuse. You are responsible for ensuring that
					possession and use of these materials comply with the laws of your
					jurisdiction.
				</p>
				<p>
					This acknowledgement is in addition to — and reinforced by — our{' '}
					<Link
						href='/terms-of-service'
						className='font-semibold text-amber hover:text-amber-dark transition-colors'
					>
						Terms of Service
					</Link>{' '}
					and{' '}
					<Link
						href='/disclaimer'
						className='font-semibold text-amber hover:text-amber-dark transition-colors'
					>
						Disclaimer
					</Link>
					.
				</p>
			</>
		),
	},
	{
		id: 'documentation',
		number: 6,
		title: 'Documentation We Provide',
		body: (
			<ul className='list-disc space-y-2 pl-5 marker:text-amber'>
				<li>
					Certificate of Analysis (COA) for every released batch, including
					HPLC purity and mass-spec identity data.
				</li>
				<li>
					Batch and lot numbers printed on the vial label and cross-referenced
					in our public COA library.
				</li>
				<li>
					Storage and reconstitution guidance available on each product page
					for in-vitro handling reference.
				</li>
			</ul>
		),
	},
	{
		id: 'intellectual-property',
		number: 7,
		title: 'Intellectual Property',
		body: (
			<p>
				Purchase of a Nuda compound grants no license, express or implied, to
				any third-party patent, trademark, or trade secret. Certain compounds
				may be the subject of patents held by other parties; purchasers are
				responsible for determining whether their intended research use
				requires additional licensing in their jurisdiction.
			</p>
		),
	},
	{
		id: 'changes',
		number: 8,
		title: 'Changes',
		body: (
			<p>
				We may update this page from time to time as our catalog, testing
				methods, or documentation evolve. The version posted on this page
				always governs.
			</p>
		),
	},
	{
		id: 'contact',
		number: 9,
		title: 'Contact',
		body: (
			<p>
				Questions about research use, documentation, or handling:{' '}
				<a
					href='mailto:hello@nudacompounds.com'
					className='font-semibold text-amber hover:text-amber-dark transition-colors'
				>
					hello@nudacompounds.com
				</a>
			</p>
		),
	},
];

export function ResearchUseOnlyContent() {
	return (
		<LegalDocument
			title='Research Use Only'
			lastUpdated='August 3, 2026'
			description='Every Nuda compound is supplied for controlled, in-vitro laboratory research. Nothing we sell is intended for human or animal use. This page describes the research contexts our materials support, how to handle them responsibly, and the terms you accept when you place an order.'
			sections={SECTIONS}
		/>
	);
}
