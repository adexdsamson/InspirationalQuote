import { configureStore } from "@reduxjs/toolkit";
import { quotesApi, unsplashApi } from "./api";

export const store = configureStore({
  reducer: {
    [quotesApi.reducerPath]: quotesApi.reducer,
    [unsplashApi.reducerPath]: unsplashApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(quotesApi.middleware, unsplashApi.middleware),
});
