import Image from 'next/image';
import Link from 'next/link';
import {
	BoxIcon,
	DocumentIcon,
	FlaskIcon,
	ShieldIcon,
	TagIcon,
	TruckIcon,
} from './icons';

const features = [
	{
		icon: TagIcon,
		title: 'Best Pricing',
		body: 'No gimmicks. No overcharging — fair pricing, always.',
	},
	{
		icon: FlaskIcon,
		title: '99%+ Purity',
		body: 'Every batch verified by HPLC and mass spectrometry. We publish our lab results because we have nothing to hide.',
	},
	{
		icon: ShieldIcon,
		title: 'Third-Party Tested',
		body: 'Independent third-party laboratory tested for purity, with endotoxin testing on every compound.',
	},
	{
		icon: DocumentIcon,
		title: 'Full COA Included',
		body: 'Certificate of Analysis ships with every order. For your piece of mind.',
	},
	{
		icon: TruckIcon,
		title: 'Same-Day Shipping',
		body: 'Same-day shipping on every order placed before 4 PM MST.',
	},
	{
		icon: BoxIcon,
		title: 'Shipment Protection',
		body: 'Lost, damaged, or stolen? We got you. Full coverage on every order, no questions asked.',
	},
];

export function FeatureGrid() {
	return (
		<section id='about' className='bg-offwhite py-24'>
			<div className='mx-auto max-w-6xl px-6'>
				<div className='grid gap-16 lg:grid-cols-2'>
					<div className='relative flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-navy-dark p-10 text-center shadow-2xl sm:p-14'>
						<div
							className='animate-glow-pulse absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(217,160,91,0.35),transparent_60%)]'
							aria-hidden='true'
						/>
						<div
							className='absolute inset-0 bg-molecule-grid opacity-40'
							aria-hidden='true'
						/>

						<span className='relative inline-flex items-center gap-2 rounded-full border border-amber/40 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-amber backdrop-blur-md'>
							<span className='relative flex h-1.5 w-1.5'>
								<span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75' />
								<span className='relative inline-flex h-1.5 w-1.5 rounded-full bg-amber' />
							</span>
							Limited Time Offer
						</span>

						<div className='relative mt-8 h-64 w-44 sm:h-72 sm:w-48'>
							<Image
								src='/images/3rt.png'
								alt='Nuda Compounds research vial'
								fill
								className='object-contain drop-shadow-2xl'
							/>
						</div>

						<h3 className='relative mt-8 font-sora text-3xl font-extrabold leading-tight text-white sm:text-4xl'>
							Buy 2 <span className='text-amber'>Get 1 Free</span>
						</h3>
						<p className='relative mt-3 max-w-xs text-white/70'>
							On all peptides of the same compound
						</p>

						<Link
							href='/catalog'
							className='relative mt-8 rounded-2xl bg-amber px-10 py-4 text-sm font-bold uppercase tracking-widest text-offwhite shadow-xl transition-colors hover:bg-amber-dark'
						>
							Shop the Deal
						</Link>
					</div>

					<div>
						<span className='text-xs font-bold uppercase tracking-[0.2em] text-amber-dark'>
							The Nuda Mission
						</span>
						<h2 className='mt-3 font-sora text-4xl font-extrabold leading-tight text-navy'>
							Why Choose Us
						</h2>
						<p className='mt-4 text-charcoal/70'>
							Six commitments we hold ourselves to on every single order.
						</p>

						<div className='mt-8 grid grid-cols-2 gap-4'>
							{features.map(({ icon: Icon, title, body }) => (
								<div
									key={title}
									className='rounded-xl border border-amber/40 bg-white p-5 text-center shadow-lg transition-colors hover:border-amber/50'
								>
									<div className='mx-auto flex h-10 w-10 items-center justify-center rounded-lg border border-amber/30 bg-amber/10 text-amber'>
										<Icon className='h-5 w-5' />
									</div>
									<h3 className='mt-3 text-md font-bold text-navy-dark'>
										{title}
									</h3>
									<p className='mt-1 text-sm leading-relaxed text-navy-dark/60'>
										{body}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
