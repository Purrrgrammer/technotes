import { createApi } from "@reduxjs/toolkit/query";
import { apiSlice } from "../../app/api/apislice";
import { logout, setCredentials } from "./authSlice";

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
          const { data } = await queryFulfilled;
          console.log(data);

          dispatch(logout());

          //problem occurs when loging out on note and user List
          //the component dont unsubscrib (make sure that it unsubscribe the data after unmounted)
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
          }, 1000);
          //clear apiSlice => method call to clear out the cached and query subsciption from api
        } catch (error) {
          console.log(error);
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({ url: "/auth/refresh", method: "GET" }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          const { accessToken } = data;
          dispatch(setCredentials({ accessToken })); //dont have to provide it in every component

          //so when we use refresh it will set credentails for us
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});
export const { useLoginMutation, useSendLogoutMutation, useRefreshMutation } =
  authApiSlice;
