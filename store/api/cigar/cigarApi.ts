import { baseApi } from "../baseApi";

const cigarApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllCigars: build.query({
            query: () => ({
                url: `/cigarData`,
                method: "GET",
            }),
            providesTags: ["Cigars"],
        }),

        createCigar: build.mutation({
            query: (data: any) => ({
                url: `/cigarData`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Cigars"],
        }),

        updateCigar: build.mutation({
            query: ({ data, id }: { data: any; id: string }) => ({
                url: `/cigarData/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Cigars"],
        }),

        getCigar: build.query({
            query: (id: number) => ({
                url: `/cigarData/${id}`,
                method: "GET",
            }),
            providesTags: ["Cigars"],
        }),

        deleteCigar: build.mutation({
            query: (id: string) => ({
                url: `/cigarData/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Cigars"],
        }),
        postCSV: build.mutation({
            query: (data: any) => ({
                url: `/cigarData/csv-upload`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Cigars"],
        }),
        downloadMissingField: build.query({
            query: () => ({
                url: `/cigarData/download-missing-fields`,
                method: "GET",
            }),
            providesTags: ["Cigars"],
        }),
    }),
});

export const {
    useGetAllCigarsQuery,
    useCreateCigarMutation,
    useUpdateCigarMutation,
    useGetCigarQuery,
    useDeleteCigarMutation,
    usePostCSVMutation,
    useDownloadMissingFieldQuery
} = cigarApi;
