import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "./apislice";
import { Result } from "postcss";
import { build } from "vite";

const userAdapter = createEntityAdapter({}); //we can get normalize state
//data id entities(cannot iterate) id get entity
const initialState = userAdapter.getInitialState();

//
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => "/users",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError; //make sure no error
      },
      keepUnusedDataFor: 5, //set short than 5 secs in development (default60secs) data refer to the cache
      transformErrorResponse: (responseData) => {
        const loadedUsers = responseData.map((user) => {
          user.id = user._id; //normalize data (from db is _id)
          return user;
        });
        return userAdapter.setAll(initialState, loadedUsers); //return data => store in adapter => store as normalized data with ids and entities
      },
      providesTags: (result, error, arg) => {
        //provide the tags that can be invalidate
        //could get result that doesnt have Id

        //if there an ID with optional chaining
        if (result?.ids) {
          return [
            { type: "User", id: "LIST" },
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else return [{ type: "User", id: "LIST" }];
      },
    }),
  }),
});
export const { useGetUsersQuery } = userApiSlice;
