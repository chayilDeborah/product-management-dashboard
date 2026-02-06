"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductFormValues } from "@/lib/validations/product";
import { Product } from "@/types/product";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ProductFormProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: ProductFormValues) => void;
	product?: Product | null;
	isLoading?: boolean;
}

export function ProductForm({
	isOpen,
	onClose,
	onSubmit,
	product,
	isLoading,
}: ProductFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ProductFormValues>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			name: "",
			description: "",
			price: 0,
			category: "",
			stock: 0,
			status: "active",
			image: "",
		},
	});

	// Update form values when product changes
	useEffect(() => {
		if (product) {
			reset({
				name: product.name,
				description: product.description,
				price: Number(product.price),
				category: product.category,
				stock: Number(product.stock),
				status: product.status,
				image: product.image || "",
			});
		} else {
			reset({
				name: "",
				description: "",
				price: 0,
				category: "",
				stock: 0,
				status: "active",
				image: "",
			});
		}
	}, [product, reset]);

	const handleClose = () => {
		reset();
		onClose();
	};

	const onFormSubmit = (data: ProductFormValues) => {
		onSubmit(data);
		reset();
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={handleClose}
			title={product ? "Edit Product" : "Add New Product"}
			className="max-w-2xl"
		>
			<form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
				{/* Product Name */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Product Name <span className="text-red-500">*</span>
					</label>
					<Input
						{...register("name")}
						placeholder="e.g., Wireless Headphones Pro"
						disabled={isLoading}
					/>
					{errors.name && (
						<p className="text-red-500 text-xs mt-1">
							{errors.name.message}
						</p>
					)}
				</div>

				{/* Description */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Description <span className="text-red-500">*</span>
					</label>
					<Textarea
						{...register("description")}
						placeholder="Describe your product..."
						rows={3}
						disabled={isLoading}
					/>
					{errors.description && (
						<p className="text-red-500 text-xs mt-1">
							{errors.description.message}
						</p>
					)}
				</div>

				{/* Price and Stock */}
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Price ($) <span className="text-red-500">*</span>
						</label>
						<Input
							{...register("price", { valueAsNumber: true })}
							type="number"
							step="0.01"
							placeholder="0.00"
							disabled={isLoading}
						/>
						{errors.price && (
							<p className="text-red-500 text-xs mt-1">
								{errors.price.message}
							</p>
						)}
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Stock <span className="text-red-500">*</span>
						</label>
						<Input
							{...register("stock", { valueAsNumber: true })}
							type="number"
							placeholder="0"
							disabled={isLoading}
						/>
						{errors.stock && (
							<p className="text-red-500 text-xs mt-1">
								{errors.stock.message}
							</p>
						)}
					</div>
				</div>

				{/* Category and Status */}
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Category <span className="text-red-500">*</span>
						</label>
						<Input
							{...register("category")}
							placeholder="e.g., Electronics"
							disabled={isLoading}
						/>
						{errors.category && (
							<p className="text-red-500 text-xs mt-1">
								{errors.category.message}
							</p>
						)}
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Status <span className="text-red-500">*</span>
						</label>
						<Input
							{...register("status")}
							placeholder="e.g., active"
							disabled={isLoading}
						/>
						{errors.status && (
							<p className="text-red-500 text-xs mt-1">
								{errors.status.message}
							</p>
						)}
					</div>
				</div>

				{/* Image URL */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Image URL (optional)
					</label>
					<Input
						{...register("image")}
						type="url"
						placeholder="https://example.com/image.jpg"
						disabled={isLoading}
					/>
					{errors.image && (
						<p className="text-red-500 text-xs mt-1">
							{errors.image.message}
						</p>
					)}
				</div>

				{/* Actions */}
				<div className="flex gap-3 pt-4">
					<Button
						type="button"
						variant="outline"
						onClick={handleClose}
						disabled={isLoading}
						className="flex-1"
					>
						Cancel
					</Button>
					<Button
						type="submit"
						disabled={isLoading}
						className="flex-1"
					>
						{isLoading
							? "Saving..."
							: product
								? "Update Product"
								: "Add Product"}
					</Button>
				</div>
			</form>
		</Modal>
	);
}
