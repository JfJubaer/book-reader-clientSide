import { api } from '@/redux/api/apiSlice';

const booksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getbooks: builder.query({
      query: () => '/books',
    }),
    singlebooks: builder.query({
      query: (id) => `/books/${id}`,
    }),
    postBook: builder.mutation({
      query: (data) => ({
        url: `/books`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['books'],
    }),
    postComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/comment/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['comments'],
    }),
    getComment: builder.query({
      query: (id) => `/comment/${id}`,
      providesTags: ['comments'],
    }),
  }),
});

export const {
  useGetCommentQuery,
  useGetbooksQuery,
  usePostCommentMutation,
  useSinglebooksQuery,
  usePostBookMutation,
} = booksApi;
