'use client';

import { useState } from 'react';
import { ChevronDownIcon } from './icons';
import { FAQ_ITEMS } from '../data/faq';

export function FAQ() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	return (
		<section id='faq' className='bg-offwhite py-16'>
			<div className='mx-auto max-w-4xl px-6'>
				<div className='space-y-3'>
					{FAQ_ITEMS.map((item, index) => {
						const isOpen = openIndex === index;
						return (
							<div
								key={item.question}
								className='overflow-hidden rounded-2xl border border-black/5 bg-white transition-colors hover:border-amber/40'
							>
								<button
									type='button'
									onClick={() => setOpenIndex(isOpen ? null : index)}
									aria-expanded={isOpen}
									className='flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-inset'
								>
									<span className='font-semibold text-navy tracking-wide'>
										{item.question}
									</span>
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
										<p className='px-6 pb-5 text-sm leading-relaxed text-charcoal tracking-wide'>
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
