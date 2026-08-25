import type { StripeCheckoutElementsOptions } from '@stripe/stripe-js';

// Shared with CheckoutElementsProvider so the mounted Elements (contact,
// address, payment) match the site's off-white checkout page instead of
// Stripe's default appearance.
export const checkoutAppearance: StripeCheckoutElementsOptions['appearance'] = {
	theme: 'stripe',
	variables: {
		colorPrimary: '#c48a3d',
		colorBackground: '#ffffff',
		colorText: '#2f4a78',
		colorTextSecondary: 'rgba(46, 46, 46, 0.6)',
		colorDanger: '#ef4444',
		// Stripe Elements render in a cross-origin iframe, so `fontFamily:
		// 'inherit'` can't reach the page's self-hosted Geist font — it silently
		// falls back to the browser's default serif. Use an explicit system
		// sans-serif stack instead so inputs match the rest of the site.
		fontFamily:
			'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
		borderRadius: '10px',
	},
	rules: {
		'.Input': {
			border: '1px solid rgba(0, 0, 0, 0.1)',
			backgroundColor: 'transparent',
		},
		'.Input:focus': {
			border: '1px solid #c48a3d',
			boxShadow: 'none',
		},
		'.Label': {
			color: 'rgba(46, 46, 46, 0.6)',
			fontSize: '11px',
			fontWeight: '700',
			textTransform: 'uppercase',
			letterSpacing: '0.05em',
		},
		'.Tab': {
			border: '1px solid rgba(0, 0, 0, 0.1)',
			backgroundColor: 'transparent',
		},
		'.Tab--selected': {
			border: '1px solid #c48a3d',
		},
	},
};
