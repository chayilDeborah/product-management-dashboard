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
					"inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
					{
						"bg-[#5B7FFF] text-white hover:bg-[#4A6FEE] active:bg-[#3A5FDD]":
							variant === "default",
						"border border-[#D6CEC2] bg-transparent hover:bg-[#E7E2DC]":
							variant === "outline",
						"hover:bg-[#E7E2DC] text-gray-700": variant === "ghost",
						"bg-red-600 text-white hover:bg-red-700":
							variant === "danger",
					},
					{
						"h-10 px-4 py-2 text-sm": size === "default",
						"h-9 px-3 text-sm": size === "sm",
						"h-11 px-8": size === "lg",
						"h-9 w-9": size === "icon",
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
