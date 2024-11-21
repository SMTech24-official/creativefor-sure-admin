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

const updateBrandForm = ({ params }: any) => {
    const [updateBrand, { isLoading: isUpdatingBrand }] =
        useUpdateBrandMutation();
    const { data: brand, isLoading: isLoadingBrand } = useGetBrandQuery(
        params?.id
    );
    console.log(brand);

    // brands form zod validation
    const form = useForm<BrandNameFormValues>({
        resolver: zodResolver(brandNameSchema),
        defaultValues: {
            brandName: "",
        },
    });

    // create brand
    const onSubmit = async (data: BrandNameFormValues) => {
        console.log(data);
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
                                            value={brand?.data?.brandName}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="mt-4 bg-[#4361ee]">
                            Update
                        </Button>
                    </form>
                </Form>
            )}
        </div>
    );
};

export default updateBrandForm;
