"use client";

import { useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductFormValues } from "@/lib/validations/product";
import { Product } from "@/types/product";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCategories } from "@/lib/hooks/useProducts";
import { ChevronDown, Check } from "lucide-react";

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
	const { data: categories = [] } = useCategories();
	const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setCategoryDropdownOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const {
		register,
		handleSubmit,
		control,
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

	// update form values when product change
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
				<div>
					<label
						htmlFor="product-name"
						className="block text-sm font-medium text-[#222222] mb-1"
					>
						Product Name{" "}
						<span className="text-[#C13515]" aria-hidden="true">
							*
						</span>
					</label>
					<Input
						id="product-name"
						{...register("name")}
						placeholder="e.g., Wireless Headphones Pro"
						disabled={isLoading}
						aria-required="true"
						aria-invalid={!!errors.name}
						aria-describedby={
							errors.name ? "name-error" : undefined
						}
					/>
					{errors.name && (
						<p
							id="name-error"
							role="alert"
							className="text-[#C13515] text-xs mt-1"
						>
							{errors.name.message}
						</p>
					)}
				</div>
				<div>
					<label
						htmlFor="product-description"
						className="block text-sm font-medium text-[#222222] mb-1"
					>
						Description{" "}
						<span className="text-[#C13515]" aria-hidden="true">
							*
						</span>
					</label>
					<Textarea
						id="product-description"
						{...register("description")}
						placeholder="Describe your product..."
						rows={3}
						disabled={isLoading}
						aria-required="true"
						aria-invalid={!!errors.description}
						aria-describedby={
							errors.description ? "description-error" : undefined
						}
					/>
					{errors.description && (
						<p
							id="description-error"
							role="alert"
							className="text-[#C13515] text-xs mt-1"
						>
							{errors.description.message}
						</p>
					)}
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label
							htmlFor="product-price"
							className="block text-sm font-medium text-[#222222] mb-1"
						>
							Price (₦){" "}
							<span className="text-[#C13515]" aria-hidden="true">
								*
							</span>
						</label>
						<Input
							id="product-price"
							{...register("price", { valueAsNumber: true })}
							type="number"
							step="0.01"
							placeholder="0.00"
							disabled={isLoading}
							aria-required="true"
							aria-invalid={!!errors.price}
							aria-describedby={
								errors.price ? "price-error" : undefined
							}
						/>
						{errors.price && (
							<p
								id="price-error"
								role="alert"
								className="text-[#C13515] text-xs mt-1"
							>
								{errors.price.message}
							</p>
						)}
					</div>

					<div>
						<label
							htmlFor="product-stock"
							className="block text-sm font-medium text-[#222222] mb-1"
						>
							Stock{" "}
							<span className="text-[#C13515]" aria-hidden="true">
								*
							</span>
						</label>
						<Input
							id="product-stock"
							{...register("stock", { valueAsNumber: true })}
							type="number"
							placeholder="0"
							disabled={isLoading}
							aria-required="true"
							aria-invalid={!!errors.stock}
							aria-describedby={
								errors.stock ? "stock-error" : undefined
							}
						/>
						{errors.stock && (
							<p
								id="stock-error"
								role="alert"
								className="text-[#C13515] text-xs mt-1"
							>
								{errors.stock.message}
							</p>
						)}
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div>
						<label
							id="category-label"
							className="block text-sm font-medium text-[#222222] mb-1"
						>
							Category{" "}
							<span className="text-[#C13515]" aria-hidden="true">
								*
							</span>
						</label>
						<Controller
							name="category"
							control={control}
							render={({ field }) => {
								const selected = field.value
									? field.value.split(", ").filter(Boolean)
									: [];

								const toggleCategory = (
									categoryName: string,
								) => {
									const updated = selected.includes(
										categoryName,
									)
										? selected.filter(
												(c) => c !== categoryName,
											)
										: [...selected, categoryName];
									field.onChange(updated.join(", "));
								};

								return (
									<div className="relative" ref={dropdownRef}>
										<button
											type="button"
											onClick={() =>
												setCategoryDropdownOpen(
													!categoryDropdownOpen,
												)
											}
											disabled={isLoading}
											aria-haspopup="listbox"
											aria-expanded={categoryDropdownOpen}
											aria-labelledby="category-label"
											className="flex w-full items-center justify-between rounded-lg border border-[#B0B0B0] bg-white px-3 py-2 text-sm text-[#222222] transition-colors hover:border-[#222222] focus:border-[#222222] focus:outline-none focus:ring-1 focus:ring-[#222222] disabled:opacity-50 min-h-10.5"
										>
											<span
												className={`flex-1 text-left truncate ${selected.length === 0 ? "text-[#717171]" : ""}`}
											>
												{selected.length === 0
													? "Select categories..."
													: selected.length <= 2
														? selected.join(", ")
														: `${selected.length} categories selected`}
											</span>
											<ChevronDown
												aria-hidden="true"
												className={`h-4 w-4 ml-2 text-[#717171] transition-transform shrink-0 ${categoryDropdownOpen ? "rotate-180" : ""}`}
											/>
										</button>

										{categoryDropdownOpen && (
											<div
												role="listbox"
												aria-label="Categories"
												className="absolute z-50 mt-1 w-full rounded-lg border border-[#DDDDDD] bg-white shadow-lg max-h-48 overflow-y-auto"
											>
												{categories.length === 0 ? (
													<div className="px-3 py-2 text-sm text-[#717171]">
														No categories available
													</div>
												) : (
													categories.map(
														(category) => {
															const isSelected =
																selected.includes(
																	category.name,
																);
															return (
																<button
																	key={
																		category.id
																	}
																	type="button"
																	role="option"
																	aria-selected={
																		isSelected
																	}
																	onClick={() =>
																		toggleCategory(
																			category.name,
																		)
																	}
																	className={`flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-[#F7F7F7] ${
																		isSelected
																			? "text-[#222222] font-medium"
																			: "text-[#222222]"
																	}`}
																>
																	<span
																		aria-hidden="true"
																		className={`flex h-4 w-4 items-center justify-center rounded border shrink-0 ${
																			isSelected
																				? "border-[#FF385C] bg-[#FF385C]"
																				: "border-[#B0B0B0]"
																		}`}
																	>
																		{isSelected && (
																			<Check className="h-3 w-3 text-white" />
																		)}
																	</span>
																	{
																		category.name
																	}
																</button>
															);
														},
													)
												)}
											</div>
										)}
										{selected.length > 0 && (
											<div className="flex flex-wrap gap-1.5 mt-2">
												{selected.map((cat) => (
													<span
														key={cat}
														className="inline-flex items-center gap-1 rounded-full bg-[#F7F7F7] border border-[#EBEBEB] px-2.5 py-0.5 text-xs font-medium text-[#222222]"
													>
														{cat}
														<button
															type="button"
															aria-label={`Remove ${cat}`}
															onClick={() =>
																toggleCategory(
																	cat,
																)
															}
															className="ml-0.5 text-[#717171] hover:text-[#C13515] transition-colors"
														>
															×
														</button>
													</span>
												))}
											</div>
										)}
									</div>
								);
							}}
						/>
						{errors.category && (
							<p
								id="category-error"
								role="alert"
								className="text-[#C13515] text-xs mt-1"
							>
								{errors.category.message}
							</p>
						)}
					</div>

					<div>
						<label
							htmlFor="product-status"
							className="block text-sm font-medium text-[#222222] mb-1"
						>
							Status{" "}
							<span className="text-[#C13515]" aria-hidden="true">
								*
							</span>
						</label>
						<Input
							id="product-status"
							{...register("status")}
							placeholder="e.g., active"
							disabled={isLoading}
							aria-required="true"
							aria-invalid={!!errors.status}
							aria-describedby={
								errors.status ? "status-error" : undefined
							}
						/>
						{errors.status && (
							<p
								id="status-error"
								role="alert"
								className="text-[#C13515] text-xs mt-1"
							>
								{errors.status.message}
							</p>
						)}
					</div>
				</div>
				<div>
					<label
						htmlFor="product-image"
						className="block text-sm font-medium text-[#222222] mb-1"
					>
						Image URL (optional)
					</label>
					<Input
						id="product-image"
						{...register("image")}
						type="url"
						placeholder="https://example.com/image.jpg"
						disabled={isLoading}
						aria-invalid={!!errors.image}
						aria-describedby={
							errors.image ? "image-error" : undefined
						}
					/>
					{errors.image && (
						<p
							id="image-error"
							role="alert"
							className="text-[#C13515] text-xs mt-1"
						>
							{errors.image.message}
						</p>
					)}
				</div>
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
