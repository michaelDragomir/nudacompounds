import Image from 'next/image';
import Link from 'next/link';

const PROMO_BOTTLES = [
	{
		src: '/images/tesamorelin.png',
		translate: -35,
		scale: 0.72,
		opacity: 0.4,
		blur: 2,
		z: 10,
	},
	{
		src: '/images/bpc.png',
		translate: -19,
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
		translate: 19,
		scale: 0.85,
		opacity: 0.7,
		blur: 0,
		z: 20,
	},
	{
		src: '/images/2rt.png',
		translate: 35,
		scale: 0.72,
		opacity: 0.4,
		blur: 2,
		z: 10,
	},
];

const PROMO_EDGE_MASK =
	'linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)';

// Not currently rendered on any page — build a section around this and drop
// it in wherever a promo placement is decided.
export function PromoCard() {
	return (
		<section className='bg-offwhite py-24'>
			<div className='mx-auto max-w-xl px-6'>
				<div className='relative flex flex-col items-center justify-center overflow-hidden rounded-3xl bg-navy-dark p-10 text-center shadow-2xl sm:p-14'>
					<div
						className='animate-glow-pulse absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(217,160,91,0.35),transparent_60%)]'
						aria-hidden='true'
					/>
					<div
						className='absolute inset-0 bg-molecule-grid opacity-40'
						aria-hidden='true'
					/>

					<span className='relative inline-flex items-center gap-2 rounded-full border border-amber/40 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-amber backdrop-blur-md'>
						<span className='relative flex h-1.5 w-1.5'>
							<span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-75' />
							<span className='relative inline-flex h-1.5 w-1.5 rounded-full bg-amber' />
						</span>
						Limited Time Offer
					</span>

					<div
						className='relative mt-8 h-64 w-72 sm:h-72 sm:w-80'
						style={{
							WebkitMaskImage: PROMO_EDGE_MASK,
							maskImage: PROMO_EDGE_MASK,
						}}
					>
						{PROMO_BOTTLES.map((bottle) => (
							<div
								key={bottle.src}
								className='absolute inset-0 transition-transform duration-300'
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
									className='object-contain drop-shadow-2xl'
								/>
							</div>
						))}
					</div>
					<div className='border-3 mt-5 animate-pulse rounded-2xl border-amber p-4'>
						<h3 className='relative font-sora text-3xl font-extrabold leading-tight tracking-wide text-white sm:text-4xl'>
							Buy 2 Get
							<br />
							<span className='text-amber'>1 Free</span>
						</h3>
						<p className='relative mt-3 max-w-xs text-white/70'>
							On all peptides of the same compound
						</p>
					</div>

					<Link
						href='/products'
						className='relative mt-8 rounded-2xl bg-amber px-10 py-4 text-sm font-bold uppercase tracking-widest text-offwhite shadow-xl transition-colors hover:bg-amber-dark'
					>
						Shop the Deal
					</Link>
				</div>
			</div>
		</section>
	);
}
