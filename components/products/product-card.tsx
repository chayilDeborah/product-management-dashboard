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
				className="bg-white rounded-xl border border-[#EBEBEB] transition-all duration-200 hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)] group"
				aria-label={`Product: ${product.name}`}
			>
				<div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4">
					<div className="flex items-center gap-4 min-w-0">
						<div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F7F7F7] rounded-xl flex items-center justify-center shrink-0 overflow-hidden relative">
							{product.image ? (
								<Image
									src={product.image}
									alt={product.name}
									fill
									className="object-cover"
									sizes="80px"
								/>
							) : (
								<ImageOff
									className="w-6 h-6 text-[#B0B0B0]"
									aria-hidden="true"
								/>
							)}
						</div>

						<div className="flex-1 min-w-0">
							<h3 className="text-[#222222] text-base font-semibold mb-1 truncate">
								{product.name}
							</h3>
							<div className="flex items-center gap-2 mb-1">
								<span className="text-[#717171] text-sm truncate">
									{product.category || "Uncategorized"}
								</span>
								<span
									className="text-[#DDDDDD]"
									aria-hidden="true"
								>
									·
								</span>
								<span
									className={`text-sm font-medium shrink-0 ${
										product.status === "active"
											? "text-[#008A05]"
											: "text-[#717171]"
									}`}
								>
									{product.status === "active"
										? "Active"
										: product.status}
								</span>
							</div>
							{product.description && (
								<p className="text-[#717171] text-sm line-clamp-1 hidden sm:block">
									{product.description}
								</p>
							)}
						</div>
					</div>

					<div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 shrink-0 pl-0 sm:pl-4">
						<div className="flex items-center gap-4 sm:gap-6">
							<div className="sm:text-right">
								<p className="text-[#717171] text-xs mb-0.5">
									Price
								</p>
								<p className="text-[#222222] text-base sm:text-lg font-semibold">
									₦{product.price.toFixed(2)}
								</p>
							</div>
							<div className="sm:text-right">
								<p className="text-[#717171] text-xs mb-0.5">
									Stock
								</p>
								<p
									className={`text-base sm:text-lg font-semibold ${
										product.stock > 10
											? "text-[#008A05]"
											: product.stock > 0
												? "text-[#C13515]"
												: "text-[#C13515]"
									}`}
								>
									{product.stock}
								</p>
							</div>
						</div>

						<div
							className="flex gap-1 shrink-0 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
							role="group"
							aria-label={`Actions for ${product.name}`}
						>
							<button
								onClick={() => onView?.(product)}
								className="w-8 h-8 rounded-full hover:bg-[#F7F7F7] flex items-center justify-center transition-colors"
								aria-label={`View details for ${product.name}`}
							>
								<Eye
									className="w-4 h-4 text-[#222222]"
									aria-hidden="true"
								/>
							</button>
							<button
								onClick={() => onEdit?.(product)}
								className="w-8 h-8 rounded-full hover:bg-[#F7F7F7] flex items-center justify-center transition-colors"
								aria-label={`Edit ${product.name}`}
							>
								<Pencil
									className="w-4 h-4 text-[#222222]"
									aria-hidden="true"
								/>
							</button>
							<button
								onClick={() => onDelete?.(product)}
								className="w-8 h-8 rounded-full hover:bg-red-50 flex items-center justify-center transition-colors"
								aria-label={`Delete ${product.name}`}
							>
								<Trash2
									className="w-4 h-4 text-[#C13515]"
									aria-hidden="true"
								/>
							</button>
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
				<div
					className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
					role="group"
					aria-label={`Actions for ${product.name}`}
				>
					<button
						onClick={() => onView?.(product)}
						className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white flex items-center justify-center transition-colors shadow-sm"
						aria-label={`View details for ${product.name}`}
					>
						<Eye
							className="w-4 h-4 text-[#222222]"
							aria-hidden="true"
						/>
					</button>
					<button
						onClick={() => onEdit?.(product)}
						className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white flex items-center justify-center transition-colors shadow-sm"
						aria-label={`Edit ${product.name}`}
					>
						<Pencil
							className="w-4 h-4 text-[#222222]"
							aria-hidden="true"
						/>
					</button>
					<button
						onClick={() => onDelete?.(product)}
						className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white flex items-center justify-center transition-colors shadow-sm"
						aria-label={`Delete ${product.name}`}
					>
						<Trash2
							className="w-4 h-4 text-[#C13515]"
							aria-hidden="true"
						/>
					</button>
				</div>

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
				<div className="flex items-start justify-between mb-1">
					<h3 className="text-[#222222] text-[15px] font-semibold line-clamp-1 flex-1">
						{product.name}
					</h3>
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
