import { createApi } from "@reduxjs/toolkit/query";
import { apiSlice } from "../../app/api/apislice";
import { logout } from "./authSlice";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        body: { ...credentials },
      }),
      transformErrorResponse: (err) => {
        console.log(err);

        // console.log(`creadentails`, credentials);
      },
    }),
    sendLogout: builder.mutation({
      query: () => ({ url: "/auth/logout", method: "POST" }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logout());
          //clear apiSlice => method call to clear out the cached and query subsciption from api
          dispatch(apiSlice.util.resetApiState());
        } catch (error) {
          console.log(error);
        }
      },
    }),
    refresh: builder.query({
      query: () => ({ url: "/auth/refresh", method: "GET" }),
    }),
  }),
});
export const { useLoginMutation, useSendLogoutMutation, useRefreshQuery } =
  authApiSlice;
