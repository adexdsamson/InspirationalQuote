import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const quotesApi = createApi({
  reducerPath: "quotesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.quotable.io/" }),
  keepUnusedDataFor: 6000,
  endpoints: (builder) => ({
    getQuoteByName: builder.query({
      query: (name) => `quotes/${name}`,
    }),

    getQuotes: builder.query({
      query: ({page, limit}) => ({
        url: "quotes",
        params: {
          page,
          limit,
        },
      }),
    }),

    getRandomQuotes: builder.query({
      query: ({ limit }) => ({
        url: "quotes/random",
        params: {
          limit,
        },
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetQuoteByNameQuery, useGetQuotesQuery, useGetRandomQuotesQuery } = quotesApi

// Unsplash api
export const unsplashApi = createApi({
  reducerPath: "unsplash",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.unsplash.com/" }),
  endpoints: (builder) => ({
    getRandomPhotos: builder.query({
      query: ({ client_id }) => ({
        url: "photos/random",
        params: {
          client_id,
          orientation: "portrait",
          count: 20,
          topics: "inspiration, wisdom, success, happiness, friendship",
        },
      }),
    }),
  }),
});

export const { useGetRandomPhotosQuery } = unsplashApi;