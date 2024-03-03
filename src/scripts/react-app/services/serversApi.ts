import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { type RootState } from '@app/store';

export type ServerJSON = {
  name: string;
  distance: number;
}
export const serversApi = createApi({
  reducerPath: 'serversApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.APP_BASE_API_PATH}`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    getServers: builder.query<ServerJSON[], void>({
      query: () => ({
        url: '/servers',
      }),
    }),
  }),
})
export const { useGetServersQuery } = serversApi;