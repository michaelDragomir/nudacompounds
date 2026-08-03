import Link from 'next/link';
import Image from 'next/image';
import { products } from '../data/products';

export function Catalog() {
	return (
		<section id='catalog' className='bg-navy-offwhite py-16'>
			<div className='mx-auto max-w-6xl px-6'>
				<div className='grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4'>
					{products.map((product) => (
						<Link
							key={product.slug}
							href={`/products/${product.slug}`}
							className='group relative flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white transition-all duration-300 shadow-md hover:-translate-y-1 hover:border-amber/50 hover:shadow-xl'
						>
							<div className='relative flex aspect-square items-center justify-center overflow-hidden bg-linear-to-b from-navy-dark/5 to-navy-dark/10'>
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
