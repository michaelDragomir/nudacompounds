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
			<Image
				src='/peptide-hero-bg.jpeg'
				alt=''
				fill
				priority
				aria-hidden='true'
				className='object-cover opacity-80'
			/>
			<div
				className='absolute inset-0 bg-gradient-to-b from-navy-dark/80 via-navy-dark/70 to-navy-dark'
				aria-hidden='true'
			/>
			<div
				className='absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(217,160,91,0.16),transparent_60%)]'
				aria-hidden='true'
			/>
			<div
				className='absolute inset-0 bg-molecule-grid opacity-20'
				aria-hidden='true'
			/>

			<div className='relative mx-auto max-w-4xl px-6 py-24 text-center'>
				<div className='mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-offwhite/30 bg-white/5 px-4 py-1.5 backdrop-blur-md'>
					{/* <span className='h-1.5 w-1.5 rounded-full bg-amber shadow-[0_0_8px_2px_rgba(217,160,91,0.7)]' /> */}
					<span className='text-xs font-bold uppercase tracking-[0.2em] text-offwhite'>
						USA Verified Research Supply
					</span>
				</div>

				<h1 className='text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl'>
					Nuda Compounds: <span className='text-amber'>A Trusted Standard</span>{' '}
					in Peptide Research
				</h1>

				<p className='mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white sm:text-lg'>
					Third-party verified peptides for laboratory research, with public
					batch documentation and a small team that actually answers the phone.
				</p>

				<div className='mt-10 flex flex-wrap items-center justify-center gap-4'>
					<a
						href='#standards'
						className='rounded-2xl border border-white/25 bg-navy-dark/60 px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-white backdrop-blur-md transition-colors hover:border-white/50 hover:bg-navy-dark/40'
					>
						View Our Testing Standards
					</a>
					<a
						href='#catalog'
						className='rounded-2xl bg-amber px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-navy-dark transition-colors hover:bg-amber-dark'
					>
						Shop our catalog
					</a>
				</div>

				{/* <div className='mx-auto mt-14 h-px max-w-3xl bg-gradient-to-r from-transparent via-white/40 to-transparent' /> */}

				<div className='mx-auto mt-24 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8'>
					{stats.map((item) => (
						<div
							key={item.label}
							className='border border-offwhite/30 rounded-2xl p-4 bg-navy-dark/60 backdrop-blur-md'
						>
							<div className='mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-2xl border border-amber/30 bg-amber/15'>
								<item.icon className='h-5 w-5 text-amber' />
							</div>
							<div className='font-mono text-2xl font-bold text-amber'>
								{item.stat}
							</div>
							<div className='mt-1 text-xs text-white tracking-widest'>
								{item.label}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
