"use client";
import { DataTable, DataTableSortStatus } from "mantine-datatable";
import { useEffect, useState } from "react";
import sortBy from "lodash/sortBy";

const rowData = [
    {
        id: 1,
        firstName: "Caroline",
        lastName: "Jensen",
        email: "carolinejensen@zidant.com",
        dob: "2004-05-28",
        address: {
            street: "529 Scholes Street",
            city: "Temperanceville",
            zipcode: 5235,
            geo: {
                lat: 23.806115,
                lng: 164.677197,
            },
        },
        phone: "+1 (821) 447-3782",
        isActive: true,
        age: 39,
        company: "POLARAX",
    },
    {
        id: 2,
        firstName: "Celeste",
        lastName: "Grant",
        email: "celestegrant@polarax.com",
        dob: "1989-11-19",
        address: {
            street: "639 Kimball Street",
            city: "Bascom",
            zipcode: 8907,
            geo: {
                lat: 65.954483,
                lng: 98.906478,
            },
        },
        phone: "+1 (838) 515-3408",
        isActive: false,
        age: 32,
        company: "MANGLO",
    },
    {
        id: 3,
        firstName: "Tillman",
        lastName: "Forbes",
        email: "tillmanforbes@manglo.com",
        dob: "2016-09-05",
        address: {
            street: "240 Vandalia Avenue",
            city: "Thynedale",
            zipcode: 8994,
            geo: {
                lat: -34.949388,
                lng: -82.958111,
            },
        },
        phone: "+1 (969) 496-2892",
        isActive: false,
        age: 26,
        company: "APPLIDECK",
    },
    {
        id: 4,
        firstName: "Daisy",
        lastName: "Whitley",
        email: "daisywhitley@applideck.com",
        dob: "1987-03-23",
        address: {
            street: "350 Pleasant Place",
            city: "Idledale",
            zipcode: 9369,
            geo: {
                lat: -54.458809,
                lng: -127.476556,
            },
        },
        phone: "+1 (861) 564-2877",
        isActive: true,
        age: 21,
        company: "VOLAX",
    },
];

const ComponentsDatatablesMultiColumn = () => {
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(
        sortBy(rowData, "firstName")
    );
    const [recordsData, setRecordsData] = useState(initialRecords);

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
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return rowData.filter((item) => {
                return (
                    item.firstName
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    item.lastName
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    item.company.toLowerCase().includes(search.toLowerCase()) ||
                    item.email.toLowerCase().includes(search.toLowerCase()) ||
                    item.age
                        .toString()
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    item.dob.toLowerCase().includes(search.toLowerCase()) ||
                    item.phone.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(
            sortStatus.direction === "desc" ? data.reverse() : data
        );
        setPage(1);
    }, [sortStatus]);

    const formatDate = (date: any) => {
        if (date) {
            const dt = new Date(date);
            const month =
                dt.getMonth() + 1 < 10
                    ? "0" + (dt.getMonth() + 1)
                    : dt.getMonth() + 1;
            const day = dt.getDate() < 10 ? "0" + dt.getDate() : dt.getDate();
            return day + "/" + month + "/" + dt.getFullYear();
        }
        return "";
    };

    return (
        <div className="panel mt-6">
            <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
                <h5 className="text-lg font-semibold dark:text-white-light">
                    Multicolumn
                </h5>
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
            <div className="datatables">
                <DataTable
                    highlightOnHover
                    className="table-hover whitespace-nowrap"
                    records={recordsData}
                    columns={[
                        {
                            accessor: "firstName",
                            title: "User",
                            sortable: true,
                            render: ({ firstName, lastName, id }) => (
                                <div className="flex w-max items-center">
                                    <img
                                        className="h-9 w-9 rounded-full object-cover ltr:mr-2 rtl:ml-2"
                                        src={`/assets/images/profile-${id}.jpeg`}
                                        alt=""
                                    />
                                    <div>{firstName + " " + lastName}</div>
                                </div>
                            ),
                        },
                        {
                            accessor: "company",
                            title: "Company",
                            sortable: true,
                        },
                        { accessor: "age", title: "Age", sortable: true },
                        {
                            accessor: "dob",
                            title: "Start Date",
                            sortable: true,
                            render: ({ dob }) => <div>{formatDate(dob)}</div>,
                        },
                        { accessor: "email", sortable: true },
                        {
                            accessor: "phone",
                            title: "Phone No.",
                            sortable: true,
                        },
                    ]}
                    totalRecords={initialRecords.length}
                    recordsPerPage={pageSize}
                    page={page}
                    onPageChange={(p) => setPage(p)}
                    recordsPerPageOptions={PAGE_SIZES}
                    onRecordsPerPageChange={setPageSize}
                    sortStatus={sortStatus}
                    onSortStatusChange={setSortStatus}
                    minHeight={200}
                    paginationText={({ from, to, totalRecords }) =>
                        `Showing  ${from} to ${to} of ${totalRecords} entries`
                    }
                />
            </div>
        </div>
    );
};

export default ComponentsDatatablesMultiColumn;
