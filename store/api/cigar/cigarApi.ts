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

        deleteCigar: build.mutation({
            query: (id: number) => ({
                url: `/cigarData/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Cigars"],
        }),
    }),
});

export const {
    useGetAllCigarsQuery,
    useCreateCigarMutation,
    useDeleteCigarMutation,
} = cigarApi;
