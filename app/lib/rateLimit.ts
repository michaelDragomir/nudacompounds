// In-memory, best-effort rate limiting keyed by client IP. This resets on
// cold start and isn't shared across concurrent serverless instances, so it
// won't stop a truly distributed attack — but it does stop the common case
// of a single script hammering an endpoint in a loop, which is what these
// routes actually need protection from. If abuse becomes a real problem,
// upgrade to a shared store (e.g. Vercel KV / Upstash) using the same
// interface.

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export function rateLimit(
	key: string,
	limit: number,
	windowMs: number,
): { allowed: boolean; retryAfterSeconds: number } {
	const now = Date.now();
	const bucket = buckets.get(key);

	if (!bucket || now > bucket.resetAt) {
		buckets.set(key, { count: 1, resetAt: now + windowMs });
		return { allowed: true, retryAfterSeconds: 0 };
	}

	if (bucket.count >= limit) {
		return {
			allowed: false,
			retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000),
		};
	}

	bucket.count += 1;
	return { allowed: true, retryAfterSeconds: 0 };
}

export function getClientIp(request: Request): string {
	const forwardedFor = request.headers.get('x-forwarded-for');
	if (forwardedFor) return forwardedFor.split(',')[0].trim();
	return request.headers.get('x-real-ip') || 'unknown';
}
