import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type RootState } from '@app/store';

export const serversApi = createApi({
  reducerPath: 'serversApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://playground.tesonet.lt/v1',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    getServers: builder.query<any, void>({
      query: () => ({
        url: '/servers',
      }),
    }),
  }),
})
export const { useGetServersQuery } = serversApi;