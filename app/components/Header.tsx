'use client';

import { useEffect, useState } from 'react';
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
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		if (celebrationTick === 0) return;
		playAddToCartSound();
	}, [celebrationTick]);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 24);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<header
			className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
				scrolled
					? 'bg-white backdrop-blur-md border-black/5'
					: 'bg-transparent border-b border-white/20'
			}`}
		>
			{/* <div className='hidden sm:flex items-center justify-center gap-2 bg-navy-dark text-offwhite text-xs py-1.5 px-4'>
				<span className='w-1.5 h-1.5 rounded-full bg-emerald-400' />
				<span>USA-Based Sourcing &mdash; Research Use Only</span>
			</div> */}

			<div className='max-w-6xl mx-auto grid grid-cols-[1fr_auto_1fr] items-center px-6 py-2'>
				<Link href='/' className='flex items-center gap-2 justify-self-start'>
					<span className='w-8 h-8 rounded-full bg-navy flex items-center justify-center text-amber font-bold text-sm'>
						N
					</span>
					<span
						className={`font-bold tracking-tight text-lg transition-colors duration-300 ${
							scrolled ? 'text-navy' : 'text-amber'
						}`}
					>
						NUDA{' '}
						<span
							className={`font-normal transition-colors duration-300 ${
								scrolled ? 'text-warmgray' : 'text-amber/70'
							}`}
						>
							Compounds
						</span>
					</span>
				</Link>

				<nav
					className={`hidden md:flex items-center justify-self-center gap-8 text-sm font-bold uppercase tracking-widest transition-colors duration-300 ${
						scrolled ? 'text-charcoal' : 'text-amber'
					}`}
				>
					{NAV_LINKS.map((link) => (
						<SectionLink
							key={link.href}
							href={link.href}
							className={`transition-colors duration-300 ${
								scrolled
									? 'text-navy hover:text-amber-dark'
									: 'text-amber hover:text-amber-light'
							}`}
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
					className={`relative flex h-10 w-10 items-center justify-center justify-self-end rounded-full transition-colors duration-300 ${
						scrolled
							? 'text-navy hover:bg-navy/5 hover:text-amber-dark'
							: 'text-amber hover:bg-white/10 hover:text-amber-light'
					}`}
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
