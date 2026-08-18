import type { Metadata } from 'next';
import Link from 'next/link';
import { getSupabaseAdmin } from '../../lib/supabaseAdmin';
import { OrderConfirmedEffects } from '../../components/OrderConfirmedEffects';

export const metadata: Metadata = {
	title: 'Order Confirmed',
	robots: { index: false, follow: false },
};

function formatCents(cents: number) {
	return (cents / 100).toFixed(2);
}

type OrderSummary = {
	id: string;
	order_number: string;
	customer_email: string;
	total: number;
};

type ItemSummary = {
	product_slug: string;
	product_name: string;
	quantity: number;
	unit_price: number;
	line_total: number;
	is_bulk: boolean;
};

export default async function OrderConfirmedPage({
	searchParams,
}: {
	searchParams: Promise<{ session_id?: string }>;
}) {
	const { session_id: sessionId } = await searchParams;

	let order: OrderSummary | null = null;
	let items: ItemSummary[] = [];

	if (sessionId) {
		const supabase = getSupabaseAdmin();
		const { data: orderRow } = await supabase
			.from('orders')
			.select('id, order_number, customer_email, total')
			.eq('stripe_session_id', sessionId)
			.maybeSingle();

		if (orderRow) {
			order = orderRow;
			const { data: itemRows } = await supabase
				.from('order_items')
				.select('product_slug, product_name, quantity, unit_price, line_total, is_bulk')
				.eq('order_id', orderRow.id);
			items = itemRows || [];
		}
	}

	return (
		<div className='bg-offwhite py-24'>
			<div className='mx-auto max-w-2xl px-6'>
				<OrderConfirmedEffects order={order} items={items} />

				{!sessionId ? (
					<div className='rounded-2xl border border-amber/50 bg-white p-10 text-center shadow-xl'>
						<h1 className='font-sora text-2xl font-extrabold text-navy'>
							No order found
						</h1>
						<p className='mt-3 text-charcoal/75'>
							We couldn&apos;t find an order to confirm. If you just completed a
							purchase, check your email for a receipt, or{' '}
							<Link
								href='/contact'
								className='font-semibold text-amber-dark transition-colors hover:text-amber'
							>
								contact us
							</Link>
							.
						</p>
					</div>
				) : !order ? (
					<div className='rounded-2xl border border-amber/50 bg-white p-10 text-center shadow-xl'>
						<h1 className='font-sora text-2xl font-extrabold text-navy'>
							Finalizing your order&hellip;
						</h1>
						<p className='mt-3 text-charcoal/75'>
							This usually only takes a few seconds. This page will refresh
							automatically — if it doesn&apos;t update shortly, check your
							email for a confirmation, or{' '}
							<Link
								href='/contact'
								className='font-semibold text-amber-dark transition-colors hover:text-amber'
							>
								contact us
							</Link>{' '}
							with your order details.
						</p>
					</div>
				) : (
					<div className='rounded-2xl border border-amber/50 bg-white p-10 shadow-xl'>
						<div className='text-center'>
							<p className='text-xs font-bold uppercase tracking-[0.2em] text-amber-dark'>
								Order Confirmed
							</p>
							<h1 className='mt-2 font-sora text-3xl font-extrabold text-navy'>
								Thank you for your order!
							</h1>
							<p className='mt-3 text-charcoal/75'>
								A confirmation email has been sent to{' '}
								<span className='font-semibold text-navy'>
									{order.customer_email}
								</span>
							</p>
						</div>

						<div className='mt-8 rounded-xl border border-black/5 bg-offwhite p-5'>
							<div className='flex items-center justify-between text-sm'>
								<span className='font-bold uppercase tracking-wide text-navy'>
									Order Number
								</span>
								<span className='font-mono font-bold text-navy'>
									{order.order_number}
								</span>
							</div>
						</div>

						<ul className='mt-6 divide-y divide-black/5'>
							{items.map((item, index) => (
								<li
									key={index}
									className='flex items-center justify-between py-3 text-sm'
								>
									<div>
										<p className='font-semibold text-navy'>
											{item.product_name}
										</p>
										<p className='text-charcoal/60'>
											Qty {item.quantity}
											{item.is_bulk ? ' (kit)' : ''}
										</p>
									</div>
									<span className='font-bold text-navy'>
										${formatCents(item.line_total)}
									</span>
								</li>
							))}
						</ul>

						<div className='mt-4 flex items-center justify-between border-t border-black/10 pt-4'>
							<span className='text-sm font-bold uppercase tracking-wide text-navy'>
								Total
							</span>
							<span className='text-xl font-bold text-amber-dark'>
								${formatCents(order.total)}
							</span>
						</div>

						<div className='mt-8 text-center'>
							<Link
								href='/catalog'
								className='inline-block rounded-2xl bg-amber px-8 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-amber-dark'
							>
								Continue shopping
							</Link>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
