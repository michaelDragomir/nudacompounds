// Every order includes one complimentary vial of this product. Shared
// between the cart (client) and the checkout route (server) so both agree
// on which slug is eligible for the free-gift price override.
export const FREE_GIFT_SLUG = 'bac-water';

// Orders below this subtotal (paid items only, not the free BAC Water gift)
// are charged flat-rate standard shipping; at or above it, standard shipping
// is free. Shared between the cart drawer, checkout page, and the Stripe
// session (server) so the displayed threshold always matches what's charged.
export const FREE_SHIPPING_THRESHOLD = 100;
export const STANDARD_SHIPPING_COST = 10;

// BAC Water ships as individual 3mL vials, but every group of 3 vials
// ordered — across the whole cart, any product, not just BAC Water itself —
// ships with one 10mL BAC Water vial instead of a 3mL one. Same price
// either way, just more solvent for a bigger order. `totalQty` is the total
// vial count of the order (see CartDrawer's totalOrderVials).
export function bacWaterSizeLabel(totalQty: number): string {
	const tenMlCount = Math.floor(totalQty / 3);
	// Any leftover of 1 or 2 vials still just ships with a single 3mL vial —
	// it doesn't scale 1:1 with the remainder.
	const hasThreeMlLeftover = totalQty % 3 > 0;

	if (tenMlCount === 0) return '3mL vial';
	if (!hasThreeMlLeftover) {
		return tenMlCount === 1 ? '10mL vial' : `${tenMlCount}× 10mL vial`;
	}
	return `${tenMlCount}× 10mL vial + 1× 3mL vial`;
}
