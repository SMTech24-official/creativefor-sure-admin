import { baseApi } from "../baseApi";

const brandsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllBrands: build.query({
            query: () => ({
                url: "/brands",
                method: "GET",
            }),
            providesTags: ["Brands"],
        }),

        getBrand: build.query({
            query: (id: string) => ({
                url: `/brands/${id}`,
                method: "GET",
            }),
            providesTags: ["Brands"],
        }),

        createBrand: build.mutation({
            query: (data) => ({
                url: "/brands",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Brands"],
        }),

        updateBrand: build.mutation({
            query: ({ data, id }) => ({
                url: `/brands/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Brands"],
        }),

        deleteBrand: build.mutation({
            query: (id: string) => ({
                url: `/brands/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Brands"],
        }),
    }),
});

export const {
    useGetAllBrandsQuery,
    useGetBrandQuery,
    useCreateBrandMutation,
    useUpdateBrandMutation,
    useDeleteBrandMutation,
} = brandsApi;
