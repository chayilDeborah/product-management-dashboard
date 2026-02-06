import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "default" | "outline" | "ghost" | "danger";
	size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant = "default", size = "default", ...props }, ref) => {
		return (
			<button
				className={cn(
					"inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF385C] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
					{
						"bg-[#FF385C] text-white hover:bg-[#E31C5F] active:scale-[0.98] shadow-sm":
							variant === "default",
						"border border-[#222222] text-[#222222] bg-white hover:bg-[#F7F7F7] active:scale-[0.98]":
							variant === "outline",
						"hover:bg-[#F7F7F7] text-[#222222]":
							variant === "ghost",
						"bg-[#C13515] text-white hover:bg-[#A61D00] active:scale-[0.98]":
							variant === "danger",
					},
					{
						"h-10 px-5 py-2 text-sm": size === "default",
						"h-8 px-3 text-xs rounded-md": size === "sm",
						"h-12 px-8 text-base": size === "lg",
						"h-9 w-9 rounded-full": size === "icon",
					},
					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);
Button.displayName = "Button";

export { Button };
