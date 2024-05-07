import { api } from '@/redux/api/apiSlice';

const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
    }),
    singleProduct: builder.query({
      query: (id) => `/product/${id}`,
    }),
    patchProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/${id}`,
        method: 'PATCH',
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
  useGetProductsQuery,
  usePostCommentMutation,
  useSingleProductQuery,
  usePatchProductMutation,
} = productApi;
