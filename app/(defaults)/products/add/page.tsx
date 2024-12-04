"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), {
    ssr: false,
});
import "react-quill/dist/quill.snow.css";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { UploadIcon } from "@/components/icon/UploadIcon";
import { useCreateCigarMutation } from "@/store/api/cigar/cigarApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useGetAllBrandsQuery } from "@/store/api/brands/brandsApi";
import ProductSchema from "../../../../schema/ProductSchema";

export default function ProductUploadForm() {
    const router = useRouter();
    const { data: cigarBrands, isLoading: isLoadingCigarBrand } =
        useGetAllBrandsQuery([]);
    const [createCigar, { isLoading }] = useCreateCigarMutation();
    const [description, setDescription] = useState("");
    // const [file, setFile] = useState<File | null>(null);
    // const [filePreview, setFilePreview] = useState<string | null>(null);
    // const fileInputRef = useRef<HTMLInputElement>(null);
    // const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
    // const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

    // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const selectedFile = event.target.files?.[0];
    //     if (selectedFile) {
    //         setFile(selectedFile);
    //         const objectUrl = URL.createObjectURL(selectedFile);
    //         setFilePreview(objectUrl);
    //     }
    // };

    // const handleRemoveFile = () => {
    //     setFile(null);
    //     setFilePreview(null);
    //     if (fileInputRef.current) {
    //         fileInputRef.current.value = "";
    //     }
    // };

    // const handleGalleryChange = (
    //     event: React.ChangeEvent<HTMLInputElement>
    // ) => {
    //     const selectedFiles = Array.from(event.target.files || []);
    //     const newPreviews = selectedFiles.map((file) =>
    //         URL.createObjectURL(file)
    //     );
    //     setGalleryFiles(selectedFiles);
    //     setGalleryPreviews(newPreviews);
    // };

    // const handleRemoveGalleryImage = (index: number) => {
    //     const updatedFiles = galleryFiles.filter((_, i) => i !== index);
    //     const updatedPreviews = galleryPreviews.filter((_, i) => i !== index);
    //     setGalleryFiles(updatedFiles);
    //     setGalleryPreviews(updatedPreviews);
    // };

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(ProductSchema),
    });

    const handleDescriptionChange = (value: string) => {
        setDescription(value);
        setValue("productDescription", value);
    };

    const onSubmit = async (data: any) => {
        const toastID = toast.loading("Uploading Cigar");

        try {
            const res = await createCigar(data).unwrap();
            if (res?.success) {
                toast.success("Cigar added successfully", {
                    duration: 3000,
                    id: toastID,
                });
                router.push("/products/list");
            }
        } catch (error: any) {
            toast.error(error?.data?.message, {
                duration: 3000,
                id: toastID,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <CardHeader>
                    <CardTitle>Add New Cigar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="cigarName">Cigar Name</Label>
                            <Input
                                id="cigarName"
                                placeholder="Enter cigar title"
                                {...register("cigarName")}
                                className={`${
                                    errors?.cigarName
                                        ? "border-red-500 ring-red-500"
                                        : ""
                                }`}
                            />
                            {errors?.cigarName && (
                                <p className="text-red-500">
                                    {errors.cigarName.message as string}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="brandId">Brand</Label>
                            <Select
                                onValueChange={(value) =>
                                    setValue("brandId", value)
                                }
                                defaultValue={watch("brandId")}
                            >
                                <SelectTrigger id="brandId">
                                    <SelectValue placeholder="Select Brand" />
                                </SelectTrigger>
                                <SelectContent>
                                    {isLoadingCigarBrand ? (
                                        <SelectItem value="Loading">
                                            Loading Brands
                                        </SelectItem>
                                    ) : cigarBrands?.success ? (
                                        cigarBrands?.data?.map((brand: any) => (
                                            <SelectItem
                                                key={brand?.id}
                                                value={brand?.id}
                                            >
                                                {brand?.name}
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <SelectItem value="Not Selected">
                                            No Brands Available
                                        </SelectItem>
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="qrCode">QR Code</Label>
                            <Input
                                id="qrCode"
                                placeholder="Enter QR Code"
                                {...register("qrCode")}
                                className={`${
                                    errors?.qrCode
                                        ? "border-red-500 ring-red-500"
                                        : ""
                                }`}
                            />
                            {errors?.qrCode && (
                                <p className="text-red-500">
                                    {errors.qrCode.message as string}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="productDescription">Description</Label>
                        <ReactQuill
                            id="productDescription"
                            value={description}
                            onChange={handleDescriptionChange}
                            placeholder="Enter cigar description"
                            theme="snow"
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="cigarImage">Upload Image URL</Label>
                                <Input
                                    id="cigarImage"
                                    placeholder="Upload Image URL"
                                    {...register("cigarImage")}
                                    className={`${
                                        errors?.cigarImage
                                            ? "border-red-500 ring-red-500"
                                            : ""
                                    }`}
                                />
                                {errors?.cigarImage && (
                                    <p className="text-red-500">
                                        {errors.cigarImage.message as string}
                                    </p>
                                )}
                                {/* <div className="flex items-center gap-2">
                                    <Input
                                        {...register("cigarImage")}
                                        ref={fileInputRef}
                                        id="cigarImage"
                                        type="file"
                                        className="flex-1"
                                        onChange={handleFileChange}
                                    />
                                    <span className="rounded-md border p-2">
                                        <UploadIcon className="h-5 w-5" />
                                    </span>
                                </div>
                                {file && (
                                    <div className="mt-2 grid gap-2">
                                        <div className="flex items-center gap-2">
                                            <img
                                                src={
                                                    filePreview ||
                                                    "/placeholder.svg"
                                                }
                                                alt="File preview"
                                                width="64"
                                                height="64"
                                                className="rounded-md"
                                                style={{
                                                    aspectRatio: "64/64",
                                                    objectFit: "cover",
                                                }}
                                            />
                                            <div>
                                                <p className="font-medium">
                                                    {file.name}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {file.size < 1024
                                                        ? `${file.size} bytes`
                                                        : `${(
                                                              file.size / 1024
                                                          ).toFixed(2)} KB`}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex justify-end">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={handleRemoveFile}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                )} */}
                            </div>
                        </div>
                        {/* <div className="space-y-2">
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="gallery">Gallery Images</Label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        id="gallery"
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleGalleryChange}
                                        className={`flex-1 ${
                                            errors?.gallery
                                                ? "border-red-500 ring-red-500"
                                                : ""
                                        }`}
                                    />
                                    <span className="rounded-md border p-2">
                                        <UploadIcon className="h-5 w-5" />
                                    </span>
                                </div>
                                {errors?.gallery && (
                                    <p className="text-red-500">
                                        {errors.gallery.message as string}
                                    </p>
                                )}
                                <div className="mt-2 grid gap-2">
                                    {galleryPreviews.map((preview, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2"
                                        >
                                            <img
                                                src={preview}
                                                alt={`Gallery preview ${
                                                    index + 1
                                                }`}
                                                width="64"
                                                height="64"
                                                className="rounded-md"
                                                style={{
                                                    aspectRatio: "64/64",
                                                    objectFit: "cover",
                                                }}
                                            />
                                            <div>
                                                <p className="font-medium">
                                                    {galleryFiles[index].name}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {galleryFiles[index].size <
                                                    1024
                                                        ? `${galleryFiles[index].size} bytes`
                                                        : `${(
                                                              galleryFiles[
                                                                  index
                                                              ].size / 1024
                                                          ).toFixed(2)} KB`}
                                                </p>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    handleRemoveGalleryImage(
                                                        index
                                                    )
                                                }
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div> */}
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                            <Label htmlFor="cigarShape">Cigar Shape</Label>
                            <Input
                                id="cigarShape"
                                placeholder="Enter section"
                                {...register("cigarShape")}
                                className={`${
                                    errors?.cigarShape
                                        ? "border-red-500 ring-red-500"
                                        : ""
                                }`}
                            />
                            {errors?.cigarShape && (
                                <p className="text-red-500">
                                    {errors?.cigarShape?.message as string}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cigarSection">Cigar Section</Label>
                            <Input
                                id="cigarSection"
                                placeholder="Enter section"
                                {...register("cigarSection")}
                                className={`${
                                    errors?.cigarSection
                                        ? "border-red-500 ring-red-500"
                                        : ""
                                }`}
                            />
                            {errors?.cigarSection && (
                                <p className="text-red-500">
                                    {errors.cigarSection.message as string}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cigarLength">
                                Cigar Length (inches)
                            </Label>
                            <Input
                                id="cigarLength"
                                type="number"
                                step="0.1"
                                placeholder="Enter length"
                                {...register("cigarLength", {
                                    valueAsNumber: true,
                                })}
                                className={`${
                                    errors?.cigarLength
                                        ? "border-red-500 ring-red-500"
                                        : ""
                                }`}
                            />
                            {errors?.cigarLength && (
                                <p className="text-red-500">
                                    {errors.cigarLength.message as string}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                            <Label htmlFor="origin">Origin</Label>
                            <Input
                                id="origin"
                                placeholder="Enter origin"
                                {...register("origin")}
                                className={`${
                                    errors?.origin
                                        ? "border-red-500 ring-red-500"
                                        : ""
                                }`}
                            />
                            {errors?.origin && (
                                <p className="text-red-500">
                                    {errors.origin.message as string}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cigarRingGauge">
                                Cigar Ring Gauge
                            </Label>
                            <Input
                                id="cigarRingGauge"
                                type="number"
                                placeholder="Enter ring gauge"
                                {...register("cigarRingGauge", {
                                    valueAsNumber: true,
                                })}
                                className={`${
                                    errors?.cigarRingGauge
                                        ? "border-red-500 ring-red-500"
                                        : ""
                                }`}
                            />
                            {errors?.cigarRingGauge && (
                                <p className="text-red-500">
                                    {errors.cigarRingGauge.message as string}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="strength">Strength</Label>
                            <Input
                                id="strength"
                                placeholder="Enter wrapper color"
                                {...register("strength")}
                                className={`${
                                    errors?.strength
                                        ? "border-red-500 ring-red-500"
                                        : ""
                                }`}
                            />
                            {errors?.strength && (
                                <p className="text-red-500">
                                    {errors?.strength?.message as string}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                            <Label htmlFor="wrapperColor">Wrapper Color</Label>
                            <Input
                                id="wrapperColor"
                                placeholder="Enter wrapper color"
                                {...register("wrapperColor")}
                                className={`${
                                    errors?.wrapperColor
                                        ? "border-red-500 ring-red-500"
                                        : ""
                                }`}
                            />
                            {errors?.wrapperColor && (
                                <p className="text-red-500">
                                    {errors.wrapperColor.message as string}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="rollingType">Rolling Type</Label>
                            <Input
                                id="rollingType"
                                placeholder="Enter rolling type"
                                {...register("rollingType")}
                                className={`${
                                    errors?.rollingType
                                        ? "border-red-500 ring-red-500"
                                        : ""
                                }`}
                            />
                            {errors?.rollingType && (
                                <p className="text-red-500">
                                    {errors.rollingType.message as string}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cigarManufacturer">
                                Manufacturer
                            </Label>
                            <Input
                                id="cigarManufacturer"
                                placeholder="Enter manufacturer"
                                {...register("cigarManufacturer")}
                                className={`${
                                    errors?.cigarManufacturer
                                        ? "border-red-500 ring-red-500"
                                        : ""
                                }`}
                            />
                            {errors?.cigarManufacturer && (
                                <p className="text-red-500">
                                    {errors.cigarManufacturer.message as string}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="cigarWrapper">Wrapper</Label>
                        <Input
                            id="cigarWrapper"
                            placeholder="Enter wrapper"
                            {...register("cigarWrapper")}
                            className={`${
                                errors?.cigarWrapper
                                    ? "border-red-500 ring-red-500"
                                    : ""
                            }`}
                        />
                        {errors?.cigarWrapper && (
                            <p className="text-red-500">
                                {errors.cigarWrapper.message as string}
                            </p>
                        )}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button disabled={isLoading} type="submit">
                        {isLoading ? "Uploading" : "Submit"}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}
