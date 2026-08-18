-- Refund webhook handling looks up orders by stripe_payment_intent_id
-- (Stripe's charge.refunded event carries the payment intent, not the
-- checkout session id), so this needs its own index.

create index if not exists orders_stripe_payment_intent_id_idx
	on public.orders (stripe_payment_intent_id);
