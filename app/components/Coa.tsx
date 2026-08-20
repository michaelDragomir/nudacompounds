import { CoaList } from './CoaList';

export function Coa() {
	return (
		<section className='bg-navy-dark pb-20 pt-28'>
			<div className='mx-auto max-w-4xl px-6 text-center'>
				<span className='text-xs font-bold uppercase tracking-[0.3em] text-amber'>
					Documentation
				</span>
				<h1 className='mt-2 font-sora text-4xl font-extrabold leading-tight text-offwhite sm:text-5xl'>
					Certificates of Analysis
				</h1>
				<p className='mx-auto mt-4 max-w-2xl text-white/60'>
					Complete analytical documentation for every compound. View and
					download batch-specific COAs for your records.
				</p>
			</div>

			<CoaList />
		</section>
	);
}
