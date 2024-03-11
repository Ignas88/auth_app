import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setIsLoggedIn } from '@app/reduxSlices/auth';


type authResJSON = {
  token: string
}
export const authApi = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.APP_BASE_API_PATH}` }),
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
          if (!!data.token) dispatch(setIsLoggedIn(data));
        } catch(e) {
        }
      },
    }),
  }),
})
export const { useLoginMutation } = authApi;