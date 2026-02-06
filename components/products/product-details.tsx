"use client";

import Image from "next/image";
import { Product } from "@/types/product";
import { Modal } from "@/components/ui/modal";
import { ImageOff } from "lucide-react";

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
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			className="max-w-2xl"
			title="Product Details"
		>
			<div className="space-y-6">
				<div className="flex justify-center">
					<div className="w-full h-56 bg-[#F7F7F7] rounded-xl flex items-center justify-center overflow-hidden relative">
						{product.image ? (
							<Image
								src={product.image}
								alt={product.name}
								fill
								className="object-cover"
								sizes="(max-width: 672px) 100vw, 672px"
							/>
						) : (
							<ImageOff
								className="w-12 h-12 text-[#B0B0B0]"
								aria-hidden="true"
							/>
						)}
					</div>
				</div>

				<div>
					<h3 className="text-[#222222] text-2xl font-semibold mb-1">
						{product.name}
					</h3>
					<p className="text-[#717171] text-sm">
						{product.category || "Uncategorized"}
					</p>
				</div>

				{product.description && (
					<div>
						<p className="text-[#717171] text-xs font-medium uppercase tracking-wide mb-1">
							Description
						</p>
						<p className="text-[#222222] text-sm leading-relaxed">
							{product.description}
						</p>
					</div>
				)}

				<div className="grid grid-cols-2 gap-4 p-4 bg-[#F7F7F7] rounded-xl">
					<div>
						<p className="text-[#717171] text-xs font-medium uppercase tracking-wide mb-1">
							Price
						</p>
						<p className="text-[#222222] text-2xl font-semibold">
							₦{product.price.toFixed(2)}
						</p>
					</div>
					<div>
						<p className="text-[#717171] text-xs font-medium uppercase tracking-wide mb-1">
							Stock
						</p>
						<p
							className={`text-2xl font-semibold ${
								product.stock > 10
									? "text-[#008A05]"
									: "text-[#C13515]"
							}`}
						>
							{product.stock}
						</p>
					</div>
					<div>
						<p className="text-[#717171] text-xs font-medium uppercase tracking-wide mb-1">
							Status
						</p>
						<p
							className={`text-base font-semibold ${product.status === "active" ? "text-[#008A05]" : "text-[#717171]"}`}
						>
							{product.status === "active"
								? "Active"
								: product.status}
						</p>
					</div>
					{product.created_at && (
						<div>
							<p className="text-[#717171] text-xs font-medium uppercase tracking-wide mb-1">
								Created
							</p>
							<p className="text-[#222222] text-base font-medium">
								{new Date(
									product.created_at,
								).toLocaleDateString("en-US", {
									year: "numeric",
									month: "short",
									day: "numeric",
								})}
							</p>
						</div>
					)}
				</div>
			</div>
		</Modal>
	);
}
