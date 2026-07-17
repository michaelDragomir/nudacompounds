export function Hero() {
	return (
		<section id='top' className='relative bg-navy overflow-hidden'>
			<div
				className='absolute inset-0 bg-molecule-grid opacity-40'
				aria-hidden='true'
			/>
			<div
				className='absolute -right-40 -top-40 w-[520px] h-[520px] rounded-full bg-navy-light/40 blur-3xl'
				aria-hidden='true'
			/>

			<div className='relative max-w-6xl mx-auto px-6 pt-20 pb-16'>
				<div className='flex items-center gap-3 mb-6'>
					<span className='w-8 h-px bg-amber' />
					<span className='text-amber text-xs font-bold tracking-[0.2em] uppercase'>
						USA Verified Research Supply
					</span>
				</div>

				<h1 className='text-4xl sm:text-5xl font-bold text-offwhite leading-tight max-w-2xl'>
					Nuda Compounds: <span className='text-amber'>A Trusted Standard</span>{' '}
					in Peptide Research
				</h1>

				<p className='mt-6 text-offwhite/70 text-base sm:text-lg max-w-xl leading-relaxed'>
					Third-party verified peptides for laboratory research, with public
					batch documentation and a small team that actually answers the phone.
				</p>

				<div className='mt-8 flex flex-wrap items-center gap-4'>
					<a
						href='#standards'
						className='inline-flex items-center gap-2 bg-amber hover:bg-amber-dark text-navy-dark font-bold text-sm px-6 py-3 rounded-lg transition-colors'
					>
						View Our Testing Standards
					</a>
					<a
						href='#story'
						className='inline-flex items-center gap-2 border border-offwhite/30 hover:border-offwhite/60 text-offwhite font-semibold text-sm px-6 py-3 rounded-lg transition-colors'
					>
						Learn More
					</a>
				</div>

				<div className='mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl'>
					{[
						{ stat: '3rd', label: 'Party Lab Verification' },
						{ stat: '100%', label: 'USA-Sourced Materials' },
						{ stat: 'COA', label: 'Published for Every Batch' },
					].map((item) => (
						<div
							key={item.label}
							className='rounded-xl bg-offwhite/5 border border-offwhite/10 px-5 py-4'
						>
							<div className='text-amber text-2xl font-bold'>{item.stat}</div>
							<div className='text-offwhite/60 text-xs mt-1'>{item.label}</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
