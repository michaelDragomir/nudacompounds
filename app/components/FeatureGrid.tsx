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
		body: 'Every batch verified by HPLC and mass spectrometry. We publish all our lab results. This is our way.',
	},
	{
		icon: ShieldIcon,
		title: 'Third-Party Tested',
		body: 'Independent third-party laboratory tested for purity, with endotoxin testing on all compounds.',
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
		body: 'Lost, damaged, or stolen? We got you. Full coverage on every order.',
	},
];

export function FeatureGrid() {
	return (
		<section id='about' className='bg-offwhite py-14'>
			<div className='mx-auto max-w-4xl px-6 text-center'>
				<h2 className='font-sora text-4xl font-extrabold leading-tight text-navy'>
					Why Choose <span className='text-amber-dark'>Nuda</span>?
				</h2>
				<p className='mt-4 text-navy text-lg tracking-wider'>
					Every order backed by independent testing, transparent results, and
					the higest standards.
				</p>
			</div>

			<div className='mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3'>
				{features.map(({ icon: Icon, title, body }) => (
					<div
						key={title}
						className='rounded-2xl border border-amber/40 bg-white p-8 text-center shadow-2xl transition-colors hover:border-amber/60'
					>
						<div className='mx-auto flex h-14 w-14 items-center justify-center rounded-xl border border-amber/30 bg-amber/0 text-amber'>
							<Icon className='h-6 w-6' />
						</div>
						<h3 className='mt-5 font-bold text-navy'>{title}</h3>
						<span className='mx-auto mt-2 block h-px w-8 bg-amber/60' />
						<p className='mt-3 text-md leading-relaxed text-navy/80 tracking-wide'>
							{body}
						</p>
					</div>
				))}
			</div>
		</section>
	);
}
