"use client";

import { useEffect, useState } from "react";
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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { UploadIcon } from "@/components/icon/UploadIcon";
import {
    useGetCigarQuery,
    useUpdateCigarMutation,
} from "@/store/api/cigar/cigarApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import ProductSchema from "../../add/ProductSchema";

export default function ProductUploadForm({ params }: any) {
    const router = useRouter();
    const [updateCigar, { isLoading: isUpdatingCigar }] =
        useUpdateCigarMutation();
    const { data: cigarData, isLoading: isLoadingCigarData } = useGetCigarQuery(
        params?.id
    );
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
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            cigarName: "",
            cigarImage: "",
            cigarShape: "",
            cigarSection: "",
            cigarLength: "",
            origin: "",
            cigarRingGauge: "",
            strength: "",
            wrapperColor: "",
            rollingType: "",
            cigarManufacturer: "",
            cigarWrapper: "",
            qrCode: "",
            brandId: "",
            productDescription: "",
        },
    });

    useEffect(() => {
        if (cigarData?.data) {
            reset({
                cigarName: cigarData.data.cigarName,
                cigarImage: cigarData.data.cigarImage,
                cigarShape: cigarData.data.cigarShape,
                cigarSection: cigarData.data.cigarSection,
                cigarLength: cigarData.data.cigarLength,
                origin: cigarData.data.origin,
                cigarRingGauge: cigarData.data.cigarRingGauge,
                strength: cigarData.data.strength,
                wrapperColor: cigarData.data.wrapperColor,
                rollingType: cigarData.data.rollingType,
                cigarManufacturer: cigarData.data.cigarManufacturer,
                cigarWrapper: cigarData.data.cigarWrapper,
                qrCode: cigarData.data.qrCode,
                brandId: cigarData.data.brandId,
                productDescription: cigarData.data.productDescription,
            });
        }
    }, [cigarData, reset]);

    const handleDescriptionChange = (value: string) => {
        setDescription(value);
        setValue("productDescription", value);
    };

    const onSubmit = async (data: any) => {
        const toastID = toast.loading("Updating Cigar");
        try {
            const res = await updateCigar({ data, id: params?.id }).unwrap();
            if (res?.success) {
                toast.success("Cigar updated successfully", {
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
                                    {errors.cigarName.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="brandId">Brand</Label>
                            <Input
                                id="brandId"
                                placeholder="Enter cigar brand"
                                {...register("brandId")}
                                className={`${
                                    errors?.brandId
                                        ? "border-red-500 ring-red-500"
                                        : ""
                                }`}
                            />
                            {errors?.brandId && (
                                <p className="text-red-500">
                                    {errors.brandId.message}
                                </p>
                            )}
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
                                    {errors?.qrCode.message}
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
                                <Label htmlFor="cigarImage">Upload File</Label>
                                <Input
                                    id="cigarImage"
                                    placeholder="Enter QR Code"
                                    {...register("cigarImage")}
                                    className={`${
                                        errors?.cigarImage
                                            ? "border-red-500 ring-red-500"
                                            : ""
                                    }`}
                                />
                                {errors?.cigarImage && (
                                    <p className="text-red-500">
                                        {errors.cigarImage.message}
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
                                        {errors.gallery.message }
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
                            <Select
                                onValueChange={(value) =>
                                    setValue("cigarShape", value)
                                }
                                value={watch("cigarShape")}
                            >
                                <SelectTrigger id="cigarShape">
                                    <SelectValue placeholder="Select shape" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="parejo">
                                        Parejo
                                    </SelectItem>
                                    <SelectItem value="figurado">
                                        Figurado
                                    </SelectItem>
                                    <SelectItem value="torpedo">
                                        Torpedo
                                    </SelectItem>
                                    <SelectItem value="robusto">
                                        Robusto
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            {errors?.cigarShape && (
                                <p className="text-red-500">
                                    {errors.cigarShape.message}
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
                                    {errors.cigarSection.message}
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
                                    {errors.cigarLength.message}
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
                                    {errors.origin.message}
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
                                    {errors.cigarRingGauge.message}
                                </p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="strength">Strength</Label>
                            <Select
                                onValueChange={(value) =>
                                    setValue("strength", value)
                                }
                                defaultValue={watch("strength")}
                            >
                                <SelectTrigger id="strength">
                                    <SelectValue placeholder="Select strength" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="mild">Mild</SelectItem>
                                    <SelectItem value="medium">
                                        Medium
                                    </SelectItem>
                                    <SelectItem value="full">Full</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors?.strength && (
                                <p className="text-red-500">
                                    {errors.strength.message}
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
                                    {errors.wrapperColor.message}
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
                                    {errors.rollingType.message}
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
                                    {errors.cigarManufacturer.message}
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
                                {errors?.cigarWrapper.message}
                            </p>
                        )}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button disabled={isUpdatingCigar} type="submit">
                        {isUpdatingCigar ? "Updating" : "Update"}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
}
