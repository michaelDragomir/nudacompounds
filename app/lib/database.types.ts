// Hand-written until we wire up `supabase gen types typescript` against the
// linked project. Keep this in sync with supabase/migrations/*.sql.
export type Database = {
	public: {
		Tables: {
			contact_submissions: {
				Row: {
					id: string;
					name: string;
					email: string;
					subject: string;
					message: string;
					created_at: string;
				};
				Insert: {
					id?: string;
					name: string;
					email: string;
					subject: string;
					message: string;
					created_at?: string;
				};
				Update: {
					id?: string;
					name?: string;
					email?: string;
					subject?: string;
					message?: string;
					created_at?: string;
				};
				Relationships: [];
			};
			orders: {
				Row: {
					id: string;
					order_number: string;
					stripe_session_id: string;
					stripe_payment_intent_id: string | null;
					status: 'pending' | 'paid' | 'failed' | 'refunded';
					customer_email: string;
					customer_name: string | null;
					customer_address: string | null;
					customer_phone: string | null;
					subtotal: number;
					total: number;
					currency: string;
					created_at: string;
					updated_at: string;
				};
				Insert: {
					id?: string;
					order_number?: string;
					stripe_session_id: string;
					stripe_payment_intent_id?: string | null;
					status?: 'pending' | 'paid' | 'failed' | 'refunded';
					customer_email: string;
					customer_name?: string | null;
					// Required at the application layer — Checkout always
					// collects it, so the webhook must always supply it.
					customer_address: string;
					customer_phone?: string | null;
					subtotal: number;
					total: number;
					currency?: string;
					created_at?: string;
					updated_at?: string;
				};
				Update: {
					id?: string;
					order_number?: string;
					stripe_session_id?: string;
					stripe_payment_intent_id?: string | null;
					status?: 'pending' | 'paid' | 'failed' | 'refunded';
					customer_email?: string;
					customer_name?: string | null;
					customer_address?: string | null;
					customer_phone?: string | null;
					subtotal?: number;
					total?: number;
					currency?: string;
					created_at?: string;
					updated_at?: string;
				};
				Relationships: [];
			};
			order_items: {
				Row: {
					id: string;
					order_id: string;
					product_slug: string;
					product_name: string;
					is_bulk: boolean;
					quantity: number;
					unit_price: number;
					line_total: number;
					created_at: string;
				};
				Insert: {
					id?: string;
					order_id: string;
					product_slug: string;
					product_name: string;
					is_bulk?: boolean;
					quantity: number;
					unit_price: number;
					line_total: number;
					created_at?: string;
				};
				Update: {
					id?: string;
					order_id?: string;
					product_slug?: string;
					product_name?: string;
					is_bulk?: boolean;
					quantity?: number;
					unit_price?: number;
					line_total?: number;
					created_at?: string;
				};
				Relationships: [
					{
						foreignKeyName: 'order_items_order_id_fkey';
						columns: ['order_id'];
						referencedRelation: 'orders';
						referencedColumns: ['id'];
					},
				];
			};
		};
		Views: Record<string, never>;
		Functions: Record<string, never>;
		Enums: Record<string, never>;
		CompositeTypes: Record<string, never>;
	};
};
