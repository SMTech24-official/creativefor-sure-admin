"use client";

import {
    BrandNameFormValues,
    brandNameSchema,
} from "@/components/brands/BrandsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    useGetBrandQuery,
    useUpdateBrandMutation,
} from "@/store/api/brands/brandsApi";
import { useEffect } from "react";

const UpdateBrandForm = ({ params }: any) => {
    const [updateBrand, { isLoading: isUpdatingBrand }] =
        useUpdateBrandMutation();
    const { data: brand, isLoading: isLoadingBrand } = useGetBrandQuery(
        params?.id
    );

    console.log(brand);

    // Initialize form with Zod validation
    const form = useForm<BrandNameFormValues>({
        resolver: zodResolver(brandNameSchema),
        defaultValues: {
            brandName: "",
        },
    });

    // Sync form values when brand data is fetched
    useEffect(() => {
        if (brand?.data?.brandName) {
            form.reset({
                brandName: brand?.data?.brandName,
            });
        }
    }, [brand, form]);

    // Handle form submission
    const onSubmit = async (data: BrandNameFormValues) => {
        const toastID = toast.loading("Updating Brand...");
        try {
            const res = await updateBrand({
                data: data,
                id: params?.id,
            }).unwrap();
            if (res?.success) {
                toast.success("Brand updated successfully", {
                    duration: 3000,
                    id: toastID,
                });
            } else {
                toast.error(res?.message, {
                    duration: 3000,
                    id: toastID,
                });
            }
        } catch (err: any) {
            toast.error(err?.data?.message || "An error occurred", {
                duration: 3000,
                id: toastID,
            });
        }
    };

    return (
        <div className="panel border-white-light p-5 dark:border-[#1b2e4b]">
            {isLoadingBrand ? (
                <div>Loading...</div>
            ) : (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="mb-2"
                    >
                        <FormField
                            control={form.control}
                            name="brandName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Brand Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your brand name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="mt-4 bg-[#4361ee]"
                            disabled={isUpdatingBrand}
                        >
                            {isUpdatingBrand ? "Updating..." : "Update"}
                        </Button>
                    </form>
                </Form>
            )}
        </div>
    );
};

export default UpdateBrandForm;
