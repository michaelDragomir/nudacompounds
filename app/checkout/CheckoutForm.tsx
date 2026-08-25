'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
	BillingAddressElement,
	ContactDetailsElement,
	PaymentElement,
	ShippingAddressElement,
	useCheckoutElements,
} from '@stripe/react-stripe-js/checkout';
import { LockIcon } from '../components/icons';
import { SITE_URL } from '../lib/site';

export function CheckoutForm() {
	const router = useRouter();
	const result = useCheckoutElements();
	const [consent, setConsent] = useState(false);
	const [phone, setPhone] = useState('');
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [shippingOpen, setShippingOpen] = useState(false);

	if (result.type === 'loading') {
		return (
			<div className='flex min-h-[50vh] items-center justify-center bg-offwhite'>
				<p className='text-sm text-charcoal/60'>Loading checkout&hellip;</p>
			</div>
		);
	}

	if (result.type === 'error') {
		return (
			<div className='flex min-h-[50vh] flex-col items-center justify-center gap-2 bg-offwhite text-center'>
				<p className='text-sm font-semibold text-red-500'>
					{result.error.message}
				</p>
			</div>
		);
	}

	const { checkout } = result;

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!consent) {
			setError('Please confirm the research-use-only agreement to continue.');
			return;
		}
		setError(null);
		setSubmitting(true);

		const validation = await checkout.validateElements();
		if (validation.type === 'error') {
			setError(validation.error.message);
			setSubmitting(false);
			return;
		}

		const confirmResult = await checkout.confirm({
			returnUrl: `${SITE_URL}/order/confirmed?session_id={CHECKOUT_SESSION_ID}`,
			...(phone.trim() ? { phoneNumber: phone.trim() } : {}),
		});

		if (confirmResult.type === 'error') {
			setError(confirmResult.error.message);
			setSubmitting(false);
			return;
		}

		router.push(`/order/confirmed?session_id=${checkout.id}`);
	}

	return (
		<div className='bg-offwhite py-16'>
			<div className='mx-auto max-w-3xl px-6'>
				<div className='text-center mt-8'>
					<p className='text-xs font-bold uppercase tracking-[0.3em] text-amber-dark'>
						Secure Checkout
					</p>
					<h1 className='mt-2 font-sora text-3xl font-extrabold text-navy sm:text-4xl tracking-widest'>
						Checkout
					</h1>
					<p className='mt-2 flex items-center justify-center gap-1.5 text-xs text-charcoal/50'>
						<LockIcon className='h-3.5 w-3.5' />
						256-bit SSL &middot; Secure payment
					</p>
					<p className='mt-2 flex items-center justify-center gap-1.5 text-xs text-charcoal/60'>
						For laboratory research use only. Not for human or veterinary use.
					</p>
				</div>

				<div className='mt-10 rounded-2xl border border-amber/30 bg-white p-6 shadow-xl'>
					<div className='flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-charcoal/60'>
						Order Summary
					</div>
					<ul className='mt-4 divide-y divide-black/5'>
						{[...checkout.lineItems]
							.sort(
								(a, b) =>
									Number(a.total.minorUnitsAmount === 0) -
									Number(b.total.minorUnitsAmount === 0),
							)
							.map((item) => (
								<li
									key={item.id}
									className='flex items-center justify-between py-3 text-sm tracking-wider'
								>
									<span className='text-navy'>
										{item.name}
										{item.quantity > 1 ? ` × ${item.quantity}` : ''}
									</span>
									<span className='font-bold text-amber-dark'>
										{item.total.minorUnitsAmount === 0
											? 'Free'
											: item.total.amount}
									</span>
								</li>
							))}
					</ul>

					{checkout.shippingOptions.length > 0 && (
						<div className='border-t border-black/5 py-3'>
							<button
								type='button'
								onClick={() => setShippingOpen((open) => !open)}
								className='flex w-full items-center justify-between text-sm'
							>
								<span className='flex items-center gap-2 text-navy'>
									<span className='h-1.5 w-1.5 rounded-full bg-amber' />
									Shipping
									<span
										className={`text-charcoal/40 transition-transform ${shippingOpen ? 'rotate-180' : ''}`}
									>
										&#9662;
									</span>
								</span>
								<span className='flex items-center gap-2'>
									{checkout.shipping &&
										checkout.shipping.shippingOption.minorUnitsAmount === 0 && (
											<span className='text-charcoal/30 line-through'>
												{
													checkout.shippingOptions.find(
														(o) => o.minorUnitsAmount > 0,
													)?.amount
												}
											</span>
										)}
									<span className='font-bold text-amber-dark'>
										{checkout.shipping?.shippingOption.minorUnitsAmount === 0
											? 'Free'
											: checkout.shipping?.shippingOption.amount}
									</span>
								</span>
							</button>

							{shippingOpen && (
								<div className='mt-3 space-y-2'>
									{checkout.shippingOptions.map((option) => {
										const selected =
											checkout.shipping?.shippingOption.id === option.id;
										return (
											<label
												key={option.id}
												className='flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-black/10 px-3 py-2.5 text-sm'
											>
												<span className='flex items-center gap-2 text-navy'>
													<input
														type='radio'
														name='shippingOption'
														checked={selected}
														onChange={() =>
															checkout.updateShippingOption(option.id)
														}
														className='h-4 w-4 accent-amber'
													/>
													{option.displayName}
													{option.deliveryEstimate?.minimum &&
														option.deliveryEstimate?.maximum && (
															<span className='text-xs text-charcoal/40'>
																est.{' '}
																{option.deliveryEstimate.minimum.value}–
																{option.deliveryEstimate.maximum.value} days
															</span>
														)}
												</span>
												<span className='font-bold text-amber-dark'>
													{option.minorUnitsAmount === 0
														? 'Free'
														: `+${option.amount}`}
												</span>
											</label>
										);
									})}
								</div>
							)}
						</div>
					)}

					<div className='mt-4 flex items-center justify-between border-t border-black/10 pt-4'>
						<span className='text-sm font-bold uppercase tracking-wide text-navy'>
							Total
						</span>
						<span className='text-xl font-bold text-amber-dark'>
							{checkout.total.total.amount}
						</span>
					</div>
				</div>

				<form onSubmit={handleSubmit} className='mt-6 space-y-6'>
					<div className='rounded-2xl border border-amber/30 bg-white p-6 shadow-xl'>
						<p className='flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-charcoal/60'>
							Shipping Address
						</p>
						<div className='mt-4'>
							<ShippingAddressElement
								options={{ contacts: [], display: { name: 'split' } }}
							/>
							<p className='mt-1.5 text-xs text-charcoal/50'>
								We currently ship within the United States only.
							</p>
						</div>

						<p className='mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-charcoal/60'>
							Contact
						</p>
						<div className='mt-4'>
							<ContactDetailsElement />
						</div>

						<div className='mt-4'>
							<label
								htmlFor='phone'
								className='text-[11px] font-bold uppercase tracking-wide text-charcoal/60'
							>
								Phone Number (Optional)
							</label>
							<input
								id='phone'
								type='tel'
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								placeholder='(555) 000-0000'
								className='mt-1.5 w-full rounded-lg border border-black/10 bg-transparent px-3 py-2.5 text-sm text-navy placeholder:text-charcoal/30 focus:border-amber-dark focus:outline-none'
							/>
							<p className='mt-1.5 text-xs text-charcoal/50'>
								We may need to contact you regarding your order.
							</p>
						</div>
					</div>

					<div className='rounded-2xl border border-amber/30 bg-white p-6 shadow-xl'>
						<p className='flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-charcoal/60'>
							Billing Address
						</p>
						<div className='mt-4'>
							<BillingAddressElement
								options={{ contacts: [], display: { name: 'split' } }}
							/>
						</div>
					</div>

					<label className='flex items-start gap-3 rounded-2xl border border-amber/30 bg-white p-5 text-sm text-charcoal/80 shadow-xl'>
						<input
							type='checkbox'
							checked={consent}
							onChange={(e) => setConsent(e.target.checked)}
							className='mt-0.5 h-4 w-4 accent-amber'
						/>
						<span>
							<span className='font-bold uppercase tracking-wide text-amber-dark'>
								Research use only &middot; Required
							</span>
							<br />I am 21+ and confirm these compounds are for in-vitro
							laboratory research only — not for human or veterinary use. See
							our{' '}
							<a
								href='/research-use-only'
								target='_blank'
								className='underline hover:text-amber-dark'
							>
								Research Use Only
							</a>{' '}
							page.
						</span>
					</label>

					<div className='rounded-2xl border border-amber/30 bg-white p-6 shadow-xl'>
						<div className='flex items-center justify-between'>
							<p className='flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-charcoal/60'>
								Payment
							</p>
							<span className='flex items-center gap-1.5 text-[11px] text-charcoal/40'>
								<LockIcon className='h-3 w-3' />
								Secured by Stripe &middot; 256-bit SSL
							</span>
						</div>
						<div className='mt-4'>
							<PaymentElement options={{ layout: 'tabs' }} />
						</div>
					</div>

					{error && (
						<p className='text-center text-sm font-medium text-red-500'>
							{error}
						</p>
					)}

					<button
						type='submit'
						disabled={!checkout.canConfirm || submitting}
						className='flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-amber px-4 py-4 text-sm font-bold uppercase tracking-widest text-navy-dark transition-colors hover:bg-amber-dark disabled:cursor-not-allowed disabled:bg-amber/40 disabled:text-navy-dark/50'
					>
						<LockIcon className='h-4 w-4' />
						{submitting ? 'Processing…' : 'Secure Payment'}
					</button>
				</form>
			</div>
		</div>
	);
}
