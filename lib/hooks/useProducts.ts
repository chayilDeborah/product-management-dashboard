import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { productsApi, categoriesApi } from "@/lib/api/products";
import { ProductFormData } from "@/types/product";

export function useCategories() {
	return useQuery({
		queryKey: ["categories"],
		queryFn: () => categoriesApi.getAll(),
	});
}

export function useCreateCategory() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: { name: string; slug: string }) =>
			categoriesApi.create(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		},
	});
}

export function useProducts(params?: {
	page?: number;
	limit?: number;
	search?: string;
	category?: string;
}) {
	return useQuery({
		queryKey: ["products", params],
		queryFn: () => productsApi.getAll(params),
	});
}

export function useProduct(id: number) {
	return useQuery({
		queryKey: ["products", id],
		queryFn: () => productsApi.getById(id),
		enabled: !!id,
	});
}

export function useCreateProduct() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: ProductFormData) => productsApi.create(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
	});
}

export function useUpdateProduct() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }: { id: number; data: ProductFormData }) =>
			productsApi.update(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
	});
}

export function useDeleteProduct() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: number) => productsApi.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
	});
}
