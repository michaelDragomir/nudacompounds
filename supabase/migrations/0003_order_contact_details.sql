-- Shipping address and phone, now that /api/checkout collects both via
-- Stripe's shipping_address_collection and phone_number_collection.
--
-- customer_address is required at the application layer (the webhook always
-- populates it, since Checkout always collects it) but left nullable here
-- rather than NOT NULL, so this migration doesn't fail against any order
-- rows that were written before this column existed.

alter table public.orders
	add column if not exists customer_address text,
	add column if not exists customer_phone text;
