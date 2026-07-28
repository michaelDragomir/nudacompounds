'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';

const CONTACT_EMAIL = 'hello@nudacompounds.com';

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
				throw new Error(data?.error || 'Something went wrong. Please try again.');
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
					<div>
						<div className='mb-4 flex items-center gap-3'>
							<span className='h-px w-8 bg-amber' />
							<span className='text-xs font-bold uppercase tracking-[0.2em] text-navy'>
								Contact
							</span>
						</div>
						<h2 className='font-display text-4xl font-bold leading-tight text-navy'>
							Get in touch
						</h2>
						<p className='mt-4 max-w-md leading-relaxed text-charcoal/75 tracking-wide'>
							Questions about products, orders, or research applications? Send
							us a note and we&apos;ll get back within one business day.
						</p>

						<div className='mt-10 space-y-6'>
							<div>
								<div className='text-xs font-bold uppercase tracking-[0.2em] text-warmgray'>
									Email
								</div>
								<a
									href={`mailto:${CONTACT_EMAIL}`}
									className='mt-1 inline-block font-semibold text-navy hover:text-amber-dark transition-colors'
								>
									{CONTACT_EMAIL}
								</a>
							</div>
							<div>
								<div className='text-xs font-bold uppercase tracking-[0.2em] text-warmgray'>
									Hours
								</div>
								<div className='mt-1 font-semibold text-navy'>
									Monday — Friday, 9am – 5pm PT
								</div>
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
										className='mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-navy placeholder:text-warmgray focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/30'
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
										className='mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-navy placeholder:text-warmgray focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/30'
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
										className='mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-navy placeholder:text-warmgray focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/30'
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
										className='mt-2 w-full resize-y rounded-xl border border-black/10 bg-white px-4 py-3 text-navy placeholder:text-warmgray focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/30'
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
