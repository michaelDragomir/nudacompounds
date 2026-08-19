import { features } from '../data/features';

export function ProductTrustGrid() {
	return (
		<section className='bg-linear-to-b from-navy to-navy-dark py-6'>
			<div className='mx-auto max-w-4xl px-6 text-center'>
				<span className='text-xs font-bold uppercase tracking-[0.3em] text-amber'>
					The Nuda Standard
				</span>
				<h2 className='mt-2 font-sora text-4xl font-extrabold leading-tight text-offwhite'>
					Why Choose <span className='text-amber'>Nuda</span>
				</h2>
			</div>

			<div className='mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3'>
				{features.map(({ icon: Icon, title, body }) => (
					<div
						key={title}
						className='rounded-2xl border border-offwhite/10 bg-white/5 p-8 text-center transition-colors hover:border-amber/40'
					>
						<div className='mx-auto flex h-14 w-14 items-center justify-center rounded-xl border border-amber/30 bg-amber/10 text-amber'>
							<Icon className='h-6 w-6' />
						</div>
						<h3 className='mt-5 font-bold text-offwhite'>{title}</h3>
						<p className='mt-3 text-sm leading-relaxed text-offwhite/60'>
							{body}
						</p>
					</div>
				))}
			</div>
		</section>
	);
}
