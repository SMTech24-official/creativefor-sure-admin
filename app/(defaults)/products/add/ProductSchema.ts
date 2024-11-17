import { z } from "zod";

const ProductSchema = z.object({
    cigarName: z.string().min(1, "Cigar name is required"),
    brandId: z.string().min(1, "Brand is required"),
    qrCode: z.string().min(1, "QR Code is required"),
    productDescription: z.string().optional(),
    cigarImage: z
        .any()
        .nullable()
        .refine(
            (file) => !file || (file && file[0]?.type.startsWith("image/")),
            "File must be an image"
        ),
    // gallery: z
    //     .any()
    //     .nullable()
    //     .refine(
    //         (files) =>
    //             !files ||
    //             (Array.isArray(files) &&
    //                 files.every((file) => file?.type.startsWith("image/"))),
    //         "All files must be images"
    //     ),
    cigarShape: z.string().optional(),
    cigarSection: z.string().min(1, "Section is required"),
    cigarLength: z.number().min(0, "Length must be a positive number"),
    origin: z.string().min(1, "Origin is required"),
    cigarRingGauge: z.number().min(0, "Ring gauge must be a positive number"),
    strength: z.string().optional(),
    wrapperColor: z.string().min(1, "Wrapper color is required"),
    rollingType: z.string().min(1, "Rolling type is required"),
    cigarManufacturer: z.string().min(1, "Manufacturer is required"),
    cigarWrapper: z.string().min(1, "Wrapper is required"),
    binder: z.string().min(1, "Binder is required"),
    filter: z.string().optional(),
});

export default ProductSchema;
