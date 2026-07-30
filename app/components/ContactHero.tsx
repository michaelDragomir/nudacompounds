export function ContactHero() {
	return (
		<section className='relative overflow-hidden bg-navy pb-16 pt-28 text-center bg-linear-to-b from-navy to-navy-dark'>
			<div
				className='pointer-events-none absolute inset-0 animate-glow-pulse bg-[radial-gradient(circle_at_50%_0%,rgba(217,160,91,0.25),transparent_55%)]'
				aria-hidden='true'
			/>

			<div className='relative mx-auto max-w-2xl px-6'>
				<div className='mb-4 flex items-center justify-center gap-3'>
					<span className='h-px w-8 bg-amber' />
					<span className='text-xs font-bold uppercase tracking-[0.3em] text-amber'>
						Contact
					</span>
					<span className='h-px w-8 bg-amber' />
				</div>

				<h1 className='font-sora text-4xl font-extrabold leading-tight text-offwhite sm:text-5xl'>
					Get in Touch
				</h1>

				<p className='mx-auto mt-4 max-w-xl text-white/60'>
					Questions about products, orders, or research applications? Send us a
					note and we&apos;ll get back within one business day.
				</p>
			</div>
		</section>
	);
}
