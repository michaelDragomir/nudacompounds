'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { MouseEventHandler, ReactNode } from 'react';

type SectionLinkProps = {
	href: string;
	className?: string;
	children: ReactNode;
	onClick?: MouseEventHandler<HTMLAnchorElement>;
};

/**
 * Wraps next/link for `/#section`-style links. On this Next.js version,
 * Link's client-side navigation concatenates hash fragments (e.g.
 * `/#catalog#contact`) instead of replacing them when jumping between two
 * `/#section` targets on the SAME page. Cross-page navigation (e.g. from
 * /products/[slug] to /#section) doesn't hit that bug, so we only fall
 * back to a manual same-page hash swap — which the DOM guarantees
 * replaces rather than appends — when we're already on the target page.
 */
export function SectionLink({
	href,
	className,
	children,
	onClick,
}: SectionLinkProps) {
	const pathname = usePathname();
	const [targetPath, hash] = href.split('#');
	const isSamePage = pathname === (targetPath || '/');

	if (isSamePage && hash) {
		return (
			<a
				href={href}
				className={className}
				onClick={(event) => {
					event.preventDefault();
					onClick?.(event);
					window.location.hash = hash;
				}}
			>
				{children}
			</a>
		);
	}

	return (
		<Link href={href} className={className} onClick={onClick}>
			{children}
		</Link>
	);
}
