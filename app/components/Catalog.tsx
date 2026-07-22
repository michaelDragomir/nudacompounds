import Link from 'next/link';
import Image from 'next/image';
import { products } from '../data/products';
import { LockIcon } from './icons';

export function Catalog() {
	return (
		<section id='catalog' className='bg-navy-offwhite py-14'>
			<div className='mx-auto max-w-6xl px-6'>
				<div className='mx-auto mb-14 max-w-2xl text-center'>
					<div className='mb-4 flex items-center justify-center gap-3'>
						<span className='h-px w-8 bg-amber' />
						<span className='text-sm font-bold uppercase tracking-[0.2em] text-navy'>
							Research Catalog
						</span>
					</div>
					<h2 className='text-3xl font-bold leading-tight text-navy tracking-wide'>
						Available Compounds
					</h2>
					<p className='mt-4 text-charcoal tracking-wide text-lg'>
						Every vial ships with a published Certificate of Analysis and
						batch-level documentation.
					</p>
				</div>

				<div className='grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5'>
					{products.map((product) => (
						<Link
							key={product.slug}
							href={`/products/${product.slug}`}
							className='group relative flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-amber/50 hover:shadow-xl'
						>
							<div className='relative flex aspect-square items-center justify-center overflow-hidden bg-gradient-to-b from-navy-dark/5 to-navy-dark/10'>
								<Image
									src={product.image}
									alt={`${product.name} vial`}
									width={300}
									height={300}
									className='h-full w-auto object-contain p-6 drop-shadow-sm transition-transform duration-300 group-hover:scale-110'
								/>
							</div>

							<div className='flex flex-1 flex-col p-5'>
								<p className='text-[11px] font-bold uppercase tracking-wide text-warmgray'>
									{product.category}
								</p>
								<h3 className='mt-1 font-bold text-navy transition-colors duration-300 group-hover:text-amber-dark'>
									{product.name}
								</h3>

								<div className='mt-4 border-t border-black/5 pt-4'>
									<div className='flex items-center justify-between text-sm'>
										<span className='text-warmgray'>
											Purity: {product.purity}
										</span>
										<span className='font-bold text-navy'>
											${product.price.toFixed(2)}
										</span>
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
