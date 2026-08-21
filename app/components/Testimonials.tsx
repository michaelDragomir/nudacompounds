'use client';

import { useState } from 'react';

const TESTIMONIALS = [
	{
		name: 'Trevor B.',
		quote: "Every batch ships with a real COA. That's rare in this space.",
	},
	{
		name: 'Aaron P.',
		quote:
			'Ordered Friday, had it Monday morning. Packaging was discreet and the vial matched the batch number on the COA exactly.',
	},
	{
		name: 'Jenna T.',
		quote: 'Purity results were spot on. Will be reordering.',
	},
	{
		name: 'Derek K.',
		quote:
			'Fast shipping with everything included. Also really fast response time too.  Thank you!',
	},
	{
		name: 'Mitchell R.',
		quote: 'Support actually responded — same day, no bot.',
	},
	{
		name: 'Casey L.',
		quote:
			'Nuda has quality documentation.  It gave me the confidence to reorder without hesitation.',
	},
	{
		name: 'Priya N.',
		quote:
			'Clean packaging, accurate labeling, and the COA matched on the first try. No complaints.',
	},
	{
		name: 'Owen S.',
		quote: 'Fast shipping, honestly faster than advertised.',
	},
	{
		name: 'Rachel M.',
		quote:
			'The bulk order pricing made stocking up for the semester easy. Everything arrived intact and properly labeled. Would recommend to any lab on a budget.',
	},
	{
		name: 'Diego F.',
		quote:
			'Reached out with a batch question and got a real answer within the hour. Rare these days.',
	},
	{
		name: 'Hannah W.',
		quote: 'Exactly what the label said. No surprises. Price is right.',
	},
	{
		name: 'Marcus J.',
		quote:
			'I was skeptical about ordering research peptides online after getting low quality in the past.  But Nuda is different.  Great support as well',
	},
];

const TESTIMONIAL_TRACK = [...TESTIMONIALS, ...TESTIMONIALS];

const EDGE_MASK =
	'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)';

export function Testimonials() {
	const [paused, setPaused] = useState(false);

	return (
		<section className='overflow-hidden bg-linear-to-b from-navy to-navy-dark py-20'>
			<div className='mx-auto mb-12 max-w-2xl px-6 text-center'>
				<div className='mb-4 flex items-center justify-center gap-3'>
					<span className='h-px w-8 bg-amber' />
					<span className='text-xs font-bold uppercase tracking-[0.2em] text-amber'>
						Testimonials
					</span>
					<span className='h-px w-8 bg-amber' />
				</div>
				<h2 className='font-sora text-3xl font-extrabold leading-tight text-offwhite sm:text-4xl'>
					The Nuda Experience
				</h2>
				<p className='mt-2 text-offwhite/70 text-md tracking-wide'>
					What researchers say about ordering, shipping, and support
				</p>
			</div>

			<div
				className='relative'
				style={{ WebkitMaskImage: EDGE_MASK, maskImage: EDGE_MASK }}
			>
				<div
					className='flex w-max animate-marquee-rtl gap-6 px-6'
					style={{ animationPlayState: paused ? 'paused' : 'running' }}
					onMouseEnter={() => setPaused(true)}
					onMouseLeave={() => setPaused(false)}
				>
					{TESTIMONIAL_TRACK.map((testimonial, index) => (
						<div
							key={`${testimonial.name}-${index}`}
							className='w-72 shrink-0 cursor-default rounded-2xl border border-white/10 bg-white p-6 shadow-lg hover:border-amber'
						>
							<p className='text-sm leading-relaxed text-charcoal/80'>
								&ldquo;{testimonial.quote}&rdquo;
							</p>
							<div className='mt-4 flex items-center gap-3 border-t border-black/5 pt-4'>
								<div>
									<p className='text-sm font-bold text-navy'>
										{testimonial.name}
									</p>
									<p className='text-xs text-warmgray'>Verified Researcher</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
