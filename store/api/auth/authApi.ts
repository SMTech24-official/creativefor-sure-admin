import { baseApi } from "../baseApi";

type TQueryParam = {
    name: string;
    value: any;
};

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => {
                return {
                    url: "/auth/login",
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: ["Auth"],
        }),
        getUser: builder.query({
            query: () => ({
                url: `/auth/get-me`,
                method: "GET",
            }),
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: `/users/profile`,
                method: "PUT",
                body: data,
            }),
        }),
    }),
});

export const { useLoginMutation, useGetUserQuery, useUpdateUserMutation } =
    authApi;
