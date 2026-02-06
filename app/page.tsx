"use client";

import { useState, useEffect } from "react";
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

export default function Home() {
	const router = useRouter();
	const { user, loading: authLoading, signOut } = useAuth();
	const [searchQuery, setSearchQuery] = useState("");
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

	// Redirect to sign-in if not authenticated
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
		search: searchQuery,
		category: selectedCategory,
	});
	const { data: categories = [] } = useCategories();

	// state chnages
	const createProduct = useCreateProduct();
	const updateProduct = useUpdateProduct();
	const deleteProduct = useDeleteProduct();
	const createCategory = useCreateCategory();

	const handleAddProduct = () => {
		setSelectedProduct(null);
		setIsFormOpen(true);
	};

	const handleViewProduct = (product: Product) => {
		setSelectedProduct(product);
		setIsDetailsOpen(true);
	};

	const handleEditProduct = (product: Product) => {
		setSelectedProduct(product);
		setIsFormOpen(true);
	};

	const handleDeleteProduct = (product: Product) => {
		setSelectedProduct(product);
		setIsDeleteOpen(true);
	};

	const handleFormSubmit = async (data: ProductFormValues) => {
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
	};

	const handleConfirmDelete = async () => {
		if (!selectedProduct) return;
		try {
			await deleteProduct.mutateAsync(selectedProduct.id);
			setIsDeleteOpen(false);
			setSelectedProduct(null);
		} catch (error) {
			console.error("Failed to delete product:", error);
		}
	};

	const handleCategorySubmit = async (data: {
		name: string;
		slug: string;
	}) => {
		try {
			await createCategory.mutateAsync(data);
			setIsCategoryFormOpen(false);
		} catch (error) {
			console.error("Failed to create category:", error);
		}
	};

	const handleSignOut = async () => {
		try {
			await signOut();
			router.push("/sign-in");
		} catch (error) {
			console.error("Failed to sign out:", error);
		}
	};

	// Show loading state while checking authentication
	if (authLoading) {
		return (
			<div className="min-h-screen bg-[#E7E2DC] flex items-center justify-center">
				<div className="text-center">
					<div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#D6CEC2] border-t-[#B9AF9F]"></div>
					<p className="text-[#6B6B6B] mt-4">Loading...</p>
				</div>
			</div>
		);
	}

	// Don't render dashboard if not authenticated
	if (!user) {
		return null;
	}

	return (
		<div className="min-h-screen bg-[#E7E2DC]">
			<div className="border-b border-[#D6CEC2] bg-[#E7E2DC]">
				<div className="max-w-7xl mx-auto px-6 py-8">
					<div className="flex items-center justify-between mb-2">
						<div>
							<h1 className="text-4xl font-bold text-[#2B2B2B] mb-2">
								Product Hub
							</h1>
							<p className="text-[#6B6B6B] text-sm">
								Manage your inventory with ease
							</p>
						</div>
						<div className="flex gap-3">
							<Button onClick={handleAddProduct} className="px-6">
								<Plus className="w-5 h-5 mr-2" />
								Add Product
							</Button>
							<Button
								onClick={handleSignOut}
								variant="outline"
								className="px-6"
							>
								<LogOut className="w-5 h-5 mr-2" />
								Sign Out
							</Button>
						</div>
					</div>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-6 py-6">
				<div className="bg-[#D6CEC2] rounded-2xl p-6 border border-[#B9AF9F] mb-6 shadow-[0_6px_18px_rgba(0,0,0,0.06)]">
					<div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
						<div className="relative flex-1 w-full">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
							<Input
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder="Search products..."
								className="pl-10 h-12 rounded-xl shadow-inner"
							/>
						</div>

						<div className="w-full md:w-64 flex gap-2">
							<select
								value={selectedCategory || ""}
								onChange={(e) =>
									setSelectedCategory(
										e.target.value || undefined,
									)
								}
								className="flex h-12 w-full rounded-xl border border-[#D6CEC2] bg-white text-[#2B2B2B] px-4 py-2 text-sm shadow-inner focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B9AF9F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#E7E2DC]"
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
								className="px-4 h-12 whitespace-nowrap"
							>
								<Plus className="w-4 h-4 mr-1" />
								Add New
							</Button>
						</div>
						<div className="flex gap-2 bg-[#E7E2DC] rounded-xl p-1 border border-[#D6CEC2] shadow-inner">
							<button
								onClick={() => setViewMode("grid")}
								className={`p-2 rounded-md transition-colors ${
									viewMode === "grid"
										? "bg-[#B9AF9F] text-white"
										: "text-[#6B6B6B] hover:text-[#2B2B2B]"
								}`}
							>
								<Grid3x3 className="w-5 h-5" />
							</button>
							<button
								onClick={() => setViewMode("list")}
								className={`p-2 rounded-md transition-colors ${
									viewMode === "list"
										? "bg-[#B9AF9F] text-white"
										: "text-[#6B6B6B] hover:text-[#2B2B2B]"
								}`}
							>
								<List className="w-5 h-5" />
							</button>
						</div>
					</div>

					<p className="text-[#6B6B6B] text-sm">
						Showing {products.length} of {products.length} products
					</p>
				</div>
				{isLoading ? (
					<div className="text-center py-20">
						<div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#D6CEC2] border-t-[#B9AF9F]"></div>
						<p className="text-gray-400 mt-4">
							Loading products...
						</p>
					</div>
				) : isError ? (
					<div className="text-center py-20">
						<p className="text-red-400 text-lg mb-2">
							⚠️ Failed to load products
						</p>
						<p className="text-gray-400">
							Something went wrong. Please try again.
						</p>
					</div>
				) : products.length === 0 ? (
					<div className="text-center py-20">
						<p className="text-gray-400 text-lg mb-2">
							No products found
						</p>
						<p className="text-gray-500 mb-6">
							No products match your search criteria.
						</p>
						<Button
							onClick={handleAddProduct}
							className="bg-[#5B7FFF]"
						>
							<Plus className="w-4 h-4 mr-2" />
							Add Product
						</Button>
					</div>
				) : viewMode === "grid" ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
					<div className="space-y-4">
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
			</div>
			<ProductForm
				isOpen={isFormOpen}
				onClose={() => {
					setIsFormOpen(false);
					setSelectedProduct(null);
				}}
				onSubmit={handleFormSubmit}
				product={selectedProduct}
				isLoading={createProduct.isPending || updateProduct.isPending}
			/>

			<CategoryForm
				isOpen={isCategoryFormOpen}
				onClose={() => setIsCategoryFormOpen(false)}
				onSubmit={handleCategorySubmit}
				isLoading={createCategory.isPending}
			/>

			<DeleteConfirmation
				isOpen={isDeleteOpen}
				onClose={() => {
					setIsDeleteOpen(false);
					setSelectedProduct(null);
				}}
				onConfirm={handleConfirmDelete}
				productName={selectedProduct?.name || ""}
				isLoading={deleteProduct.isPending}
			/>

			<ProductDetails
				isOpen={isDetailsOpen}
				onClose={() => {
					setIsDetailsOpen(false);
					setSelectedProduct(null);
				}}
				product={selectedProduct}
			/>
		</div>
	);
}
