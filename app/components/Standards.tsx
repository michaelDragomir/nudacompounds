import Image from 'next/image';
import {
	ArrowRightIcon,
	AtomIcon,
	DropletIcon,
	FingerprintIcon,
	FlaskIcon,
	MoleculeIcon,
	ShieldIcon,
} from './icons';
import { SectionLink } from './SectionLink';

const phases = [
	{ icon: FingerprintIcon, label: 'Identity' },
	{ icon: DropletIcon, label: 'Purity' },
	{ icon: FlaskIcon, label: 'Concentration' },
	{ icon: ShieldIcon, label: 'Sterility' },
	{ icon: MoleculeIcon, label: 'Endotoxins' },
	{ icon: AtomIcon, label: 'Heavy Metals' },
];

export function Standards() {
	return (
		<section
			id='standards'
			className='max-w-6xl mx-auto px-6 py-18 grid md:grid-cols-2 gap-12 items-center'
		>
			<div className='rounded-2xl bg-navy aspect-4/3 relative overflow-hidden order-2 md:order-1'>
				<Image
					src='/lab-test-image.png'
					alt='Lab technician pipetting samples for testing'
					fill
					sizes='(min-width: 768px) 50vw, 100vw'
					className='object-cover'
				/>
				<div
					className='absolute inset-0 bg-linear-to-t from-navy-dark/70 via-navy-dark/10 to-transparent'
					aria-hidden='true'
				/>
				<div className='absolute bottom-5 left-5 bg-navy-dark/90 text-offwhite text-xs font-semibold px-4 py-2 rounded-lg'>
					6-Point Testing Protocol
				</div>
			</div>

			<div className='order-1 md:order-2'>
				<div className='flex items-center gap-3 mb-4'>
					<span className='w-8 h-px bg-amber' />
					<span className='text-navy text-xs font-bold tracking-[0.2em] uppercase'>
						Our Standards
					</span>
				</div>
				<h2 className='text-3xl font-bold text-navy leading-tight'>
					Rigorous Testing. No Shortcuts.
				</h2>
				<p className='mt-4 text-charcoal/80 leading-relaxed text-lg'>
					We don&rsquo;t rely on a single pass or unverified overseas sourcing.
					Every peptide we distribute goes through independent lab verification
					across six points before it ships.
				</p>

				<div className='mt-6 grid grid-cols-2 gap-3'>
					{phases.map(({ icon: Icon, label }) => (
						<div
							key={label}
							className='flex items-center gap-2.5 text-lg text-charcoal'
						>
							<span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber/10 text-amber-dark'>
								<Icon className='h-5 w-5' />
							</span>
							{label}
						</div>
					))}
				</div>

				<p className='mt-6 text-charcoal/80 leading-relaxed text-lg'>
					Every Certificate of Analysis, lot number, and batch record is
					published publicly &mdash; no account or request required.
				</p>

				<SectionLink
					href='/contact'
					className='text-lg mt-6 inline-flex items-center gap-2 text-navy font-bold text-sm hover:text-amber-dark transition-colors'
				>
					View Sample COA <ArrowRightIcon />
				</SectionLink>
			</div>
		</section>
	);
}
