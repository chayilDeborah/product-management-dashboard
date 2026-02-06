export interface Category {
	id: number;
	name: string;
	slug?: string;
	status?: string;
	created_at?: string;
}

export interface Product {
	id: number;
	name: string;
	description: string;
	price: number;
	category: string;
	stock: number;
	status: string;
	image?: string;
	created_at?: string;
}

export interface ProductFormData {
	name: string;
	description: string;
	price: number;
	category: string;
	stock: number;
	status: string;
	image?: string;
}

export interface ProductsResponse {
	data: Product[];
	total: number;
	page: number;
	limit: number;
}
