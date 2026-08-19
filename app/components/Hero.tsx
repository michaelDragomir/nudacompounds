import { CheckIcon } from './icons';
import { SectionLink } from './SectionLink';
import { BottleCarousel } from './BottleCarousel';

const stats = [
	{ stat: 'Free Shipping', label: 'on orders over $200' },
	{ stat: '99%+', label: 'purity' },
	{ stat: 'COA', label: 'Published for Every Batch' },
	{ stat: '2-5 Day', label: 'Shipping' },
];

export function Hero() {
	return (
		<section
			id='top'
			className='relative min-h-[92vh] flex items-center overflow-hidden bg-linear-to-b from-navy to-navy-dark'
		>
			<div
				className='animate-glow-pulse absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(217,160,91,0.14),transparent_40%)]'
				aria-hidden='true'
			/>
			<div
				className='animate-glow-pulse [animation-delay:3.5s] absolute inset-0 bg-[radial-gradient(circle_at_50%_110%,rgba(217,160,91,0.14),transparent_35%)]'
				aria-hidden='true'
			/>
			<div
				className='absolute inset-0 bg-molecule-grid opacity-60'
				aria-hidden='true'
			/>

			<div className='relative mx-auto max-w-6xl px-6 py-24'>
				<div className='grid grid-cols-1 items-center gap-12 lg:grid-cols-2'>
					<div className='text-center lg:text-left'>
						<div className='animate-fade-up mb-7 inline-flex items-center gap-2 rounded-full border border-offwhite/30 bg-white px-4 py-1.5 backdrop-blur-md'>
							<span className='relative flex h-2 w-2 shrink-0'>
								<span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75' />
								<span className='relative inline-flex h-2 w-2 rounded-full bg-amber' />
							</span>
							<span className='text-xs font-bold uppercase tracking-[0.2em] text-navy-dark'>
								Lab Verified
								<span className='mx-2.5 inline-block h-1 w-1 rounded-full bg-navy-dark align-middle' />
								Research Grade Peptides
							</span>
						</div>

						<h1 className='animate-fade-up [animation-delay:90ms] font-sora text-5xl font-extrabold leading-tight text-white sm:text-6xl lg:text-7xl'>
							<span className='text-amber'>Premium</span> Research Peptides
						</h1>

						<ul className='animate-fade-up [animation-delay:180ms] mx-auto mt-6 flex max-w-lg flex-col items-center gap-2 lg:mx-0 lg:items-start'>
							{[
								'99%+ purity guaranteed',
								'Certificates of analysis with every order',
							].map((item) => (
								<li
									key={item}
									className='flex items-center gap-2 text-base leading-relaxed text-white sm:text-lg'
								>
									<CheckIcon className='h-5 w-5 shrink-0 text-amber' />
									{item}
								</li>
							))}
						</ul>

						<div className='animate-fade-up [animation-delay:270ms] mt-10 flex flex-nowrap items-center justify-center gap-3 lg:justify-start'>
							{/* <SectionLink
								href='/#standards'
								className='whitespace-nowrap rounded-2xl border border-white/25 bg-navy-dark/60 px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-white backdrop-blur-md transition-colors hover:border-white/50 hover:bg-navy-dark/40 sm:px-6 sm:text-sm'
							>
								View Our Testing Standards
							</SectionLink> */}
							<SectionLink
								href='/products'
								className='whitespace-nowrap rounded-2xl bg-amber px-10 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-amber-dark sm:px-14 sm:text-sm shadow-xl'
							>
								View research compounds
							</SectionLink>
						</div>
					</div>

					<div className='animate-fade-up [animation-delay:200ms] relative'>
						<div
							className='animate-glow-pulse absolute -inset-10 rounded-4xl bg-[radial-gradient(circle_at_50%_45%,rgba(217,160,91,0.35),transparent_65%)]'
							aria-hidden='true'
						/>
						<div
							className='absolute inset-0 bg-molecule-grid opacity-50'
							aria-hidden='true'
						/>
						<BottleCarousel />
					</div>
				</div>

				<div className='animate-fade-up [animation-delay:450ms] mt-8 border-t border-white/25 pt-8'>
					<div className='grid grid-cols-2 gap-y-6 sm:grid-cols-4 sm:gap-0 sm:divide-x sm:divide-white/25'>
						{stats.map((item) => (
							<div key={item.label} className='px-4 text-center'>
								<div className='font-mono text-2xl font-bold text-amber'>
									{item.stat}
								</div>
								<div className='mt-1 text-xs uppercase tracking-widest text-white/80'>
									{item.label}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
