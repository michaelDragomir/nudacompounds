'use client';

import { useState } from 'react';
import { ChevronDownIcon } from './icons';

const FAQ_ITEMS = [
	{
		question: 'What is a Certificate of Analysis (COA)?',
		answer:
			'A COA is an independent lab report confirming the identity, purity, and safety profile of a specific batch. We publish a COA for every product we distribute, including batch number and test date.',
	},
	{
		question: 'Are these compounds intended for human use?',
		answer:
			'No. Every product on this site is sold strictly for in-vitro laboratory research and is not intended for human or veterinary use, consumption, or therapeutic application.',
	},
	{
		question: 'How fast do orders ship once checkout is live?',
		answer:
			'Orders placed before our daily cutoff are dispatched the same day from our U.S. facility, with tracking provided on every shipment.',
	},
	{
		question: 'Do you ship internationally?',
		answer:
			'At launch we will be shipping within the United States only. International shipping is on our roadmap — join our contact list to be notified when it opens.',
	},
	{
		question: 'Can I request the COA for a specific batch or lot number?',
		answer:
			'Yes. Every COA is tied to a batch number listed on the vial label. Reach out with your batch number and we will send the matching documentation directly.',
	},
	{
		question: 'What payment methods will you accept?',
		answer:
			'Checkout is still launching soon, so full payment details aren’t published yet. We will support standard card payment at launch — contact us if you have a specific method you need supported.',
	},
];

export function FAQ() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	return (
		<section id='faq' className='bg-offwhite py-18'>
			<div className='mx-auto max-w-3xl px-6'>
				<div className='mx-auto mb-14 max-w-2xl text-center'>
					<div className='mb-4 flex items-center justify-center gap-3'>
						<span className='h-px w-8 bg-amber' />
						<span className='text-sm font-bold uppercase tracking-[0.2em] text-navy'>
							FAQs
						</span>
					</div>
					<h2 className='text-3xl font-bold leading-tight text-navy tracking-wide'>
						Frequently Asked Questions
					</h2>
				</div>

				<div className='space-y-3'>
					{FAQ_ITEMS.map((item, index) => {
						const isOpen = openIndex === index;
						return (
							<div
								key={item.question}
								className='overflow-hidden rounded-2xl border border-black/5 bg-white'
							>
								<button
									type='button'
									onClick={() => setOpenIndex(isOpen ? null : index)}
									aria-expanded={isOpen}
									className='flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left'
								>
									<span className='font-bold text-navy'>{item.question}</span>
									<ChevronDownIcon
										className={`h-5 w-5 shrink-0 text-amber-dark transition-transform duration-300 ${
											isOpen ? 'rotate-180' : ''
										}`}
									/>
								</button>
								<div
									className={`grid transition-all duration-300 ease-out ${
										isOpen
											? 'grid-rows-[1fr] opacity-100'
											: 'grid-rows-[0fr] opacity-0'
									}`}
								>
									<div className='overflow-hidden'>
										<p className='px-6 pb-5 text-sm leading-relaxed text-charcoal'>
											{item.answer}
										</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
