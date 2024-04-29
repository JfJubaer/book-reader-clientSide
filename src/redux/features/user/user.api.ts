import { api } from '@/redux/api/apiSlice';

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    singleusers: builder.query({
      query: (id) => `/users/${id}`,
    }),
    postusers: builder.mutation({
      query: (data) => ({
        url: '/users/create-user',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['users'],
    }),
    getusers: builder.query({
      query: () => `/users`,
      providesTags: ['users'],
    }),
  }),
});

export const { useGetusersQuery, usePostusersMutation, useSingleusersQuery } =
  userApi;
