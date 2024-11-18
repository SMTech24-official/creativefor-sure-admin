import { z } from "zod";

const ProductSchema = z.object({
    cigarName: z.string().nonempty("Cigar name is required"),
    brandId: z.string().nonempty("Brand ID is required"),
    qrCode: z.string().url("Invalid URL for QR code"),
    productDescription: z.string().nonempty("Product description is required"),
    cigarImage: z.string().url("Invalid URL for cigar image"),
    cigarShape: z.string().nonempty("Cigar shape is required"),
    cigarSection: z.string().nonempty("Cigar section is required"),
    cigarLength: z.number().positive("Cigar length must be a positive number"),
    origin: z.string().nonempty("Origin is required"),
    cigarRingGauge: z
        .number()
        .positive("Cigar ring gauge must be a positive number"),
    strength: z.string().nonempty("Strength is required"),
    wrapperColor: z.string().nonempty("Wrapper color is required"),
    rollingType: z.string().nonempty("Rolling type is required"),
    cigarManufacturer: z.string().nonempty("Manufacturer is required"),
    cigarWrapper: z.string().nonempty("Wrapper is required"),
});

export default ProductSchema;
