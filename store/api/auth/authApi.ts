import { baseApi } from '../baseApi';

type TQueryParam = {
    name: string;
    value: any;
};

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => {
                return {
                    url: '/auth/login',
                    method: 'POST',
                    body: data,
                };
            },
            invalidatesTags: ['Auth'],
        }),
    }),
});

export const { useLoginMutation } = authApi;
