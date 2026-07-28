'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { playAddToCartSound } from '../lib/sound';
import { CartIcon, MenuIcon, XIcon } from './icons';
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
	const pathname = usePathname();
	const isProductPage = pathname.startsWith('/products/');
	const [scrolled, setScrolled] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const isSolid = isProductPage || scrolled;

	useEffect(() => {
		if (celebrationTick === 0) return;
		playAddToCartSound();
	}, [celebrationTick]);

	useEffect(() => {
		if (isProductPage) return;
		const onScroll = () => setScrolled(window.scrollY > 24);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, [isProductPage]);

	useEffect(() => {
		document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	}, [mobileMenuOpen]);

	return (
		<header
			className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
				isSolid
					? 'bg-white backdrop-blur-md border-black/5'
					: 'bg-transparent border-b border-white/20'
			}`}
		>
			{/* <div className='hidden sm:flex items-center justify-center gap-2 bg-navy-dark text-offwhite text-xs py-1.5 px-4'>
				<span className='w-1.5 h-1.5 rounded-full bg-emerald-400' />
				<span>USA-Based Sourcing &mdash; Research Use Only</span>
			</div> */}

			<div className='max-w-6xl mx-auto grid grid-cols-[1fr_auto_1fr] items-center px-6 py-2'>
				<button
					type='button'
					onClick={() => setMobileMenuOpen(true)}
					aria-label='Open menu'
					className={`col-start-1 flex h-10 w-10 items-center justify-center justify-self-start rounded-full transition-colors duration-300 md:hidden ${
						isSolid
							? 'text-navy hover:bg-navy/5 hover:text-amber-dark'
							: 'text-amber hover:bg-white/10 hover:text-amber-light'
					}`}
				>
					<MenuIcon className='h-6 w-6' />
				</button>

				<Link
					href='/'
					className='col-start-2 flex items-center gap-2 justify-self-center md:col-start-1 md:justify-self-start'
				>
					<span className='w-8 h-8 rounded-full bg-navy flex items-center justify-center text-amber font-bold text-sm'>
						N
					</span>
					<span
						className={`font-bold tracking-tight text-lg transition-colors duration-300 ${
							isSolid ? 'text-navy' : 'text-amber'
						}`}
					>
						NUDA{' '}
						<span
							className={`font-normal transition-colors duration-300 ${
								isSolid ? 'text-warmgray' : 'text-amber/70'
							}`}
						>
							Compounds
						</span>
					</span>
				</Link>

				<nav
					className={`hidden items-center gap-8 text-sm font-bold uppercase tracking-widest transition-colors duration-300 md:col-start-2 md:flex md:justify-self-center ${
						isSolid ? 'text-charcoal' : 'text-amber'
					}`}
				>
					{NAV_LINKS.map((link) => (
						<SectionLink
							key={link.href}
							href={link.href}
							className={`transition-colors duration-300 ${
								isSolid
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
					className={`relative col-start-3 flex h-10 w-10 items-center justify-center justify-self-end rounded-full transition-colors duration-300 ${
						isSolid
							? 'text-navy hover:bg-navy/5 hover:text-amber-dark'
							: 'text-amber hover:bg-white/10 hover:text-amber-light'
					}`}
				>
					<CartIcon className='h-6 w-6' />
					{totalCount > 0 && (
						<span className='absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber px-1 text-[11px] font-bold text-navy-dark'>
							{totalCount}
						</span>
					)}
					<ConfettiBurst trigger={celebrationTick} />
				</button>
			</div>

			{mobileMenuOpen && (
				<div className='fixed inset-x-0 top-16 z-60 h-[45vh] overflow-y-auto rounded-b-2xl bg-navy-dark shadow-2xl md:hidden'>
					<button
						type='button'
						onClick={() => setMobileMenuOpen(false)}
						aria-label='Close menu'
						className='absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-offwhite transition-colors hover:bg-white/10'
					>
						<XIcon className='h-5 w-5' />
					</button>

					<nav className='flex h-full flex-col items-center justify-center gap-4 text-base font-bold uppercase tracking-widest text-offwhite'>
						{NAV_LINKS.map((link) => (
							<SectionLink
								key={link.href}
								href={link.href}
								onClick={() => setMobileMenuOpen(false)}
								className='transition-colors hover:text-amber'
							>
								{link.label}
							</SectionLink>
						))}
					</nav>
				</div>
			)}
		</header>
	);
}
