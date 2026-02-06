"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, Plus, Grid3x3, List, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/products/product-card";
import { ProductForm } from "@/components/products/product-form";
import { DeleteConfirmation } from "@/components/products/delete-confirmation";
import { ProductDetails } from "@/components/products/product-details";
import { CategoryForm } from "@/components/categories/category-form";
import {
	useProducts,
	useCategories,
	useCreateProduct,
	useUpdateProduct,
	useDeleteProduct,
	useCreateCategory,
} from "@/lib/hooks/useProducts";
import { Product } from "@/types/product";
import { ProductFormValues } from "@/lib/validations/product";
import { useAuth } from "@/lib/contexts/auth-context";
import { useDebounce } from "@/lib/hooks/useDebounce";

export default function DashboardPage() {
	const router = useRouter();
	const { user, loading: authLoading, signOut } = useAuth();
	const [searchQuery, setSearchQuery] = useState("");
	const debouncedSearch = useDebounce(searchQuery, 300);
	const [selectedCategory, setSelectedCategory] = useState<
		string | undefined
	>();
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);
	const [isDetailsOpen, setIsDetailsOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(
		null,
	);

	useEffect(() => {
		if (!authLoading && !user) {
			router.push("/sign-in");
		}
	}, [user, authLoading, router]);

	//queries
	const {
		data: products = [],
		isLoading,
		isError,
	} = useProducts({
		search: debouncedSearch,
		category: selectedCategory,
	});
	const { data: categories = [] } = useCategories();

	// mutations
	const createProduct = useCreateProduct();
	const updateProduct = useUpdateProduct();
	const deleteProduct = useDeleteProduct();
	const createCategory = useCreateCategory();

	const handleAddProduct = useCallback(() => {
		setSelectedProduct(null);
		setIsFormOpen(true);
	}, []);

	const handleViewProduct = useCallback((product: Product) => {
		setSelectedProduct(product);
		setIsDetailsOpen(true);
	}, []);

	const handleEditProduct = useCallback((product: Product) => {
		setSelectedProduct(product);
		setIsFormOpen(true);
	}, []);

	const handleDeleteProduct = useCallback((product: Product) => {
		setSelectedProduct(product);
		setIsDeleteOpen(true);
	}, []);

	const handleFormSubmit = useCallback(
		async (data: ProductFormValues) => {
			try {
				if (selectedProduct) {
					await updateProduct.mutateAsync({
						id: selectedProduct.id,
						data,
					});
				} else {
					await createProduct.mutateAsync(data);
				}
				setIsFormOpen(false);
				setSelectedProduct(null);
			} catch (error) {
				console.error("Failed to save product:", error);
			}
		},
		[selectedProduct, updateProduct, createProduct],
	);

	const handleConfirmDelete = useCallback(async () => {
		if (!selectedProduct) return;
		try {
			await deleteProduct.mutateAsync(selectedProduct.id);
			setIsDeleteOpen(false);
			setSelectedProduct(null);
		} catch (error) {
			console.error("Failed to delete product:", error);
		}
	}, [selectedProduct, deleteProduct]);

	const handleCategorySubmit = useCallback(
		async (data: { name: string; slug: string }) => {
			try {
				await createCategory.mutateAsync(data);
				setIsCategoryFormOpen(false);
			} catch (error) {
				console.error("Failed to create category:", error);
			}
		},
		[createCategory],
	);

	const handleSignOut = useCallback(async () => {
		try {
			await signOut();
			router.push("/sign-in");
		} catch (error) {
			console.error("Failed to sign out:", error);
		}
	}, [signOut, router]);

	const closeForm = useCallback(() => {
		setIsFormOpen(false);
		setSelectedProduct(null);
	}, []);

	const closeDelete = useCallback(() => {
		setIsDeleteOpen(false);
		setSelectedProduct(null);
	}, []);

	const closeDetails = useCallback(() => {
		setIsDetailsOpen(false);
		setSelectedProduct(null);
	}, []);

	const closeCategoryForm = useCallback(() => {
		setIsCategoryFormOpen(false);
	}, []);

	if (authLoading) {
		return (
			<div className="min-h-screen bg-white flex items-center justify-center">
				<div
					className="text-center"
					role="status"
					aria-label="Loading application"
				>
					<div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-[#DDDDDD] border-t-[#FF385C]"></div>
					<p className="text-[#717171] mt-4 text-sm">Loading...</p>
				</div>
			</div>
		);
	}

	if (!user) {
		return null;
	}

	return (
		<div className="min-h-screen bg-[#F7F7F7]">
			<header className="bg-white border-b border-[#EBEBEB] sticky top-0 z-40">
				<div className="max-w-7xl mx-auto px-6">
					<div className="flex items-center justify-between h-16">
						<h1 className="text-[#FF385C] text-xl font-bold tracking-tight">
							FashionHub
						</h1>

						<nav
							className="flex items-center gap-3"
							aria-label="Main actions"
						>
							<Button onClick={handleAddProduct}>
								<Plus className="w-4 h-4" aria-hidden="true" />
								Add Product
							</Button>
							<button
								onClick={handleSignOut}
								aria-label="Sign out"
								className="flex items-center gap-2 text-sm text-[#717171] hover:text-[#222222] transition-colors px-3 py-2 rounded-lg hover:bg-[#F7F7F7]"
							>
								<LogOut
									className="w-4 h-4"
									aria-hidden="true"
								/>
								<span className="hidden sm:inline">
									Sign Out
								</span>
							</button>
						</nav>
					</div>
				</div>
			</header>
			<main className="max-w-7xl mx-auto px-6 py-8">
				<div className="mb-6">
					<h2 className="text-[#222222] text-2xl font-semibold">
						Products
					</h2>
					<p className="text-[#717171] text-sm mt-1">
						{products.length} product
						{products.length !== 1 ? "s" : ""} in your inventory
					</p>
				</div>

				<div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center mb-8">
					<div className="relative flex-1">
						<Search
							className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#717171]"
							aria-hidden="true"
						/>
						<Input
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Search products..."
							className="pl-10 h-11 bg-white"
							aria-label="Search products"
						/>
					</div>

					<div className="flex gap-2">
						<select
							value={selectedCategory || ""}
							onChange={(e) =>
								setSelectedCategory(e.target.value || undefined)
							}
							aria-label="Filter by category"
							className="h-11 rounded-lg border border-[#B0B0B0] bg-white text-[#222222] px-3 py-2 text-sm focus-visible:outline-none focus-visible:border-[#222222] focus-visible:ring-1 focus-visible:ring-[#222222] transition-colors min-w-40"
						>
							<option value="">All Categories</option>
							{categories.map((category) => (
								<option
									key={category.id}
									value={category.slug || category.name}
								>
									{category.name}
								</option>
							))}
						</select>
						<Button
							onClick={() => setIsCategoryFormOpen(true)}
							variant="outline"
							className="h-11 whitespace-nowrap text-sm"
						>
							<Plus className="w-4 h-4" aria-hidden="true" />
							New Category
						</Button>
					</div>
					<div
						className="flex border border-[#DDDDDD] rounded-lg overflow-hidden bg-white"
						role="group"
						aria-label="View mode"
					>
						<button
							onClick={() => setViewMode("grid")}
							aria-label="Grid view"
							aria-pressed={viewMode === "grid"}
							className={`p-2.5 transition-colors ${
								viewMode === "grid"
									? "bg-[#222222] text-white"
									: "text-[#717171] hover:text-[#222222] hover:bg-[#F7F7F7]"
							}`}
						>
							<Grid3x3 className="w-4 h-4" aria-hidden="true" />
						</button>
						<button
							onClick={() => setViewMode("list")}
							aria-label="List view"
							aria-pressed={viewMode === "list"}
							className={`p-2.5 transition-colors ${
								viewMode === "list"
									? "bg-[#222222] text-white"
									: "text-[#717171] hover:text-[#222222] hover:bg-[#F7F7F7]"
							}`}
						>
							<List className="w-4 h-4" aria-hidden="true" />
						</button>
					</div>
				</div>
				{isLoading ? (
					<div
						className="text-center py-20"
						role="status"
						aria-label="Loading products"
					>
						<div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-[#DDDDDD] border-t-[#FF385C]"></div>
						<p className="text-[#717171] mt-4 text-sm">
							Loading products...
						</p>
					</div>
				) : isError ? (
					<div className="text-center py-20" role="alert">
						<p className="text-[#C13515] text-base mb-2">
							Failed to load products
						</p>
						<p className="text-[#717171] text-sm">
							Something went wrong. Please try again.
						</p>
					</div>
				) : products.length === 0 ? (
					<div className="text-center py-20 bg-white rounded-xl border border-[#EBEBEB]">
						<div className="w-16 h-16 bg-[#F7F7F7] rounded-full flex items-center justify-center mx-auto mb-4">
							<Search
								className="w-8 h-8 text-[#B0B0B0]"
								aria-hidden="true"
							/>
						</div>
						<p className="text-[#222222] text-lg font-semibold mb-1">
							No products found
						</p>
						<p className="text-[#717171] text-sm mb-6">
							{searchQuery || selectedCategory
								? "Try adjusting your filters"
								: "Get started by adding your first product"}
						</p>
						<Button onClick={handleAddProduct}>
							<Plus className="w-4 h-4" aria-hidden="true" />
							Add Product
						</Button>
					</div>
				) : viewMode === "grid" ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
						{products.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
								onView={handleViewProduct}
								onEdit={handleEditProduct}
								onDelete={handleDeleteProduct}
							/>
						))}
					</div>
				) : (
					<div className="space-y-3">
						{products.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
								onView={handleViewProduct}
								onEdit={handleEditProduct}
								onDelete={handleDeleteProduct}
								viewMode="list"
							/>
						))}
					</div>
				)}
			</main>

			<ProductForm
				isOpen={isFormOpen}
				onClose={closeForm}
				onSubmit={handleFormSubmit}
				product={selectedProduct}
				isLoading={createProduct.isPending || updateProduct.isPending}
			/>

			<CategoryForm
				isOpen={isCategoryFormOpen}
				onClose={closeCategoryForm}
				onSubmit={handleCategorySubmit}
				isLoading={createCategory.isPending}
			/>

			<DeleteConfirmation
				isOpen={isDeleteOpen}
				onClose={closeDelete}
				onConfirm={handleConfirmDelete}
				productName={selectedProduct?.name || ""}
				isLoading={deleteProduct.isPending}
			/>

			<ProductDetails
				isOpen={isDetailsOpen}
				onClose={closeDetails}
				product={selectedProduct}
			/>
		</div>
	);
}
