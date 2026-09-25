import {
	BoxIcon,
	DocumentIcon,
	FlaskIcon,
	ShieldIcon,
	TagIcon,
	TruckIcon,
} from '../components/icons';
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_COST } from '../lib/cart';

export const features = [
	{
		icon: TagIcon,
		title: 'Best Pricing',
		body: 'No gimmicks. No overcharging — fair pricing, always.',
	},
	{
		icon: FlaskIcon,
		title: '99%+ Purity',
		body: 'Every batch verified by HPLC and mass spectrometry. We publish all our lab results. This is our way.',
	},
	{
		icon: ShieldIcon,
		title: 'Third-Party Tested',
		body: 'Independent third-party laboratory tested for purity, with endotoxin testing on all compounds.',
	},
	{
		icon: DocumentIcon,
		title: 'Full COA Included',
		body: 'Certificate of Analysis ships with every order. For your piece of mind.',
	},
	{
		icon: TruckIcon,
		title: `Free Shipping on $${FREE_SHIPPING_THRESHOLD}+`,
		body: `Orders under $${FREE_SHIPPING_THRESHOLD} ship for a flat $${STANDARD_SHIPPING_COST.toFixed(2)}. Same-day dispatch before 4 PM MST.`,
	},
	{
		icon: BoxIcon,
		title: 'Shipment Protection',
		body: 'Lost, damaged, or stolen? We got you. Full coverage on every order.',
	},
];
