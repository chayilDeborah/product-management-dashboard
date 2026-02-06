"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const categorySchema = z.object({
	name: z.string().min(1, "Category name is required"),
	slug: z
		.string()
		.min(1, "Slug is required")
		.regex(
			/^[a-z0-9]+(?:-[a-z0-9]+)*$/,
			"Slug must be lowercase with hyphens (e.g., mens-wear)",
		),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface CategoryFormProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (data: CategoryFormValues) => void;
	isLoading: boolean;
}

export function CategoryForm({
	isOpen,
	onClose,
	onSubmit,
	isLoading,
}: CategoryFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm<CategoryFormValues>({
		resolver: zodResolver(categorySchema),
		defaultValues: {
			name: "",
			slug: "",
		},
	});

	// Auto-generate slug from name
	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const slug = value
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/^-|-$/g, "");
		setValue("slug", slug);
	};

	const handleFormSubmit = (data: CategoryFormValues) => {
		onSubmit(data);
		reset();
	};

	const handleClose = () => {
		reset();
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={handleClose} title="Add New Category">
			<form
				onSubmit={handleSubmit(handleFormSubmit)}
				className="space-y-4"
			>
				<div>
					<label
						htmlFor="name"
						className="block text-sm font-medium text-[#2B2B2B] mb-2"
					>
						Category Name
					</label>
					<Input
						id="name"
						{...register("name")}
						onChange={(e) => {
							register("name").onChange(e);
							handleNameChange(e);
						}}
						placeholder="e.g., Men's Wear"
						className="h-11"
					/>
					{errors.name && (
						<p className="text-red-500 text-xs mt-1">
							{errors.name.message}
						</p>
					)}
				</div>

				<div>
					<label
						htmlFor="slug"
						className="block text-sm font-medium text-[#2B2B2B] mb-2"
					>
						Slug
					</label>
					<Input
						id="slug"
						{...register("slug")}
						placeholder="e.g., mens-wear"
						className="h-11 font-mono text-sm"
					/>
					{errors.slug && (
						<p className="text-red-500 text-xs mt-1">
							{errors.slug.message}
						</p>
					)}
					<p className="text-xs text-[#6B6B6B] mt-1">
						Auto-generated from name, or customize it
					</p>
				</div>

				<div className="flex gap-3 pt-4">
					<Button
						type="button"
						variant="outline"
						onClick={handleClose}
						className="flex-1"
						disabled={isLoading}
					>
						Cancel
					</Button>
					<Button
						type="submit"
						className="flex-1"
						disabled={isLoading}
					>
						{isLoading ? "Creating..." : "Create Category"}
					</Button>
				</div>
			</form>
		</Modal>
	);
}
