import {createApi, fetchBaseQuery, FetchBaseQueryError} from '@reduxjs/toolkit/query/react';
import {parseCSV} from '../utils/csvParser';
import {ICost, IUsage} from "../types/data";
import * as ROUTE_PATHS from '../const/pathConstants';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: ROUTE_PATHS.ROOT_PATH}),
  endpoints: (builder) => ({
    getUsages: builder.query<IUsage[], void>({
      queryFn: async () => {
        try {
          const usages = await parseCSV<IUsage[]>(ROUTE_PATHS.USAGES_CSV_PATH);
          return {data: usages.flat()};
        } catch (error) {
          return {
            error: {
              message: (error as Error).message || 'Unknown error occurred'
            } as unknown as FetchBaseQueryError
          };
        }
      },
    }),
    getCosts: builder.query<ICost[], void>({
      queryFn: async () => {
        try {
          const costs = await parseCSV<ICost[]>(ROUTE_PATHS.COSTS_CSV_PATH);
          return {data: costs.flat()};
        } catch (error) {
          return {
            error: {
              message: (error as Error).message || 'Unknown error occurred'
            } as unknown as FetchBaseQueryError
          };
        }
      },
    }),
  }),
});

export const {useGetUsagesQuery, useGetCostsQuery} = apiSlice;
