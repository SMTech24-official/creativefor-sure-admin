import { z } from 'zod';

const ProductSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    brand: z.string().min(1, 'Brand is required'),
    barcode: z.string().min(1, 'Barcode is required'),
    description: z.string().optional(),
    image: z
        .any()
        .nullable()
        .refine((file) => !file || (file && file[0]?.type.startsWith('image/')), 'File must be an image'),
    gallery: z
        .any()
        .nullable()
        .refine((files) => !files || (Array.isArray(files) && files.every((file) => file?.type.startsWith('image/'))), 'All files must be images'),
    shape: z.string().optional(),
    section: z.string().min(1, 'Section is required'),
    length: z.number().min(0, 'Length must be a positive number'),
    origin: z.string().min(1, 'Origin is required'),
    ringGauge: z.number().min(0, 'Ring gauge must be a positive number'),
    strength: z.string().optional(),
    wrapperColor: z.string().min(1, 'Wrapper color is required'),
    rollingType: z.string().min(1, 'Rolling type is required'),
    manufacturer: z.string().min(1, 'Manufacturer is required'),
    wrapper: z.string().min(1, 'Wrapper is required'),
    binder: z.string().min(1, 'Binder is required'),
    filter: z.string().optional(),
});

export default ProductSchema;
