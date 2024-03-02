import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logIn, logOut } from '@app/store/slices/auth';


type authResJSON = {
  token: string
}
export const authApi = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://playground.tesonet.lt/v1/' }),
  endpoints: (builder) => ({
    login: builder.mutation<authResJSON, {username: string, password: string}>({
      query: (credentials) => ({
        url: 'tokens',
        method: 'POST',
        body: credentials,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(logIn({ isLoggedIn: true, ...data }));
        } catch(error) {
          dispatch(logOut());
        }
      },
    }),
  }),
})
export const { useLoginMutation } = authApi;