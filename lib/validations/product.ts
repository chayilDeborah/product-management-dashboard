import { z } from "zod";

export const productSchema = z.object({
	name: z
		.string()
		.min(1, "Product name is required")
		.max(100, "Name is too long"),
	description: z
		.string()
		.min(1, "Description is required")
		.max(500, "Description is too long"),
	price: z.number().min(0, "Price must be positive"),
	category: z.string().min(1, "Category is required"),
	stock: z.number().min(0, "Stock cannot be negative"),
	status: z.string().min(1, "Status is required"),
	image: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export type ProductFormValues = z.infer<typeof productSchema>;
