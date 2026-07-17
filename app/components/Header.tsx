export function Header() {
	return (
		<header className='sticky top-0 z-50 bg-white backdrop-blur border-b border-black/5'>
			<div className='hidden sm:flex items-center justify-center gap-2 bg-navy-dark text-offwhite text-xs py-1.5 px-4'>
				<span className='w-1.5 h-1.5 rounded-full bg-emerald-400' />
				<span>USA-Based Sourcing &mdash; Research Use Only</span>
			</div>

			<div className='max-w-6xl mx-auto flex items-center justify-between px-6 py-4'>
				<a href='#top' className='flex items-center gap-2'>
					<span className='w-8 h-8 rounded-full bg-navy flex items-center justify-center text-amber font-bold text-sm'>
						N
					</span>
					<span className='font-bold tracking-tight text-navy text-lg'>
						NUDA <span className='font-normal text-warmgray'>Compounds</span>
					</span>
				</a>

				<nav className='hidden md:flex items-center gap-8 text-sm font-medium text-charcoal'>
					<a href='#standards' className='hover:text-navy transition-colors'>
						Testing Standards
					</a>
					<a href='#about' className='hover:text-navy transition-colors'>
						About
					</a>
					<a href='#story' className='hover:text-navy transition-colors'>
						Our Story
					</a>
					<a href='#contact' className='hover:text-navy transition-colors'>
						Contact
					</a>
				</nav>

				<a
					href='#contact'
					className='inline-flex items-center gap-1.5 bg-amber hover:bg-amber-dark text-navy-dark text-sm font-bold px-4 py-2 rounded-lg transition-colors'
				>
					Talk to Us
				</a>
			</div>
		</header>
	);
}
