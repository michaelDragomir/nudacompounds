const PROMISE_ITEMS = [
	{
		badge: 'Always Included',
		title: 'Free Shipping',
		value: '$9.99 value',
		body: 'Every US order. No minimum, no codes. Ships discreetly.',
	},
	{
		badge: 'Every Order',
		title: 'Free BAC Water',
		value: '$9.99 value',
		body: 'Bacteriostatic water, a standardized laboratory solvent, included with every order.',
	},
	{
		badge: 'Guaranteed',
		title: "Arrives in 5 Days or It's",
		value: null,
		body: "If your order doesn't arrive within 5 business days of shipment, we'll ship you a free replacement. No forms, no friction.*",
	},
];

export function NudaPromise() {
	return (
		<section className='bg-navy py-20'>
			<div className='mx-auto max-w-6xl px-6'>
				<div className='mx-auto mb-14 max-w-3xl text-center'>
					<h2 className='text-3xl font-bold text-white sm:text-4xl'>
						The <span className='text-amber'>Nuda</span> Promise
					</h2>
					<div className='mt-4 flex flex-wrap items-center justify-center gap-3 text-sm text-white/70'>
						<span>Research Peptides Delivered Same Day Locally</span>
						<span className='hidden h-4 w-px bg-amber/60 sm:block' />
						<span>Free Shipping + Free BAC Water on Every Order</span>
					</div>
				</div>

				<div className='grid gap-6 lg:grid-cols-3'>
					{PROMISE_ITEMS.map(({ badge, title, value, body }) => (
						<div
							key={title}
							className='rounded-2xl border border-amber/40 bg-white/3 p-8 text-center shadow-xl'
						>
							<span className='inline-flex items-center gap-2 rounded-full border border-amber/40 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber'>
								<span className='h-1.5 w-1.5 rounded-full bg-amber' />
								{badge}
							</span>

							<h3 className='mt-5 text-2xl font-bold leading-snug text-white'>
								{title}
							</h3>

							{value && (
								<p className='mt-3 text-sm text-white/40 line-through'>
									{value}
								</p>
							)}

							<p className='mt-1 text-4xl font-bold tracking-wide text-amber'>
								FREE
							</p>

							<span className='mx-auto mt-4 block h-px w-10 bg-white/15' />

							<p className='mt-4 text-sm leading-relaxed text-white/70'>
								{body}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
