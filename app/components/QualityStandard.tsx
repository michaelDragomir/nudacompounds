import { CheckIcon } from './icons';

const ORDER_INCLUDES = [
	'Certificate of Analysis (COA)',
	'HPLC Chromatography Report',
	'Batch & Lot Tracking Number',
	'Storage & Handling Guidelines',
];

export function QualityStandard() {
	return (
		<section className='bg-navy-light py-18'>
			<div className='mx-auto max-w-6xl px-6'>
				<div className='grid gap-12 text-center md:grid-cols-2 md:items-center'>
					<div className='flex flex-col items-center'>
						<div className='flex items-baseline justify-center'>
							<span className='text-6xl font-bold text-white sm:text-7xl'>
								99
							</span>
							<span className='text-6xl font-bold text-amber sm:text-7xl'>
								%
							</span>
							<span className='text-6xl font-bold text-white sm:text-7xl'>
								+
							</span>
						</div>
						<p className='mt-4 max-w-md leading-relaxed text-white text-lg'>
							Every compound is independently verified through third-party HPLC
							analysis, with a Certificate of Analysis included on every order.
						</p>
					</div>

					<div className='flex flex-col items-center'>
						<span className='text-sm font-bold uppercase tracking-[0.2em] text-amber'>
							Every Order Includes
						</span>
						<ul className='mt-4 flex flex-col items-start gap-3'>
							{ORDER_INCLUDES.map((label) => (
								<li key={label} className='flex items-center gap-3'>
									<span className='flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-amber text-navy-dark'>
										<CheckIcon className='h-5 w-5' />
									</span>
									<span className='font-medium text-white text-lg'>
										{label}
									</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}
