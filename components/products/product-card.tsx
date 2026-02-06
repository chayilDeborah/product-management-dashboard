"use client";

import { Product } from "@/types/product";
import { Eye, Pencil, Trash2 } from "lucide-react";

interface ProductCardProps {
	product: Product;
	onView?: (product: Product) => void;
	onEdit?: (product: Product) => void;
	onDelete?: (product: Product) => void;
	viewMode?: "grid" | "list";
}

export function ProductCard({
	product,
	onView,
	onEdit,
	onDelete,
	viewMode = "grid",
}: ProductCardProps) {
	if (viewMode === "list") {
		return (
			<div className="bg-[#1E293B] rounded-2xl p-5 border border-[#334155] hover:border-[#475569] transition-all duration-200">
				<div className="flex items-center gap-6">
					<div className="w-24 h-24 bg-[#334155] rounded-2xl flex items-center justify-center shrink-0 overflow-hidden">
						{product.image}
					</div>
					<div className="flex-1 min-w-0">
						<h3 className="text-white text-lg font-semibold mb-2 truncate">
							{product.name}
						</h3>
						<div className="flex gap-2 mb-2">
							<span className="px-3 py-1 bg-[#1E40AF] text-blue-200 text-xs font-medium rounded-md">
								{product.category || "Uncategorized"}
							</span>
							<span
								className={`px-3 py-1 text-xs font-medium rounded-md ${
									product.status === "active"
										? "bg-[#059669] text-green-200"
										: "bg-[#64748B] text-gray-200"
								}`}
							>
								{product.status}
							</span>
						</div>
						{product.description && (
							<p className="text-gray-400 text-sm line-clamp-1">
								{product.description}
							</p>
						)}
					</div>
					<div className="flex items-center gap-8 shrink-0">
						<div>
							<p className="text-gray-400 text-xs mb-1">Price</p>
							<p className="text-[#60A5FA] text-xl font-bold">
								${product.price.toFixed(2)}
							</p>
						</div>
						<div>
							<p className="text-gray-400 text-xs mb-1">Stock</p>
							<p
								className={`text-xl font-bold ${
									product.stock > 10
										? "text-[#34D399]"
										: "text-[#F87171]"
								}`}
							>
								{product.stock}
							</p>
						</div>
					</div>
					<div className="flex gap-2 shrink-0">
						<button
							onClick={() => onView?.(product)}
							className="w-9 h-9 rounded-lg bg-[#1E40AF] hover:bg-[#1E3A8A] flex items-center justify-center transition-colors"
							title="View details"
						>
							<Eye className="w-4 h-4 text-white" />
						</button>
						<button
							onClick={() => onEdit?.(product)}
							className="w-9 h-9 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] flex items-center justify-center transition-colors"
							title="Edit product"
						>
							<Pencil className="w-4 h-4 text-white" />
						</button>
						<button
							onClick={() => onDelete?.(product)}
							className="w-9 h-9 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] flex items-center justify-center transition-colors"
							title="Delete product"
						>
							<Trash2 className="w-4 h-4 text-white" />
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-[#1E293B] rounded-2xl p-5 border border-[#334155] hover:border-[#475569] transition-all duration-200">
			<div className="flex items-start justify-between mb-4">
				<div className="w-20 h-20 bg-[#334155] rounded-2xl flex items-center justify-center overflow-hidden">
					{product.image}
				</div>
				<div className="flex gap-2">
					<button
						onClick={() => onView?.(product)}
						className="w-9 h-9 rounded-lg bg-[#1E40AF] hover:bg-[#1E3A8A] flex items-center justify-center transition-colors"
						title="View details"
					>
						<Eye className="w-4 h-4 text-white" />
					</button>
					<button
						onClick={() => onEdit?.(product)}
						className="w-9 h-9 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] flex items-center justify-center transition-colors"
						title="Edit product"
					>
						<Pencil className="w-4 h-4 text-white" />
					</button>
					<button
						onClick={() => onDelete?.(product)}
						className="w-9 h-9 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] flex items-center justify-center transition-colors"
						title="Delete product"
					>
						<Trash2 className="w-4 h-4 text-white" />
					</button>
				</div>
			</div>

			<h3 className="text-white text-lg font-semibold mb-3 line-clamp-1">
				{product.name}
			</h3>
			<div className="flex gap-2 mb-4">
				<span className="px-3 py-1 bg-[#1E40AF] text-blue-200 text-xs font-medium rounded-md">
					{product.category || "Uncategorized"}
				</span>
				<span
					className={`px-3 py-1 text-xs font-medium rounded-md ${
						product.status === "active"
							? "bg-[#059669] text-green-200"
							: "bg-[#64748B] text-gray-200"
					}`}
				>
					{product.status}
				</span>
			</div>
			<div className="flex items-center justify-between pt-4 border-t border-[#334155]">
				<div>
					<p className="text-gray-400 text-xs mb-1">Price</p>
					<p className="text-[#60A5FA] text-xl font-bold">
						${product.price.toFixed(2)}
					</p>
				</div>
				<div className="text-right">
					<p className="text-gray-400 text-xs mb-1">Stock</p>
					<p
						className={`text-xl font-bold ${
							product.stock > 10
								? "text-[#34D399]"
								: "text-[#F87171]"
						}`}
					>
						{product.stock}
					</p>
				</div>
			</div>
		</div>
	);
}
