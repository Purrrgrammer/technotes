import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apislice.js";
export const store = configureStore({
  reducer: { [apiSlice.reducerPath]: apiSlice.reducer },
  middleware: (getDefauiltMiddleware) =>
    getDefauiltMiddleware().concat(apiSlice.middleware),
  devTools: true, //redux devtools
});
