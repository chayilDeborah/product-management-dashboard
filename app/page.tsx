"use client";

import { useState } from "react";
import { Search, Plus, Grid3x3, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/products/product-card";
import { ProductForm } from "@/components/products/product-form";
import { DeleteConfirmation } from "@/components/products/delete-confirmation";
import { ProductDetails } from "@/components/products/product-details";
import {
	useProducts,
	useCategories,
	useCreateProduct,
	useUpdateProduct,
	useDeleteProduct,
} from "@/lib/hooks/useProducts";
import { Product } from "@/types/product";
import { ProductFormValues } from "@/lib/validations/product";

export default function Home() {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState<
		string | undefined
	>();
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);
	const [isDetailsOpen, setIsDetailsOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(
		null,
	);

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

	return (
		<div className="min-h-screen bg-[#0F172A]">
			<div className="border-b border-[#1E293B] bg-[#0F172A]">
				<div className="max-w-7xl mx-auto px-6 py-8">
					<div className="flex items-center justify-between mb-2">
						<div>
							<h1 className="text-4xl font-bold text-[#60A5FA] mb-2">
								Product Hub
							</h1>
							<p className="text-gray-400 text-sm">
								Manage your inventory with ease
							</p>
						</div>
						<Button
							onClick={handleAddProduct}
							className="bg-[#5B7FFF] hover:bg-[#4A6FEE] text-white px-6"
						>
							<Plus className="w-5 h-5 mr-2" />
							Add Product
						</Button>
					</div>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-6 py-6">
				<div className="bg-[#1E293B] rounded-2xl p-6 border border-[#334155] mb-6">
					<div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-4">
						<div className="relative flex-1 w-full">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
							<Input
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder="Search products..."
								className="pl-10 bg-[#0F172A] border-[#334155] text-white placeholder:text-gray-500 h-12"
							/>
						</div>

						<div className="w-full md:w-64">
							<select
								value={selectedCategory || ""}
								onChange={(e) =>
									setSelectedCategory(
										e.target.value || undefined,
									)
								}
								className="flex h-12 w-full rounded-lg border border-[#334155] bg-[#0F172A] text-white px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B7FFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]"
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
						</div>
						<div className="flex gap-2 bg-[#0F172A] rounded-lg p-1 border border-[#334155]">
							<button
								onClick={() => setViewMode("grid")}
								className={`p-2 rounded-md transition-colors ${
									viewMode === "grid"
										? "bg-[#5B7FFF] text-white"
										: "text-gray-400 hover:text-white"
								}`}
							>
								<Grid3x3 className="w-5 h-5" />
							</button>
							<button
								onClick={() => setViewMode("list")}
								className={`p-2 rounded-md transition-colors ${
									viewMode === "list"
										? "bg-[#5B7FFF] text-white"
										: "text-gray-400 hover:text-white"
								}`}
							>
								<List className="w-5 h-5" />
							</button>
						</div>
					</div>

					<p className="text-gray-400 text-sm">
						Showing {products.length} of {products.length} products
					</p>
				</div>
				{isLoading ? (
					<div className="text-center py-20">
						<div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-600 border-t-[#5B7FFF]"></div>
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
		</div>
	);
}
