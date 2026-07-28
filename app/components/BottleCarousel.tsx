'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { products } from '../data/products';

const SLIDE_DURATION_MS = 3500;

const seenImages = new Set<string>();
const CAROUSEL_SLIDES = products.filter((product) => {
	if (seenImages.has(product.image)) return false;
	seenImages.add(product.image);
	return true;
});

const SLIDE_COUNT = CAROUSEL_SLIDES.length;

const LEVEL_STYLES = [
	{ translate: 0, scale: 1, opacity: 1, blur: 0, z: 40 },
	{ translate: 46, scale: 0.75, opacity: 0.45, blur: 3, z: 20 },
	{ translate: 82, scale: 0.55, opacity: 0.22, blur: 5, z: 10 },
	{ translate: 110, scale: 0.4, opacity: 0, blur: 6, z: 0 },
];

export function BottleCarousel() {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setIndex((prev) => (prev + 1) % SLIDE_COUNT);
		}, SLIDE_DURATION_MS);
		return () => clearInterval(timer);
	}, []);

	const edgeMask =
		'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)';

	return (
		<div
			className='relative aspect-4/5 overflow-hidden'
			style={{ WebkitMaskImage: edgeMask, maskImage: edgeMask }}
		>
			{CAROUSEL_SLIDES.map((product, i) => {
				const raw = (i - index + SLIDE_COUNT) % SLIDE_COUNT;
				const offset = raw > SLIDE_COUNT / 2 ? raw - SLIDE_COUNT : raw;
				const level =
					LEVEL_STYLES[Math.min(Math.abs(offset), LEVEL_STYLES.length - 1)];
				const direction = offset === 0 ? 0 : offset > 0 ? 1 : -1;

				return (
					<div
						key={product.slug}
						className='absolute left-1/2 top-1/2 h-[80%] w-[64%] transition-[transform,opacity,filter] duration-700 ease-in-out'
						style={{
							transform: `translate(-50%, -50%) translateX(${
								level.translate * direction
							}%) scale(${level.scale})`,
							opacity: level.opacity,
							filter: level.blur ? `blur(${level.blur}px)` : 'none',
							zIndex: level.z,
						}}
					>
						<Image
							src={product.image}
							alt={`${product.name} vial`}
							fill
							priority={i === 0}
							sizes='(min-width: 1024px) 40vw, 90vw'
							className='object-contain drop-shadow-xl'
						/>
					</div>
				);
			})}
		</div>
	);
}
