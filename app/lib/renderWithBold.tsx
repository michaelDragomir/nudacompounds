// Minimal inline markup: **text** renders as bold. Lets product copy mark up
// specific phrases without needing structured/rich-text fields per product.
export function renderWithBold(text: string) {
	const parts = text.split(/\*\*(.+?)\*\*/g);
	return parts.map((part, index) =>
		index % 2 === 1 ? <strong key={index}>{part}</strong> : part,
	);
}
