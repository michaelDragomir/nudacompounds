-- Orders placed via Stripe Checkout.
-- Security posture: identical to contact_submissions — RLS enabled, NO
-- policies for any role. Only the service_role key (used inside the Stripe
-- webhook handler and the order-confirmation page) can read or write these
-- tables. The public/anon key cannot see a single row in either direction.

create extension if not exists pgcrypto;

-- Backs the human-readable order_number below (e.g. NUDA-000001). Separate
-- from Stripe's own IDs — this is ours, for support/customer-facing use.
create sequence if not exists public.order_number_seq;

create table if not exists public.orders (
	id uuid primary key default gen_random_uuid(),
	order_number text not null unique
		default ('NUDA-' || lpad(nextval('public.order_number_seq')::text, 6, '0')),
	stripe_session_id text not null unique,
	stripe_payment_intent_id text,
	status text not null default 'pending'
		check (status in ('pending', 'paid', 'failed', 'refunded')),
	customer_email text not null,
	customer_name text,
	subtotal integer not null,
	total integer not null,
	currency text not null default 'usd',
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);

create index if not exists orders_customer_email_idx
	on public.orders (customer_email);

create index if not exists orders_created_at_idx
	on public.orders (created_at desc);

create table if not exists public.order_items (
	id uuid primary key default gen_random_uuid(),
	order_id uuid not null references public.orders (id) on delete cascade,
	product_slug text not null,
	product_name text not null,
	is_bulk boolean not null default false,
	quantity integer not null,
	unit_price integer not null,
	line_total integer not null,
	created_at timestamptz not null default now()
);

create index if not exists order_items_order_id_idx
	on public.order_items (order_id);

alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Intentionally no CREATE POLICY statements — see header comment.
