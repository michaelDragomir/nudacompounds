'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { playAddToCartSound } from '../lib/sound';
import { CartIcon } from './icons';
import { ConfettiBurst } from './ConfettiBurst';
import { SectionLink } from './SectionLink';

const NAV_LINKS = [
	{ href: '/#catalog', label: 'Catalog' },
	{ href: '/#standards', label: 'COAs' },
	{ href: '/#faq', label: 'FAQs' },
	{ href: '/#contact', label: 'Contact' },
];

export function Header() {
	const { totalCount, celebrationTick, toggleCart } = useCart();

	useEffect(() => {
		if (celebrationTick === 0) return;
		playAddToCartSound();
	}, [celebrationTick]);

	return (
		<header className='sticky top-0 z-50 bg-offwhite backdrop-blur-md border-b border-black/5'>
			{/* <div className='hidden sm:flex items-center justify-center gap-2 bg-navy-dark text-offwhite text-xs py-1.5 px-4'>
				<span className='w-1.5 h-1.5 rounded-full bg-emerald-400' />
				<span>USA-Based Sourcing &mdash; Research Use Only</span>
			</div> */}

			<div className='max-w-6xl mx-auto flex items-center justify-between px-6 py-2'>
				<Link href='/' className='flex items-center gap-2'>
					<span className='w-8 h-8 rounded-full bg-navy flex items-center justify-center text-amber font-bold text-sm'>
						N
					</span>
					<span className='font-bold tracking-tight text-navy text-lg'>
						NUDA <span className='font-normal text-warmgray'>Compounds</span>
					</span>
				</Link>

				<nav className='hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-charcoal'>
					{NAV_LINKS.map((link) => (
						<SectionLink
							key={link.href}
							href={link.href}
							className='text-navy transition-colors hover:text-amber-dark'
						>
							{link.label}
						</SectionLink>
					))}
				</nav>

				<button
					type='button'
					onClick={toggleCart}
					aria-label={`Open cart, ${totalCount} ${
						totalCount === 1 ? 'item' : 'items'
					}`}
					className='relative flex h-10 w-10 items-center justify-center rounded-full text-navy transition-colors hover:bg-navy/5 hover:text-amber-dark'
				>
					<CartIcon className='h-6 w-6' />
					{totalCount > 0 && (
						<span className='absolute -right-0 -top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber px-1 text-[11px] font-bold text-navy-dark'>
							{totalCount}
						</span>
					)}
					<ConfettiBurst trigger={celebrationTick} />
				</button>
			</div>
		</header>
	);
}
