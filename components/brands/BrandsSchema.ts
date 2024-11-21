import { z } from "zod";

const brandNameSchema = z.object({
    brandName: z
        .string()
        .min(2, "Brand name must be at least 2 characters long")
        .max(50, "Brand name must not exceed 50 characters"),
});

export type BrandNameFormValues = z.infer<typeof brandNameSchema>;
export { brandNameSchema };
