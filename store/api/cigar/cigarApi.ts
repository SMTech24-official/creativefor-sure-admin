import { baseApi } from "../baseApi";

const cigarApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // Get all brands
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
    }),
});

export const { useGetAllCigarsQuery, useCreateCigarMutation } = cigarApi;
