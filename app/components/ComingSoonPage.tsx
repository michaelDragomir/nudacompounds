export function ComingSoonPage({ title }: { title: string }) {
	return (
		<section className='flex min-h-[60vh] flex-col items-center justify-center bg-offwhite px-6 pb-16 pt-32 text-center'>
			<span className='text-xs font-bold uppercase tracking-[0.2em] text-amber-dark'>
				{title}
			</span>
			<h1 className='mt-3 font-sora text-4xl font-extrabold text-navy'>
				Coming Soon
			</h1>
		</section>
	);
}
