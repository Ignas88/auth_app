import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setIsLoggedIn } from '@app/reduxSlices/auth';


type authResJSON = {
  token: string
}
export const authApi = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://playground.tesonet.lt/v1' }),
  endpoints: (builder) => ({
    login: builder.mutation<authResJSON, {username: string, password: string}>({
      query: (credentials) => ({
        url: '/tokens',
        method: 'POST',
        body: credentials,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const {data} = await queryFulfilled;
          dispatch(setIsLoggedIn(data));
        } catch(e) {
        }
      },
    }),
  }),
})
export const { useLoginMutation } = authApi;