import { features } from '../data/features';

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

			<div className='mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3'>
				{features.map(({ icon: Icon, title, body }) => (
					<div
						key={title}
						className='rounded-2xl border-2 border-amber/60 bg-white p-8 text-center shadow-xl transition-colors hover:border-amber/60'
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
