import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_COST } from '../lib/cart';

export const FAQ_ITEMS = [
	{
		question: 'How much does shipping cost?',
		answer: `Orders of $${FREE_SHIPPING_THRESHOLD} or more ship free. Orders under $${FREE_SHIPPING_THRESHOLD} ship for a flat $${STANDARD_SHIPPING_COST.toFixed(2)}. A complimentary vial of BAC Water is included with every order regardless of order size.`,
	},
	{
		question: 'What is a Certificate of Analysis (COA)?',
		answer:
			'A COA is an independent lab report confirming the identity, purity, and safety profile of a specific batch. We publish a COA for every product we distribute, including batch number and test date.',
	},
	{
		question: 'Are these compounds intended for human use?',
		answer:
			'No. Every product on this site is sold strictly for in-vitro laboratory research and is not intended for human or veterinary use, consumption, or therapeutic application.',
	},
	{
		question: 'How fast do orders ship once checkout is live?',
		answer:
			'Orders placed before our daily cutoff are dispatched the same day from our U.S. facility, with tracking provided on every shipment.',
	},
	{
		question: 'Do you ship internationally?',
		answer:
			'At launch we will be shipping within the United States only. International shipping is on our roadmap — join our contact list to be notified when it opens.',
	},
	{
		question: 'Can I request the COA for a specific batch or lot number?',
		answer:
			'Yes. Every COA is tied to a batch number listed on the vial label. Reach out with your batch number and we will send the matching documentation directly.',
	},
	{
		question: 'What payment methods will you accept?',
		answer:
			'Checkout is still launching soon, so full payment details aren’t published yet. We will support standard card payment at launch — contact us if you have a specific method you need supported.',
	},
];
