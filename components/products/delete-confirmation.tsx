"use client";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface DeleteConfirmationProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	productName: string;
	isLoading?: boolean;
}

export function DeleteConfirmation({
	isOpen,
	onClose,
	onConfirm,
	productName,
	isLoading,
}: DeleteConfirmationProps) {
	return (
		<Modal isOpen={isOpen} onClose={onClose} className="max-w-md">
			<div className="text-center" role="alert">
				<div className="mx-auto w-12 h-12 bg-[#FFF8F6] rounded-full flex items-center justify-center mb-4">
					<AlertTriangle
						className="w-6 h-6 text-[#C13515]"
						aria-hidden="true"
					/>
				</div>

				<h3 className="text-lg font-semibold text-[#222222] mb-2">
					Delete Product
				</h3>

				<p className="text-[#717171] mb-1">
					Are you sure you want to delete
				</p>
				<p className="text-[#222222] font-semibold mb-4">
					&ldquo;{productName}&rdquo;?
				</p>

				<div className="bg-[#FFF8F6] border border-[#C13515]/20 rounded-lg p-3 mb-6">
					<p className="text-[#C13515] text-sm flex items-center justify-center gap-2">
						<AlertTriangle className="w-4 h-4" aria-hidden="true" />
						This action cannot be undone
					</p>
				</div>

				<div className="flex gap-3">
					<Button
						variant="outline"
						onClick={onClose}
						disabled={isLoading}
						className="flex-1"
					>
						Cancel
					</Button>
					<Button
						variant="danger"
						onClick={onConfirm}
						disabled={isLoading}
						className="flex-1"
					>
						{isLoading ? "Deleting..." : "Delete"}
					</Button>
				</div>
			</div>
		</Modal>
	);
}
