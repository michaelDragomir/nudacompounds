import Image from 'next/image';
import Link from 'next/link';

const PROMO_BOTTLES = [
	{
		src: '/images/tesamorelin.png',
		translate: -30,
		scale: 0.72,
		opacity: 0.4,
		blur: 2,
		z: 10,
	},
	{
		src: '/images/bpc.png',
		translate: -16,
		scale: 0.85,
		opacity: 0.7,
		blur: 0,
		z: 20,
	},
	{
		src: '/images/3rt.png',
		translate: 0,
		scale: 1,
		opacity: 1,
		blur: 0,
		z: 30,
	},
	{
		src: '/images/ghk.png',
		translate: 15,
		scale: 0.85,
		opacity: 0.7,
		blur: 0,
		z: 20,
	},
	{
		src: '/images/2rt.png',
		translate: 30,
		scale: 0.72,
		opacity: 0.4,
		blur: 2,
		z: 10,
	},
];

const PROMO_EDGE_MASK =
	'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)';

export function PromoStrip() {
	return (
		<section className='bg-offwhite pt-6 pb-12'>
			<div className='mx-auto max-w-6xl px-6'>
				<div className='relative overflow-hidden rounded-3xl border-2 border-dashed border-amber bg-linear-to-b from-navy to-navy-dark shadow-2xl'>
					<div
						className='absolute -top-16 -left-16 h-56 w-56 rounded-full bg-amber/15 blur-3xl'
						aria-hidden='true'
					/>
					<div
						className='absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-amber/10 blur-3xl'
						aria-hidden='true'
					/>

					<div className='relative flex flex-col items-center gap-10 p-8 sm:p-12 lg:flex-row lg:justify-between lg:gap-6'>
						<div
							className='relative h-40 w-72 shrink-0 sm:h-48 sm:w-80'
							style={{
								WebkitMaskImage: PROMO_EDGE_MASK,
								maskImage: PROMO_EDGE_MASK,
							}}
						>
							{PROMO_BOTTLES.map((bottle) => (
								<div
									key={bottle.src}
									className='absolute inset-0'
									style={{
										transform: `translateX(${bottle.translate}%) scale(${bottle.scale})`,
										opacity: bottle.opacity,
										filter: bottle.blur ? `blur(${bottle.blur}px)` : 'none',
										zIndex: bottle.z,
									}}
								>
									<Image
										src={bottle.src}
										alt='Nuda Compounds research vial'
										fill
										priority={bottle.z === 30}
										sizes='320px'
										className='object-contain drop-shadow-xl'
									/>
								</div>
							))}
						</div>

						<div className='flex flex-col items-center text-center lg:items-start lg:text-left'>
							<span className='-rotate-3 inline-flex items-center gap-2 rounded-full border border-amber/70 bg-amber/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-amber'>
								<span className='relative flex h-1.5 w-1.5'>
									<span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75' />
									<span className='relative inline-flex h-1.5 w-1.5 rounded-full bg-amber' />
								</span>
								Limited Time Offer
							</span>

							<h2 className='mt-4 font-sora text-3xl font-extrabold leading-tight text-offwhite sm:text-4xl'>
								Buy 2 <span className='text-amber'>Get 1 Free</span>
							</h2>
							<p className='mt-2 max-w-sm text-offwhite/90'>
								On peptides of equal or lesser value, excluding kits. Stock up
								and save!
							</p>
						</div>

						<Link
							href='/products'
							className='shrink-0 rounded-2xl bg-amber px-10 py-4 text-sm font-bold uppercase tracking-widest text-offwhite shadow-2xl transition-transform hover:-translate-y-0.5 hover:bg-amber-dark border border-amber'
						>
							Shop the Deal
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
