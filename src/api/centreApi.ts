import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:2804/api";

export interface CentreQueryParams {
    limit: number;
    offset: number;
    type_id?: number;
    class_type?: string;
    location: string;
    latitude?: number;
    longitude?: number;
    name?: string;
    radius_km?: number;
    centre_id?: number;
}

export interface SearchOptionQueryParams {
    type_id: number;
    location: string;
    name: string;
}

export const centreApi = createApi({
    reducerPath: "centreApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getCentres: builder.query<any, CentreQueryParams>({
            query: (params) => ({
                url: "centr-locator",
                params,
            }),
        }),
        getCentreSearch: builder.query<any, SearchOptionQueryParams>({
            query: (params) => ({
                url: "centr-search",
                params,
            }),
        }),
    }),
});

export const { useGetCentresQuery, useGetCentreSearchQuery } = centreApi;
