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
	const dialogRef = React.useRef<HTMLDivElement>(null);
	const previousFocusRef = React.useRef<HTMLElement | null>(null);
	const titleId = React.useId();

	React.useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};

		if (isOpen) {
			previousFocusRef.current = document.activeElement as HTMLElement;

			document.addEventListener("keydown", handleEscape);
			document.body.style.overflow = "hidden";

			requestAnimationFrame(() => {
				dialogRef.current?.focus();
			});
		}

		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.body.style.overflow = "unset";

			if (previousFocusRef.current) {
				previousFocusRef.current.focus();
			}
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div
				className="absolute inset-0 bg-black/40"
				onClick={onClose}
				aria-hidden="true"
			/>

			<div
				ref={dialogRef}
				role="dialog"
				aria-modal="true"
				aria-labelledby={title ? titleId : undefined}
				tabIndex={-1}
				className={cn(
					"relative z-10 w-full max-w-lg mx-4 rounded-xl shadow-[0_6px_20px_rgba(0,0,0,0.2)] animate-in fade-in zoom-in duration-200 bg-white focus:outline-none",
					className,
				)}
			>
				{title && (
					<div className="flex items-center justify-between px-6 py-5 border-b border-[#EBEBEB]">
						<h2
							id={titleId}
							className="text-lg font-semibold text-[#222222]"
						>
							{title}
						</h2>
						<button
							onClick={onClose}
							aria-label="Close dialog"
							className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#F7F7F7] transition-colors text-[#717171] hover:text-[#222222]"
						>
							<X className="w-4 h-4" aria-hidden="true" />
						</button>
					</div>
				)}

				<div className="p-6">{children}</div>
			</div>
		</div>
	);
}
