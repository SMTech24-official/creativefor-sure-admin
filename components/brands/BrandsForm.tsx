"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { BrandNameFormValues, brandNameSchema } from "./BrandsSchema";

const BrandNameForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<BrandNameFormValues>({
        resolver: zodResolver(brandNameSchema),
        defaultValues: {
            brandName: "",
        },
    });

    async function onSubmit(data: BrandNameFormValues) {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(data);
        setIsSubmitting(false);
        // Here you would typically send the data to your backend
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
            </form>
        </Form>
    );
};

export default BrandNameForm;
