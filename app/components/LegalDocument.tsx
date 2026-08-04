'use client';

import { useEffect, useRef, useState } from 'react';

export type LegalSection = {
	id: string;
	number: number;
	title: string;
	body: React.ReactNode;
};

export function LegalDocument({
	title,
	lastUpdated,
	description,
	sections,
}: {
	title: string;
	lastUpdated: string;
	description?: React.ReactNode;
	sections: LegalSection[];
}) {
	const [activeId, setActiveId] = useState(sections[0]?.id);
	const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
				if (visible[0]) {
					setActiveId(visible[0].target.id);
				}
			},
			{ rootMargin: '-15% 0px -70% 0px', threshold: 0 },
		);

		sections.forEach((section) => {
			const el = sectionRefs.current[section.id];
			if (el) observer.observe(el);
		});

		return () => observer.disconnect();
	}, [sections]);

	return (
		<div className='bg-navy-dark'>
			<div className='relative overflow-hidden border-b border-white/5 pb-14 pt-28'>
				<div
					className='pointer-events-none absolute -top-24 left-0 h-72 w-72 rounded-full bg-amber/20 blur-3xl'
					aria-hidden='true'
				/>
				<div className='relative mx-auto max-w-6xl px-6'>
					<h1 className='font-sora text-4xl font-extrabold leading-tight text-offwhite sm:text-5xl'>
						{title}
					</h1>
					<p className='mt-3 text-xs font-bold uppercase tracking-wide text-amber'>
						Last updated: {lastUpdated}
					</p>
					{description && (
						<p className='mt-6 max-w-2xl text-base leading-relaxed text-white/70'>
							{description}
						</p>
					)}
				</div>
			</div>

			<div className='mx-auto max-w-6xl px-6 py-16'>
				<div className='grid grid-cols-1 gap-12 lg:grid-cols-[260px_1fr]'>
					<nav className='lg:sticky lg:top-24 lg:self-start'>
						<p className='text-xs font-bold uppercase tracking-wide text-white/40'>
							On this page
						</p>
						<ul className='mt-4 space-y-1 border-l border-white/10'>
							{sections.map((section) => {
								const isActive = section.id === activeId;
								return (
									<li key={section.id}>
										<a
											href={`#${section.id}`}
											className={`-ml-px block border-l-2 py-1.5 pl-4 text-sm transition-colors ${
												isActive
													? 'border-amber font-semibold text-amber'
													: 'border-transparent text-white/50 hover:text-white/80'
											}`}
										>
											{section.number}. {section.title}
										</a>
									</li>
								);
							})}
						</ul>
					</nav>

					<div className='min-w-0 space-y-12'>
						{sections.map((section) => (
							<section
								key={section.id}
								id={section.id}
								ref={(el) => {
									sectionRefs.current[section.id] = el;
								}}
								className='scroll-mt-24'
							>
								<h2 className='text-xl font-bold tracking-wide text-amber sm:text-2xl'>
									{section.number}. {section.title}
								</h2>
								<div className='mt-4 space-y-4 text-sm leading-relaxed text-white/70 sm:text-[15px]'>
									{section.body}
								</div>
							</section>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
