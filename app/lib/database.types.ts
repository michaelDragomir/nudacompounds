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
		};
		Views: Record<string, never>;
		Functions: Record<string, never>;
		Enums: Record<string, never>;
		CompositeTypes: Record<string, never>;
	};
};
