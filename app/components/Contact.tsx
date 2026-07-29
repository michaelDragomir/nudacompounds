'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { ClockIcon, MailIcon, PhoneIcon } from './icons';

const CONTACT_EMAIL = 'hello@nudacompounds.com';
// Placeholder contact details — swap in the real phone/orders inbox when available.
const CONTACT_PHONE = '(555) 123-4567';
const ORDERS_EMAIL = 'orders@nudacompounds.com';

export function Contact() {
	const [submitted, setSubmitted] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError(null);
		setSubmitting(true);

		const formData = new FormData(event.currentTarget);
		const payload = {
			name: formData.get('name'),
			email: formData.get('email'),
			subject: formData.get('subject'),
			message: formData.get('message'),
		};

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				const data = await response.json().catch(() => null);
				throw new Error(
					data?.error || 'Something went wrong. Please try again.',
				);
			}

			setSubmitted(true);
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: 'Something went wrong. Please try again.',
			);
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<section id='contact' className='bg-offwhite py-24'>
			<div className='mx-auto max-w-6xl px-6'>
				<div className='grid grid-cols-1 gap-16 lg:grid-cols-2'>
					<div className='rounded-2xl bg-white p-8 border border-amber shadow-xl'>
						<span className='text-xs font-bold uppercase tracking-[0.2em] text-navy-dark'>
							Contact Information
						</span>

						<div className='mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2'>
							<div>
								<div className='flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-navy-dark/50'>
									<PhoneIcon className='h-4 w-4 text-amber' />
									Call or Text
								</div>
								<div className='mt-1 font-semibold text-navy-dark'>
									{CONTACT_PHONE}
								</div>
							</div>

							<div>
								<div className='flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-navy-dark/50'>
									<ClockIcon className='h-4 w-4 text-amber' />
									Hours
								</div>
								<div className='mt-1 font-semibold text-navy-dark'>
									Mon–Sat 9:00 AM – 5:00 PM MST
									<br />
									Closed Sunday
								</div>
							</div>

							<div>
								<div className='flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-navy-dark/50'>
									<MailIcon className='h-4 w-4 text-amber' />
									Support
								</div>
								<a
									href={`mailto:${CONTACT_EMAIL}`}
									className='mt-1 inline-block break-all font-semibold text-navy-dark transition-colors hover:text-amber'
								>
									{CONTACT_EMAIL}
								</a>
							</div>

							<div>
								<div className='flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-navy-dark/50'>
									<MailIcon className='h-4 w-4 text-amber' />
									Orders
								</div>
								<a
									href={`mailto:${ORDERS_EMAIL}`}
									className='mt-1 inline-block break-all font-semibold text-navy-dark transition-colors hover:text-amber'
								>
									{ORDERS_EMAIL}
								</a>
							</div>
						</div>
					</div>

					<div>
						{submitted ? (
							<div className='flex h-full flex-col items-center justify-center rounded-2xl border border-black/5 bg-white px-8 py-16 text-center'>
								<h3 className='text-xl font-bold text-navy'>Message sent</h3>
								<p className='mt-2 max-w-sm text-sm leading-relaxed text-charcoal/75'>
									Thanks for reaching out — a member of our team will reply to
									your email within one business day.
								</p>
							</div>
						) : (
							<form onSubmit={handleSubmit} className='space-y-6'>
								<div>
									<label
										htmlFor='contact-name'
										className='text-xs font-bold uppercase tracking-[0.2em] text-navy'
									>
										Name
									</label>
									<input
										id='contact-name'
										name='name'
										type='text'
										required
										className='mt-2 w-full rounded-xl border border-black/20 bg-white px-4 py-3 text-navy placeholder:text-warmgray focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/30 '
									/>
								</div>

								<div>
									<label
										htmlFor='contact-email'
										className='text-xs font-bold uppercase tracking-[0.2em] text-navy'
									>
										Email
									</label>
									<input
										id='contact-email'
										name='email'
										type='email'
										required
										className='mt-2 w-full rounded-xl border border-black/20 bg-white px-4 py-3 text-navy placeholder:text-warmgray focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/30'
									/>
								</div>

								<div>
									<label
										htmlFor='contact-subject'
										className='text-xs font-bold uppercase tracking-[0.2em] text-navy'
									>
										Subject
									</label>
									<input
										id='contact-subject'
										name='subject'
										type='text'
										required
										className='mt-2 w-full rounded-xl border border-black/20 bg-white px-4 py-3 text-navy placeholder:text-warmgray focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/30'
									/>
								</div>

								<div>
									<label
										htmlFor='contact-message'
										className='text-xs font-bold uppercase tracking-[0.2em] text-navy'
									>
										Message
									</label>
									<textarea
										id='contact-message'
										name='message'
										rows={6}
										required
										className='mt-2 w-full resize-y rounded-xl border border-black/20 bg-white px-4 py-3 text-navy placeholder:text-warmgray focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/30'
									/>
								</div>

								{error && (
									<p className='text-sm font-medium text-red-600'>{error}</p>
								)}

								<button
									type='submit'
									disabled={submitting}
									className='cursor-pointer rounded-xl bg-navy px-6 py-3 text-sm font-bold text-offwhite transition-colors hover:bg-navy-dark disabled:cursor-not-allowed disabled:opacity-60'
								>
									{submitting ? 'Sending…' : 'Send message'}
								</button>
							</form>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
