'use client';

import { useState } from 'react';
import { ChevronDownIcon } from './icons';
import { FAQ_ITEMS } from '../data/faq';

export function FAQ() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	return (
		<section
			id='faq'
			className='relative overflow-hidden bg-navy pb-16 pt-28 bg-linear-to-b from-navy to-navy-dark'
		>
			<div
				className='pointer-events-none absolute inset-0 animate-glow-pulse bg-[radial-gradient(circle_at_87%_0%,rgba(217,160,91,0.25),transparent_35%)]'
				aria-hidden='true'
			/>
			<div className='mx-auto max-w-4xl px-6'>
				<div className='mx-auto mb-14 max-w-3xl text-center'>
					<div className='mb-4 flex items-center justify-center gap-3'>
						<span className='h-px w-8 bg-amber' />
						<span className='text-xs font-bold uppercase tracking-[0.3em] text-amber'>
							Support
						</span>
						<span className='h-px w-8 bg-amber' />
					</div>
					<h1 className='font-sora text-4xl font-extrabold leading-tight text-offwhite sm:text-5xl'>
						Frequently Asked Questions
					</h1>
				</div>

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
