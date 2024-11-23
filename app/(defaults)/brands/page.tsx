"use client";

import {
    BrandNameFormValues,
    brandNameSchema,
} from "@/components/brands/BrandsSchema";
import IconEdit from "@/components/icon/icon-edit";
// import IconPlus from "@/components/icon/icon-plus";
import IconTrashLines from "@/components/icon/icon-trash-lines";
import {
    useCreateBrandMutation,
    useDeleteBrandMutation,
    useGetAllBrandsQuery,
} from "@/store/api/brands/brandsApi";
import { Brand } from "@/types/brands";
import { zodResolver } from "@hookform/resolvers/zod";
import { sortBy } from "lodash";
import { DataTableSortStatus, DataTable } from "mantine-datatable";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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

const BrandsTable: React.FC = () => {
    const [createBrand, { isLoading: isCreatingBrand }] =
        useCreateBrandMutation();
    const [deleteBrand, { isLoading: isDeletingBrands }] =
        useDeleteBrandMutation();
    const { data: brands, isLoading: isLoadingBrands } = useGetAllBrandsQuery(
        []
    );
    const [page, setPage] = useState<number>(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState<number>(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<Brand[]>([]);
    const [records, setRecords] = useState<Brand[]>([]);
    const [search, setSearch] = useState<string>("");
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: "name",
        direction: "asc",
    });

    // brands form zod validation
    const form = useForm<BrandNameFormValues>({
        resolver: zodResolver(brandNameSchema),
        defaultValues: {
            brandName: "",
        },
    });

    // sort brands by name
    useEffect(() => {
        if (brands?.data) {
            const sortedBrands = sortBy(brands.data, "name");
            setInitialRecords(sortedBrands);
            setRecords(sortedBrands.slice(0, pageSize));
        }
    }, [brands, pageSize]);

    // table page
    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    // search brands
    useEffect(() => {
        if (brands?.data) {
            const filteredBrands = brands.data.filter((brand: Brand) =>
                brand.name.toLowerCase().includes(search.toLowerCase())
            );
            setInitialRecords(filteredBrands);
        }
    }, [search, brands]);

    // sort records
    useEffect(() => {
        const sortedRecords = sortBy(initialRecords, sortStatus.columnAccessor);
        setRecords(
            sortStatus.direction === "desc"
                ? sortedRecords.reverse()
                : sortedRecords
        );
        setPage(1);
    }, [sortStatus, initialRecords]);

    // create brand
    const onSubmit = async (data: BrandNameFormValues) => {
        const toastID = toast.loading("Creating Brand");
        try {
            const res = await createBrand(data).unwrap();
            if (res?.success) {
                toast.success("Brand created successfully", { id: toastID });
                const updatedRecords = [...initialRecords, res.data];
                setInitialRecords(updatedRecords);
                setRecords(updatedRecords.slice(0, pageSize));
                form.reset();
            } else {
                toast.error("Failed to create brand", { id: toastID });
            }
        } catch (err: any) {
            toast.error(err?.data?.message, { id: toastID });
        }
    };

    // delete brand
    const deleteRow = async (id: string) => {
        const toastID = toast.loading("Deleting Brand");
        try {
            const res = await deleteBrand(id).unwrap();
            if (res?.success) {
                toast.success("Brand deleted successfully", { id: toastID });
                const updatedRecords = initialRecords.filter(
                    (record) => record.id !== id
                );
                setInitialRecords(updatedRecords);
                setRecords(updatedRecords.slice(0, pageSize));
            } else {
                toast.error("Failed to delete brand", { id: toastID });
            }
        } catch (err: any) {
            toast.error(err?.data?.message, { id: toastID });
        }
    };

    return (
        <div className="grid grid-cols-2 items-start gap-6">
            <div className="panel border-white-light p-5 dark:border-[#1b2e4b]">
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
                            disabled={isCreatingBrand}
                        >
                            {isCreatingBrand ? "Creating brand..." : "Submit"}
                        </Button>
                    </form>
                </Form>
            </div>

            <div className="panel border-white-light px-0 dark:border-[#1b2e4b]">
                {isLoadingBrands ? (
                    <p className="px-5">Loading Brands...</p>
                ) : (
                    <div className="invoice-table">
                        <div className="mb-4.5 flex flex-col gap-5 px-5 md:flex-row md:items-center">
                            <div className="flex items-center gap-2">
                                <h2 className="text-xl font-bold">Brands</h2>
                            </div>
                            <div className="ltr:ml-auto rtl:mr-auto">
                                <input
                                    type="text"
                                    className="form-input w-auto"
                                    placeholder="Search..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="datatables pagination-padding">
                            <DataTable
                                className="table-hover whitespace-nowrap"
                                records={records}
                                columns={[
                                    {
                                        accessor: "name",
                                        sortable: true,
                                        render: ({ name }) => (
                                            <div className="flex items-center font-semibold">
                                                <div>{name}</div>
                                            </div>
                                        ),
                                    },
                                    {
                                        accessor: "action",
                                        title: "Actions",
                                        sortable: false,
                                        textAlignment: "center",
                                        render: ({ id }: Brand) => (
                                            <div className="mx-auto flex w-max items-center gap-4">
                                                <Link
                                                    href={`/brands/edit/${id}`}
                                                    className="flex hover:text-info"
                                                >
                                                    <IconEdit className="h-4.5 w-4.5" />
                                                </Link>
                                                <button
                                                    type="button"
                                                    className="flex hover:text-danger"
                                                    onClick={() =>
                                                        deleteRow(id)
                                                    }
                                                    disabled={isDeletingBrands}
                                                >
                                                    <IconTrashLines />
                                                </button>
                                            </div>
                                        ),
                                    },
                                ]}
                                highlightOnHover
                                totalRecords={initialRecords.length}
                                recordsPerPage={pageSize}
                                page={page}
                                onPageChange={(p) => setPage(p)}
                                recordsPerPageOptions={PAGE_SIZES}
                                onRecordsPerPageChange={setPageSize}
                                sortStatus={sortStatus}
                                onSortStatusChange={setSortStatus}
                                paginationText={({ from, to, totalRecords }) =>
                                    `Showing ${from} to ${to} of ${totalRecords} entries`
                                }
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BrandsTable;
