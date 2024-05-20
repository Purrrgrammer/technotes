import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apislice";

const noteAdapter = createEntityAdapter({}); //we can get normalize state here on createEntityAdapter
//cause we are working with data with id array and entities(cannot iterate) => id get entity => entity[id]
const initialState = noteAdapter.getInitialState();

//
export const noteApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => "/notes",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError; //make sure no error
      },
      keepUnusedDataFor: 5, //set shorter than 5 secs in development (default 60 secs) => data refer to the cache or req new data
      transformResponse: (responseData) => {
        const loadedNotes = responseData.map((user) => {
          user.id = user._id; //normalize data (from db is _id)
          return user; //returun normalized
        });
        return noteAdapter.setAll(initialState, loadedNotes); //return data => store in adapter => store as normalized data with ids and entities
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
        } else return [{ type: "User", id: "LIST" }]; //if no id
      },
    }),
  }),
});
export const { useGetNotesQuery } = noteApiSlice;

// create selectors

//return the query result object
export const selectUserResult = noteApiSlice.endpoints.getNotes.select();

//create memoized selector
const selectUserData = createSelector(
  selectUserResult,
  (userResult) => userResult.data //normalized state object with ids & entities
);

//getselectors creates these selectors and rename them with aliases useing destructuring
export const {
  selectAll: selectAllNotes,
  // selectById:selectUserById
  // selectIds:selectUserIds

  // pass in a selector that returns the Notes slice of state
} = noteAdapter.getSelectors((state) => selectUserData(state) ?? initialState);
