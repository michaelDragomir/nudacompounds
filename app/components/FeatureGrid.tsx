import Image from 'next/image';
import Link from 'next/link';
import { DocumentIcon, TruckIcon, ClockIcon, PeopleIcon } from './icons';

const features = [
	{
		icon: DocumentIcon,
		title: 'Full Batch Transparency',
		body: 'COA database and batch-level documentation, available with every order.',
	},
	{
		icon: TruckIcon,
		title: 'Same-Day Shipping',
		body: 'Same-day shipping on every order placed before 3 PM MST.',
	},
	{
		icon: ClockIcon,
		title: 'Honest Pricing',
		body: 'What you see is what you get — fair pricing, every time.',
	},
	{
		icon: PeopleIcon,
		title: 'Third-Party Tested',
		body: 'endotoxin testing on every compound. No conflicts of interest.',
	},
];

export function FeatureGrid() {
	return (
		<section id='about' className='bg-offwhite py-24'>
			<div className='mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-2'>
				<div className='relative flex flex-col items-center overflow-hidden rounded-3xl bg-navy-dark p-10 text-center shadow-2xl sm:p-14'>
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
						className='relative mt-8 rounded-full bg-amber px-10 py-4 text-md font-bold uppercase tracking-widest text-offwhite shadow-xl transition-colors hover:bg-amber-dark'
					>
						Shop the Deal
					</Link>
				</div>

				<div>
					<span className='text-md font-bold uppercase tracking-[0.2em] text-amber-dark'>
						The Nuda Mission
					</span>
					<h2 className='mt-3 font-sora text-4xl font-extrabold leading-tight text-navy'>
						Why Choose Us
					</h2>

					<div className='mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2'>
						{features.map(({ icon: Icon, title, body }) => (
							<div
								key={title}
								className='rounded-2xl bg-navy/5 p-6 border border-amber/40 shadow-xl'
							>
								<div className='flex h-11 w-11 items-center justify-center rounded-xl bg-amber/10 text-amber'>
									<Icon className='h-5 w-5' />
								</div>
								<h3 className='mt-4 font-bold text-navy'>{title}</h3>
								<p className='mt-1 text-md leading-relaxed text-charcoal/70'>
									{body}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
