"use client";
import React, { useEffect, useState } from "react";
import IconEdit from "@/components/icon/icon-edit";
import IconPlus from "@/components/icon/icon-plus";
import IconTrashLines from "@/components/icon/icon-trash-lines";
import { sortBy } from "lodash";
import { DataTableSortStatus, DataTable } from "mantine-datatable";
import Link from "next/link";
import {
    useDeleteCigarMutation,
    useGetAllCigarsQuery,
} from "@/store/api/cigar/cigarApi";
import { Cigar } from "@/types/cigar";
import { toast } from "sonner";
import "@/styles/productTable.css";

const ProductsTable = () => {
    // redux query
    const [deleteCigar, { isLoading: isCigarDeleting }] =
        useDeleteCigarMutation();
    const { data: cigarData, isLoading: loadingCigarData } =
        useGetAllCigarsQuery([]);
    // const {} = use;

    // states
    const [items, setItems] = useState<Cigar[]>([]);
    const [initialRecords, setInitialRecords] = useState<Cigar[]>([]);
    const [records, setRecords] = useState<Cigar[]>([]);
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [search, setSearch] = useState("");
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: "cigarName",
        direction: "asc",
    });

    // Fetch and format data from the API
    useEffect(() => {
        if (cigarData?.data) {
            const formattedData: Cigar[] = cigarData?.data?.data?.map(
                (cigar: any) => ({
                    id: cigar?.id,
                    cigarName: cigar?.cigarName,
                    cigarImage: cigar?.cigarImage,
                    cigarLength: cigar?.cigarLength,
                    cigarRingGauge: cigar?.cigarRingGauge,
                    strength: cigar?.strength,
                    wrapperColor: cigar?.wrapperColor,
                    createdAt: new Date(cigar?.createdAt).toLocaleDateString(),
                })
            );
            setItems(formattedData);
            setInitialRecords(sortBy(formattedData, "cigarName"));
        }
    }, [cigarData]);

    // Update paginated records based on page and page size
    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    // Search functionality
    useEffect(() => {
        setInitialRecords(() =>
            items.filter((item) =>
                Object.values(item).some((val) =>
                    val.toString().toLowerCase().includes(search.toLowerCase())
                )
            )
        );
    }, [search]);

    // Sorting functionality
    useEffect(() => {
        const sortedData = sortBy(initialRecords, sortStatus.columnAccessor);
        setRecords(
            sortStatus.direction === "desc" ? sortedData.reverse() : sortedData
        );
        setPage(1);
    }, [sortStatus]);

    const deleteRow = async (id: any) => {
        const toastID = toast.loading("Deleting Product");

        try {
            const res = await deleteCigar(id).unwrap();
            if (res?.success) {
                const updatedItems = items.filter((item) => item.id !== id);
                setItems(updatedItems);
                setInitialRecords(updatedItems);
                setRecords(updatedItems);
                setSearch("");
                toast.success("Cigar deleted successfully", { id: toastID });
            } else {
                toast.error("Failed to delete cigar", { id: toastID });
            }
        } catch (error: any) {
            toast.error(error?.data?.message, { id: toastID });
        }
    };

    if (loadingCigarData) return <div>Loading...</div>;

    return (
        <div className="panel border-white-light px-0 dark:border-[#1b2e4b]">
            <div className="invoice-table">
                <div className="mb-4.5 flex flex-col justify-between gap-5 px-5 md:flex-row md:items-center">
                    <div className="flex items-center gap-2">
                        <Link
                            href="/products/add"
                            className="btn btn-primary gap-2"
                        >
                            <IconPlus />
                            Add New
                        </Link>
                    </div>
                    <div className="">
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
                                accessor: "cigarName",
                                sortable: true,
                                cellsClassName: "cigar-name",
                                render: ({ cigarName, cigarImage }) => (
                                    <div className="flex items-center gap-3 font-semibold">
                                        <img
                                            className="h-14 w-14 rounded-lg object-cover"
                                            src={
                                                cigarImage || "/placeholder.png"
                                            }
                                            alt={cigarName}
                                        />
                                        <div>{cigarName}</div>
                                    </div>
                                ),
                            },
                            {
                                accessor: "createdAt",
                                title: "Created At",
                                sortable: true,
                            },
                            {
                                accessor: "cigarLength",
                                title: "Length (mm)",
                                sortable: true,
                            },
                            {
                                accessor: "cigarRingGauge",
                                title: "Ring Gauge",
                                sortable: true,
                            },
                            {
                                accessor: "strength",
                                title: "Strength",
                                sortable: true,
                            },
                            {
                                accessor: "action",
                                title: "Actions",
                                sortable: false,
                                textAlignment: "center",
                                render: ({ id }) => (
                                    <div className="flex items-center justify-center gap-2">
                                        <Link
                                            href={`/products/edit/${id}`}
                                            className="flex hover:text-info"
                                        >
                                            <IconEdit />
                                        </Link>
                                        <button
                                            type="button"
                                            className="flex hover:text-danger"
                                            onClick={() => deleteRow(id)}
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
                        onPageChange={setPage}
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
        </div>
    );
};

export default ProductsTable;
