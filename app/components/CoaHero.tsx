export function CoaHero() {
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
						Documentation
					</span>
					<span className='h-px w-8 bg-amber' />
				</div>

				<h1 className='font-sora text-4xl font-extrabold leading-tight text-offwhite sm:text-5xl'>
					Certificates of Analysis
				</h1>

				<p className='mx-auto mt-4 max-2w-xl text-white/60'>
					Complete analytical documentation for every compound. View and
					download batch-specific COAs for your records. Updated frequently to
					reflect the latest tests.
				</p>
			</div>
		</section>
	);
}
