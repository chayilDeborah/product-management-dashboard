"use client";

import { memo } from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { Eye, Pencil, Trash2, ImageOff } from "lucide-react";

interface ProductCardProps {
	product: Product;
	onView?: (product: Product) => void;
	onEdit?: (product: Product) => void;
	onDelete?: (product: Product) => void;
	viewMode?: "grid" | "list";
}

export const ProductCard = memo(function ProductCard({
	product,
	onView,
	onEdit,
	onDelete,
	viewMode = "grid",
}: ProductCardProps) {
	if (viewMode === "list") {
		return (
			<article
				className="bg-white rounded-xl border border-[#EBEBEB] transition-all duration-200 hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)]"
				aria-label={`Product: ${product.name}`}
			>
				<div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4">
					{/* Image */}
					<div className="w-14 h-14 sm:w-14 sm:h-14 bg-[#F7F7F7] rounded-lg flex items-center justify-center shrink-0 overflow-hidden relative">
						{product.image ? (
							<Image
								src={product.image}
								alt={product.name}
								fill
								className="object-cover"
								sizes="56px"
							/>
						) : (
							<ImageOff
								className="w-5 h-5 text-[#B0B0B0]"
								aria-hidden="true"
							/>
						)}
					</div>

					{/* Product Info — fills available space */}
					<div className="flex-1 min-w-0">
						<div className="flex items-start justify-between gap-2">
							<h3 className="text-[#222222] text-sm font-semibold truncate">
								{product.name}
							</h3>
							{/* Desktop actions */}
							<div
								className="hidden sm:flex items-center gap-1 shrink-0"
								role="group"
								aria-label={`Actions for ${product.name}`}
							>
								<button
									onClick={() => onView?.(product)}
									className="w-8 h-8 rounded-lg hover:bg-[#F7F7F7] flex items-center justify-center transition-colors"
									aria-label={`View details for ${product.name}`}
								>
									<Eye
										className="w-4 h-4 text-[#717171]"
										aria-hidden="true"
									/>
								</button>
								<button
									onClick={() => onEdit?.(product)}
									className="w-8 h-8 rounded-lg hover:bg-[#F7F7F7] flex items-center justify-center transition-colors"
									aria-label={`Edit ${product.name}`}
								>
									<Pencil
										className="w-4 h-4 text-[#717171]"
										aria-hidden="true"
									/>
								</button>
								<button
									onClick={() => onDelete?.(product)}
									className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center transition-colors"
									aria-label={`Delete ${product.name}`}
								>
									<Trash2
										className="w-4 h-4 text-[#C13515]"
										aria-hidden="true"
									/>
								</button>
							</div>
						</div>
						<div className="flex items-center gap-2 mt-0.5">
							<span className="text-[#717171] text-xs truncate">
								{product.category || "Uncategorized"}
							</span>
							<span
								className={`inline-flex items-center px-1.5 py-0.5 text-xs font-medium rounded-full ${
									product.status === "active"
										? "bg-green-50 text-[#008A05]"
										: "bg-gray-100 text-[#717171]"
								}`}
							>
								{product.status === "active"
									? "Active"
									: product.status}
							</span>
						</div>
						<div className="flex items-center justify-between mt-2">
							<div className="flex items-center gap-4">
								<span className="text-[#222222] text-sm font-semibold">
									₦{product.price.toFixed(2)}
								</span>
								<span
									className={`text-xs font-medium ${
										product.stock > 10
											? "text-[#008A05]"
											: product.stock > 0
												? "text-[#C13515]"
												: "text-[#C13515]"
									}`}
								>
									{product.stock} in stock
								</span>
							</div>
							{/* Mobile actions */}
							<div
								className="flex sm:hidden items-center gap-0.5 shrink-0"
								role="group"
								aria-label={`Actions for ${product.name}`}
							>
								<button
									onClick={() => onView?.(product)}
									className="w-7 h-7 rounded-lg hover:bg-[#F7F7F7] flex items-center justify-center transition-colors"
									aria-label={`View details for ${product.name}`}
								>
									<Eye
										className="w-3.5 h-3.5 text-[#717171]"
										aria-hidden="true"
									/>
								</button>
								<button
									onClick={() => onEdit?.(product)}
									className="w-7 h-7 rounded-lg hover:bg-[#F7F7F7] flex items-center justify-center transition-colors"
									aria-label={`Edit ${product.name}`}
								>
									<Pencil
										className="w-3.5 h-3.5 text-[#717171]"
										aria-hidden="true"
									/>
								</button>
								<button
									onClick={() => onDelete?.(product)}
									className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center transition-colors"
									aria-label={`Delete ${product.name}`}
								>
									<Trash2
										className="w-3.5 h-3.5 text-[#C13515]"
										aria-hidden="true"
									/>
								</button>
							</div>
						</div>
					</div>
				</div>
			</article>
		);
	}

	return (
		<article
			className="bg-white rounded-xl overflow-hidden border border-[#EBEBEB] transition-all duration-200 hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)] group"
			aria-label={`Product: ${product.name}`}
		>
			<div className="relative w-full aspect-4/3 bg-[#F7F7F7] overflow-hidden">
				{product.image ? (
					<Image
						src={product.image}
						alt={product.name}
						fill
						className="object-cover group-hover:scale-105 transition-transform duration-300"
						sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
					/>
				) : (
					<div className="w-full h-full flex items-center justify-center">
						<ImageOff
							className="w-10 h-10 text-[#B0B0B0]"
							aria-hidden="true"
						/>
					</div>
				)}

				<div className="absolute top-3 left-3">
					<span
						className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
							product.status === "active"
								? "bg-white/90 backdrop-blur-sm text-[#008A05]"
								: "bg-white/90 backdrop-blur-sm text-[#717171]"
						}`}
					>
						{product.status === "active"
							? "Active"
							: product.status}
					</span>
				</div>
			</div>

			<div className="p-4">
				<div className="flex items-start justify-between gap-2 mb-1">
					<h3 className="text-[#222222] text-[15px] font-semibold line-clamp-1 flex-1">
						{product.name}
					</h3>
					<div
						className="flex gap-0.5 shrink-0 -mt-0.5"
						role="group"
						aria-label={`Actions for ${product.name}`}
					>
						<button
							onClick={() => onView?.(product)}
							className="w-7 h-7 rounded-full hover:bg-[#F7F7F7] flex items-center justify-center transition-colors"
							aria-label={`View details for ${product.name}`}
						>
							<Eye
								className="w-3.5 h-3.5 text-[#717171] hover:text-[#222222]"
								aria-hidden="true"
							/>
						</button>
						<button
							onClick={() => onEdit?.(product)}
							className="w-7 h-7 rounded-full hover:bg-[#F7F7F7] flex items-center justify-center transition-colors"
							aria-label={`Edit ${product.name}`}
						>
							<Pencil
								className="w-3.5 h-3.5 text-[#717171] hover:text-[#222222]"
								aria-hidden="true"
							/>
						</button>
						<button
							onClick={() => onDelete?.(product)}
							className="w-7 h-7 rounded-full hover:bg-red-50 flex items-center justify-center transition-colors"
							aria-label={`Delete ${product.name}`}
						>
							<Trash2
								className="w-3.5 h-3.5 text-[#C13515]"
								aria-hidden="true"
							/>
						</button>
					</div>
				</div>

				<p className="text-[#717171] text-sm mb-3">
					{product.category || "Uncategorized"}
				</p>

				<div className="flex items-center justify-between">
					<p className="text-[#222222] text-[15px]">
						<span className="font-semibold">
							₦{product.price.toFixed(2)}
						</span>
					</p>
					<p
						className={`text-sm font-medium ${
							product.stock > 10
								? "text-[#008A05]"
								: product.stock > 0
									? "text-[#C13515]"
									: "text-[#C13515]"
						}`}
					>
						{product.stock} in stock
					</p>
				</div>
			</div>
		</article>
	);
});

ProductCard.displayName = "ProductCard";
