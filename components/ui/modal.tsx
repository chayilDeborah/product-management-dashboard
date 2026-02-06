"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	title?: string;
	className?: string;
}

export function Modal({
	isOpen,
	onClose,
	children,
	title,
	className,
}: ModalProps) {
	React.useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};

		if (isOpen) {
			document.addEventListener("keydown", handleEscape);
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.body.style.overflow = "unset";
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			{/* Backdrop */}
			<div
				className="absolute inset-0 bg-black/60 backdrop-blur-sm"
				onClick={onClose}
			/>

			{/* Modal */}
			<div
				className={cn(
					"relative z-10 w-full max-w-lg mx-4  rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200",
					className,
				)}
			>
				{/* Header */}
				{title && (
					<div className="flex items-center justify-between px-6 py-4 border-b border-[#E7E2DC]">
						<h2 className="text-xl font-semibold text-gray-900">
							{title}
						</h2>
						<button
							onClick={onClose}
							className="text-gray-400 hover:text-gray-600 transition-colors"
						>
							<X className="w-5 h-5" />
						</button>
					</div>
				)}

				{/* Content */}
				<div className="p-6">{children}</div>
			</div>
		</div>
	);
}
