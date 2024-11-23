"use client";
import IconEdit from "@/components/icon/icon-edit";
import IconEye from "@/components/icon/icon-eye";
import IconPlus from "@/components/icon/icon-plus";
import IconTrashLines from "@/components/icon/icon-trash-lines";
import { sortBy } from "lodash";
import { DataTableSortStatus, DataTable } from "mantine-datatable";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const UsersTable = () => {
    const [items, setItems] = useState([
        {
            id: 1,
            invoice: "081451",
            name: "Laurie Fox",
            email: "lauriefox@company.com",
            date: "15 Dec 2020",
            amount: "2275.45",
            status: { tooltip: "Paid", color: "success" },
            profile: "profile-1.jpeg",
        },
        {
            id: 2,
            invoice: "081452",
            name: "Alexander Gray",
            email: "alexGray3188@gmail.com",
            date: "20 Dec 2020",
            amount: "1044.00",
            status: { tooltip: "Paid", color: "success" },
            profile: "profile-1.jpeg",
        },
        {
            id: 3,
            invoice: "081681",
            name: "James Taylor",
            email: "jamestaylor468@gmail.com",
            date: "27 Dec 2020",
            amount: "20.00",
            status: { tooltip: "Pending", color: "danger" },
            profile: "profile-1.jpeg",
        },
        {
            id: 4,
            invoice: "082693",
            name: "Grace Roberts",
            email: "graceRoberts@company.com",
            date: "31 Dec 2020",
            amount: "344.00",
            status: { tooltip: "Paid", color: "success" },
            profile: "profile-1.jpeg",
        },
    ]);

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(
        sortBy(items, "invoice")
    );
    const [records, setRecords] = useState(initialRecords);

    const [search, setSearch] = useState("");
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: "firstName",
        direction: "asc",
    });

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return items.filter((item) => {
                return (
                    item.invoice.toLowerCase().includes(search.toLowerCase()) ||
                    item.name.toLowerCase().includes(search.toLowerCase()) ||
                    item.email.toLowerCase().includes(search.toLowerCase()) ||
                    item.date.toLowerCase().includes(search.toLowerCase()) ||
                    item.amount.toLowerCase().includes(search.toLowerCase()) ||
                    item.status.tooltip
                        .toLowerCase()
                        .includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data2 = sortBy(initialRecords, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === "desc" ? data2.reverse() : data2);
        setPage(1);
    }, [sortStatus]);

    const deleteRow = (id: any = null) => {
        console.log(id);
    };

    return (
        <div className="panel border-white-light px-0 dark:border-[#1b2e4b]">
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
                                accessor: "invoice",
                                sortable: true,
                                render: ({ invoice }) => (
                                    <Link href="/apps/invoice/preview">
                                        <div className="font-semibold text-primary underline hover:no-underline">{`#${invoice}`}</div>
                                    </Link>
                                ),
                            },
                            {
                                accessor: "name",
                                sortable: true,
                                render: ({ name, id }) => (
                                    <div className="flex items-center font-semibold">
                                        <div className="w-max rounded-full bg-white-dark/30 p-0.5 ltr:mr-2 rtl:ml-2">
                                            <img
                                                className="h-8 w-8 rounded-full object-cover"
                                                src={`/assets/images/profile-${id}.jpeg`}
                                                alt=""
                                            />
                                        </div>
                                        <div>{name}</div>
                                    </div>
                                ),
                            },
                            {
                                accessor: "email",
                                sortable: true,
                            },
                            {
                                accessor: "date",
                                sortable: true,
                            },
                            {
                                accessor: "amount",
                                sortable: true,
                                titleClassName: "text-right",
                                render: ({ amount, id }) => (
                                    <div className="text-right font-semibold">{`$${amount}`}</div>
                                ),
                            },
                            {
                                accessor: "status",
                                sortable: true,
                                render: ({ status }) => (
                                    <span
                                        className={`badge badge-outline-${status.color} `}
                                    >
                                        {status.tooltip}
                                    </span>
                                ),
                            },
                            {
                                accessor: "action",
                                title: "Actions",
                                sortable: false,
                                textAlignment: "center",
                                render: ({ id }) => (
                                    <div className="mx-auto flex w-max items-center gap-4">
                                        <Link
                                            href="/apps/invoice/edit"
                                            className="flex hover:text-info"
                                        >
                                            <IconEdit className="h-4.5 w-4.5" />
                                        </Link>
                                        <Link
                                            href="/apps/invoice/preview"
                                            className="flex hover:text-primary"
                                        >
                                            <IconEye />
                                        </Link>
                                        <button
                                            type="button"
                                            className="flex hover:text-danger"
                                            onClick={(e) => deleteRow(id)}
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
                            `Showing  ${from} to ${to} of ${totalRecords} entries`
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default UsersTable;
