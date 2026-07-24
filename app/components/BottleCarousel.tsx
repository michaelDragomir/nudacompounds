'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { products } from '../data/products';

const SLIDE_DURATION_MS = 3200;

export function BottleCarousel() {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setIndex((prev) => (prev + 1) % products.length);
		}, SLIDE_DURATION_MS);
		return () => clearInterval(timer);
	}, []);

	return (
		<div className='relative aspect-4/5 overflow-hidden rounded-3xl border border-offwhite/5 bg-transparent shadow-2xl'>
			{products.map((product, i) => (
				<div
					key={product.slug}
					className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
						i === index ? 'opacity-100' : 'opacity-0'
					}`}
					aria-hidden={i !== index}
				>
					<Image
						src={product.image}
						alt={`${product.name} vial`}
						fill
						priority={i === 0}
						sizes='(min-width: 1024px) 40vw, 90vw'
						className='object-contain p-10'
					/>
				</div>
			))}
		</div>
	);
}
