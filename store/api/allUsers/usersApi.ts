import { baseApi } from "../baseApi";

const usersApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getAllUsers: build.query({
            query: ({ page, limit }: { page?: number; limit?: number }) => {
                const params = new URLSearchParams();
                if (page) params.append("page", page.toString());
                if (limit) params.append("limit", limit.toString());

                return {
                    url: `/users?${params.toString()}`,
                    method: "GET",
                };
            },
            providesTags: ["Users"],
        }),
    }),
});

export const { useGetAllUsersQuery } = usersApi;
