"use client";

import { Product } from "@/types/product";
import { Modal } from "@/components/ui/modal";
import { X } from "lucide-react";

interface ProductDetailsProps {
	isOpen: boolean;
	onClose: () => void;
	product: Product | null;
}

export function ProductDetails({
	isOpen,
	onClose,
	product,
}: ProductDetailsProps) {
	if (!product) return null;

	return (
		<Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl">
			<div className="flex items-center justify-between mb-6 -mt-6 -mx-6 px-6 py-4 bg-[#334155] rounded-t-2xl">
				<h2 className="text-2xl font-bold text-[#60A5FA]">
					Product Details
				</h2>
				<button
					onClick={onClose}
					className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-red-600 rounded-lg"
				>
					<X className="w-5 h-5" />
				</button>
			</div>

			<div className="space-y-6">
				<div className="flex justify-center">
					<div className="w-32 h-32 bg-[#334155] rounded-2xl flex items-center justify-center overflow-hidden">
						{product.image}
					</div>
				</div>
				<div>
					<p className="text-gray-400 text-sm mb-1">Product Name</p>
					<h3 className="text-white text-2xl font-bold">
						{product.name}
					</h3>
				</div>
				{product.description && (
					<div>
						<p className="text-gray-400 text-sm mb-1">
							Description
						</p>
						<p className="text-gray-300 text-base">
							{product.description}
						</p>
					</div>
				)}

				<div className="grid grid-cols-2 gap-6">
					<div>
						<p className="text-gray-400 text-sm mb-2">Category</p>
						<p className="text-white text-lg font-semibold">
							{product.category || "Uncategorized"}
						</p>
					</div>
					<div>
						<p className="text-gray-400 text-sm mb-2">Status</p>
						<p className="text-white text-lg font-semibold">
							{product.status}
						</p>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-6">
					<div>
						<p className="text-gray-400 text-sm mb-2">Price</p>
						<p className="text-[#60A5FA] text-3xl font-bold">
							${product.price.toFixed(2)}
						</p>
					</div>
					<div>
						<p className="text-gray-400 text-sm mb-2">Stock</p>
						<p
							className={`text-3xl font-bold ${
								product.stock > 10
									? "text-[#34D399]"
									: "text-[#F87171]"
							}`}
						>
							{product.stock}
						</p>
					</div>
				</div>
				{product.created_at && (
					<div>
						<p className="text-gray-400 text-sm mb-1">Created</p>
						<p className="text-gray-300 text-base">
							{new Date(product.created_at).toLocaleDateString(
								"en-US",
								{
									year: "numeric",
									month: "long",
									day: "numeric",
								},
							)}
						</p>
					</div>
				)}
			</div>
		</Modal>
	);
}
