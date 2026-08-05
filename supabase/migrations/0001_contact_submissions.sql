-- Contact form submissions.
-- Security posture: RLS is enabled and NO policies are defined for any role
-- (anon or authenticated). This makes the table completely inaccessible via
-- the publishable (anon) key, from the browser, in both directions.
-- The only way in or out is the service_role key, used exclusively inside
-- app/lib/supabaseAdmin.ts on the server (app/api/contact/route.ts).

create extension if not exists pgcrypto;

create table if not exists public.contact_submissions (
	id uuid primary key default gen_random_uuid(),
	name text not null,
	email text not null,
	subject text not null,
	message text not null,
	created_at timestamptz not null default now()
);

create index if not exists contact_submissions_created_at_idx
	on public.contact_submissions (created_at desc);

alter table public.contact_submissions enable row level security;

-- Intentionally no CREATE POLICY statements. Enabling RLS with zero policies
-- denies all access by default for anon/authenticated roles; only
-- service_role (which bypasses RLS) can read or write.
