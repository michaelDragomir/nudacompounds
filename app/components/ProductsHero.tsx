const PROMISE_PILLS = [
	{ label: 'Free Shipping', detail: 'Every US Order' },
	{ label: 'Free BAC Water', detail: 'Included Always' },
	{ label: '2-5 Day Delivery', detail: 'with tracking' },
];

export function ProductsHero() {
	return (
		<section className='relative overflow-hidden bg-navy pb-16 pt-28 text-center bg-linear-to-b from-navy to-navy-dark'>
			<div
				className='pointer-events-none absolute inset-0 animate-glow-pulse bg-[radial-gradient(circle_at_50%_0%,rgba(217,160,91,0.25),transparent_55%)]'
				aria-hidden='true'
			/>

			<div className='relative mx-auto max-w-5xl px-6'>
				<div className='mb-4 flex items-center justify-center gap-3'>
					<span className='h-px w-8 bg-amber' />
					<span className='text-xs font-bold uppercase tracking-[0.3em] text-amber'>
						Research Products
					</span>
					<span className='h-px w-8 bg-amber' />
				</div>

				<h1 className='font-sora text-4xl font-extrabold leading-tight text-offwhite sm:text-5xl'>
					Research Compounds
				</h1>

				<p className='mx-auto mt-4 max-2w-xl text-white/60'>
					All compounds are third-party tested and include a Certificate of
					Analysis. For research use only.
				</p>

				<div className='mt-8 flex items-center justify-center gap-4'>
					{PROMISE_PILLS.map(({ label, detail }) => (
						<div
							key={label}
							className='inline-flex items-center gap-2 rounded-full border border-amber/30 px-5 py-2.5 text-sm'
						>
							<span className='h-1.5 w-1.5 rounded-full bg-amber' />
							<span className='font-bold text-white'>{label}</span>
							<span className='h-4 w-px bg-amber/30' />
							<span className='text-xs font-bold uppercase tracking-wide text-amber'>
								{detail}
							</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
