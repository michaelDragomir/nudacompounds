import Image from 'next/image';
import { CheckBadgeIcon, ShieldIcon, DocumentIcon, TruckIcon } from './icons';

const stats = [
	{ icon: CheckBadgeIcon, stat: '3rd-Party', label: 'Lab Verified' },
	{ icon: ShieldIcon, stat: '100%', label: 'USA-Sourced Materials' },
	{ icon: DocumentIcon, stat: 'COA', label: 'Published for Every Batch' },
	{ icon: TruckIcon, stat: '24hr', label: 'Same-Day Dispatch' },
];

export function Hero() {
	return (
		<section
			id='top'
			className='relative min-h-[92vh] flex items-center overflow-hidden bg-navy-dark'
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
						<div className='animate-fade-up mb-7 inline-flex items-center gap-2 rounded-full border border-offwhite/30 bg-white/5 px-4 py-1.5 backdrop-blur-md'>
							<span className='text-xs font-bold uppercase tracking-[0.2em] text-offwhite'>
								USA Verified Research Supply
							</span>
						</div>

						<h1 className='animate-fade-up [animation-delay:90ms] font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl'>
							The <span className='text-amber'>Trusted Standard</span> in
							Peptide Research
						</h1>

						<p className='animate-fade-up [animation-delay:180ms] mx-auto mt-6 max-w-lg text-base leading-relaxed text-white sm:text-lg lg:mx-0'>
							Where purity meets performance. 99%+ purity guaranteed.
							Certificates of analysis in every order.
						</p>

						<div className='animate-fade-up [animation-delay:270ms] mt-10 flex flex-nowrap items-center justify-center gap-3 lg:justify-start'>
							<a
								href='#standards'
								className='whitespace-nowrap rounded-2xl border border-white/25 bg-navy-dark/60 px-4 py-3 text-[11px] font-bold uppercase tracking-wide text-white backdrop-blur-md transition-colors hover:border-white/50 hover:bg-navy-dark/40 sm:px-6 sm:text-sm'
							>
								View Our Testing Standards
							</a>
							<a
								href='#catalog'
								className='whitespace-nowrap rounded-2xl bg-amber px-4 py-3 text-xs font-bold uppercase tracking-widest text-navy-dark transition-colors hover:bg-amber-dark sm:px-6 sm:text-sm'
							>
								Shop our catalog
							</a>
						</div>
					</div>

					<div className='animate-fade-up [animation-delay:200ms] relative'>
						<div
							className='absolute -inset-6 rounded-4xl bg-amber/10 blur-3xl'
							aria-hidden='true'
						/>
						<div className='relative aspect-4/5 overflow-hidden rounded-3xl border border-offwhite/10 shadow-2xl'>
							<Image
								src='/peptide-hero-bg.jpeg'
								alt='Molecular render representing peptide research'
								fill
								priority
								sizes='(min-width: 1024px) 40vw, 90vw'
								className='object-cover'
							/>
							<div
								className='absolute inset-0 bg-linear-to-t from-navy-dark/40 via-transparent to-transparent'
								aria-hidden='true'
							/>
						</div>
					</div>
				</div>

				<div className='mt-20 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8'>
					{stats.map((item, index) => (
						<div
							key={item.label}
							style={{ animationDelay: `${450 + index * 80}ms` }}
							className='animate-fade-up border border-offwhite/30 rounded-2xl p-4 bg-navy-dark/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md text-center'
						>
							<div className='mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-2xl border border-amber/30 bg-amber/15'>
								<item.icon className='h-5 w-5 text-amber' />
							</div>
							<div className='font-mono text-2xl font-bold text-amber'>
								{item.stat}
							</div>
							<div className='mt-1 text-sm text-white tracking-widest'>
								{item.label}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
