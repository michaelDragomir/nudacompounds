import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getSupabaseAdmin } from '../../lib/supabaseAdmin';
import { getClientIp, rateLimit } from '../../lib/rateLimit';

const FROM_ADDRESS = 'Nuda Compounds <hello@nudacompounds.com>';
const TO_ADDRESS = process.env.CONTACT_EMAIL || 'hello@nudacompounds.com';

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;

export async function POST(request: Request) {
	const ip = getClientIp(request);
	const { allowed, retryAfterSeconds } = rateLimit(
		`contact:${ip}`,
		RATE_LIMIT,
		RATE_WINDOW_MS,
	);
	if (!allowed) {
		return NextResponse.json(
			{ error: 'Too many requests. Please try again shortly.' },
			{ status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } },
		);
	}

	const apiKey = process.env.RESEND_API_KEY;
	if (!apiKey) {
		console.error('RESEND_API_KEY is not set');
		return NextResponse.json(
			{ error: 'Email service is not configured.' },
			{ status: 500 },
		);
	}

	let body: { name?: string; email?: string; subject?: string; message?: string };
	try {
		body = await request.json();
	} catch {
		return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
	}

	const { name, email, subject, message } = body;

	if (!name || !email || !subject || !message) {
		return NextResponse.json(
			{ error: 'Name, email, subject, and message are all required.' },
			{ status: 400 },
		);
	}

	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailPattern.test(email)) {
		return NextResponse.json(
			{ error: 'Please provide a valid email address.' },
			{ status: 400 },
		);
	}

	try {
		const supabase = getSupabaseAdmin();
		const { error: dbError } = await supabase
			.from('contact_submissions')
			.insert({ name, email, subject, message });

		if (dbError) {
			console.error('Supabase insert error:', dbError);
		}
	} catch (err) {
		console.error('Supabase insert failed:', err);
	}

	const resend = new Resend(apiKey);

	try {
		const { error } = await resend.emails.send({
			from: FROM_ADDRESS,
			to: TO_ADDRESS,
			replyTo: email,
			subject: `[Contact Form] ${subject}`,
			text: `New message from the Nuda Compounds contact form.

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}`,
		});

		if (error) {
			console.error('Resend error:', error);
			return NextResponse.json(
				{ error: 'Failed to send message. Please try again later.' },
				{ status: 502 },
			);
		}

		return NextResponse.json({ success: true });
	} catch (err) {
		console.error('Contact form send failed:', err);
		return NextResponse.json(
			{ error: 'Failed to send message. Please try again later.' },
			{ status: 500 },
		);
	}
}
