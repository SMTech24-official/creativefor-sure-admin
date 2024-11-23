"use client";

import { useGetAllUsersQuery } from "@/store/api/allUsers/usersApi";
import { sortBy } from "lodash";
import { DataTableSortStatus, DataTable } from "mantine-datatable";
import React, { useEffect, useState } from "react";

const UsersTable = () => {
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [search, setSearch] = useState("");
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: "firstName",
        direction: "asc",
    });

    // Fetch data for the current page with page and limit
    const { data: usersData, isLoading: isLoadingUsers } = useGetAllUsersQuery({
        page,
        limit: pageSize,
    });

    // Store processed records and filtered records
    const [initialRecords, setInitialRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);

    // Process and store users from API response
    useEffect(() => {
        if (usersData && usersData.data) {
            const processedUsers = usersData?.data?.data?.map((user: any) => ({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                mobile: user.mobile,
                userStatus: user.userStatus,
                createdAt: new Date(user.createdAt).toLocaleDateString(),
            }));
            setInitialRecords(processedUsers);
        }
    }, [usersData]);

    // Apply search and sort filters on the frontend
    useEffect(() => {
        const searchFilteredRecords = initialRecords.filter((record) =>
            Object.values(record).some((value) =>
                String(value).toLowerCase().includes(search.toLowerCase())
            )
        );

        const sortedRecords = sortBy(
            searchFilteredRecords,
            sortStatus.columnAccessor
        );

        const sortedAndFilteredRecords =
            sortStatus.direction === "desc"
                ? sortedRecords.reverse()
                : sortedRecords;

        setFilteredRecords(sortedAndFilteredRecords);
    }, [search, sortStatus, initialRecords]);

    if (isLoadingUsers) {
        return <p>Loading...</p>;
    }

    // Calculate the range of records being displayed
    const fromRecord = (page - 1) * pageSize + 1;
    const toRecord = Math.min(page * pageSize, filteredRecords.length);

    return (
        <div className="panel border-white-light px-0 dark:border-[#1b2e4b]">
            <div className="mb-4.5 flex flex-col gap-5 px-5 md:flex-row md:items-center">
                <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold">Users</h2>
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
                    records={filteredRecords.slice(
                        (page - 1) * pageSize,
                        page * pageSize
                    )}
                    columns={[
                        {
                            accessor: "firstName",
                            sortable: true,
                            title: "First Name",
                        },
                        {
                            accessor: "lastName",
                            sortable: true,
                            title: "Last Name",
                        },
                        {
                            accessor: "email",
                            sortable: true,
                        },
                        {
                            accessor: "role",
                            sortable: true,
                        },
                        {
                            accessor: "mobile",
                            sortable: false,
                        },
                        {
                            accessor: "status",
                            sortable: true,
                            render: ({ userStatus }) => (
                                <span
                                    className={`badge ${
                                        userStatus === "ACTIVE"
                                            ? "badge-outline-success"
                                            : "badge-outline-danger"
                                    }`}
                                >
                                    {userStatus === "ACTIVE"
                                        ? "Active"
                                        : "Inactive"}
                                </span>
                            ),
                        },
                        {
                            accessor: "createdAt",
                            sortable: true,
                            title: "Created At",
                        },
                    ]}
                    highlightOnHover
                    totalRecords={filteredRecords.length}
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
    );
};

export default UsersTable;
