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
			<div className="text-center">
				<div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
					<AlertTriangle className="w-6 h-6 text-red-600" />
				</div>

				<h3 className="text-lg font-semibold text-gray-900 mb-2">
					Delete Product
				</h3>

				<p className="text-gray-600 mb-1">
					Are you sure you want to delete
				</p>
				<p className="text-gray-900 font-semibold mb-4">
					&ldquo;{productName}&ldquo;?
				</p>

				<div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
					<p className="text-red-800 text-sm flex items-center justify-center gap-2">
						<AlertTriangle className="w-4 h-4" />
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
