import { Product, ProductFormData, Category } from "@/types/product";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const headers: Record<string, string> = {
	apikey: SUPABASE_KEY,
	Authorization: `Bearer ${SUPABASE_KEY}`,
	"Content-Type": "application/json",
	Prefer: "return=representation",
};

export const categoriesApi = {
	getAll: async (): Promise<Category[]> => {
		const response = await fetch(
			`${SUPABASE_URL}/rest/v1/categories?select=*`,
			{
				headers,
			},
		);
		if (!response.ok) throw new Error("Failed to fetch categories");
		return response.json();
	},

	create: async (data: { name: string; slug: string }): Promise<Category> => {
		const response = await fetch(`${SUPABASE_URL}/rest/v1/categories`, {
			method: "POST",
			headers,
			body: JSON.stringify({ ...data, status: "active" }),
		});
		if (!response.ok) throw new Error("Failed to create category");
		const result = await response.json();
		return result[0];
	},
};

export interface PaginatedResponse<T> {
	data: T[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}

export const productsApi = {
	getAll: async (params?: {
		page?: number;
		limit?: number;
		search?: string;
		category?: string;
	}): Promise<PaginatedResponse<Product>> => {
		const page = params?.page || 1;
		const limit = params?.limit || 12;
		let url = `${SUPABASE_URL}/rest/v1/products?select=*`;

		if (params?.search) {
			url += `&name=ilike.*${params.search}*`;
		}
		if (params?.category) {
			url += `&category=ilike.*${params.category}*`;
		}

		const offset = (page - 1) * limit;
		url += `&limit=${limit}&offset=${offset}`;
		url += `&order=created_at.desc`;

		const response = await fetch(url, {
			headers: {
				...headers,
				Prefer: "count=exact",
			},
		});
		if (!response.ok) throw new Error("Failed to fetch products");

		const contentRange = response.headers.get("content-range");
		let total = 0;
		if (contentRange) {
			const match = contentRange.match(/\/(\d+)/);
			if (match) total = parseInt(match[1], 10);
		}

		const data: Product[] = await response.json();

		return {
			data,
			total,
			page,
			limit,
			totalPages: Math.ceil(total / limit),
		};
	},

	getById: async (id: number): Promise<Product> => {
		const response = await fetch(
			`${SUPABASE_URL}/rest/v1/products?id=eq.${id}&select=*`,
			{ headers },
		);
		if (!response.ok) throw new Error("Failed to fetch product");
		const data = await response.json();
		return data[0];
	},

	create: async (data: ProductFormData): Promise<Product> => {
		const response = await fetch(`${SUPABASE_URL}/rest/v1/products`, {
			method: "POST",
			headers,
			body: JSON.stringify(data),
		});
		if (!response.ok) throw new Error("Failed to create product");
		const result = await response.json();
		return result[0];
	},

	update: async (id: number, data: ProductFormData): Promise<Product> => {
		const response = await fetch(
			`${SUPABASE_URL}/rest/v1/products?id=eq.${id}`,
			{
				method: "PATCH",
				headers,
				body: JSON.stringify(data),
			},
		);
		if (!response.ok) throw new Error("Failed to update product");
		const result = await response.json();
		return result[0];
	},

	delete: async (id: number): Promise<void> => {
		const response = await fetch(
			`${SUPABASE_URL}/rest/v1/products?id=eq.${id}`,
			{
				method: "DELETE",
				headers,
			},
		);
		if (!response.ok) throw new Error("Failed to delete product");
	},
};
