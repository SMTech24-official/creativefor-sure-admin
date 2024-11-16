import { baseApi } from './baseApi';

const cigarApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // Get all brands
        getAllCigars: build.query({
            query: () => ({
                url: `/cigarData`,
                method: 'GET',
            }),
            providesTags: ['Cigars'],
        }),
    }),
});

export const { useGetAllCigarsQuery } = cigarApi;
