import 'server-only';

import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// Service-role client — bypasses Row Level Security entirely. Only ever
// import this from server-side code (route handlers, server actions).
// The `server-only` import above makes any accidental client-bundle
// usage a build-time error rather than a runtime secret leak.
let cachedClient: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabaseAdmin() {
	if (cachedClient) return cachedClient;

	const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

	if (!url || !serviceRoleKey) {
		throw new Error(
			'Supabase admin client is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.',
		);
	}

	cachedClient = createClient<Database>(url, serviceRoleKey, {
		auth: {
			autoRefreshToken: false,
			persistSession: false,
		},
	});

	return cachedClient;
}
