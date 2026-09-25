import type { Metadata } from 'next';

// The checkout page is a client component (needs Stripe Elements' client
// hooks), so it can't export metadata itself — this layout carries the
// noindex directive instead. Every session here is per-customer and
// short-lived, so it has no business being indexed.
export const metadata: Metadata = {
	title: 'Checkout',
	robots: { index: false, follow: false },
};

export default function CheckoutLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
