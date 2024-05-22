import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apislice";
import { store } from "../../app/store";
import { Notes } from "../../interfaces";
import { ServerResponse } from "../users/usersApiSlice";
const notesAdapter = createEntityAdapter({
  sortComparer: (a: any, b: any) =>
    a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});
//we can get normalize state here on createEntityAdapter
//cause we are working with data with id array and entities(cannot iterate) => id get entity => entity[id]
const initialState = notesAdapter.getInitialState();

//
export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => "/notes",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError; //make sure no error
      },
      keepUnusedDataFor: 5, //set shorter than 5 secs in development (default 60 secs) => data refer to the cache or req new data
      transformResponse: (responseData: ServerResponse) => {
        const loadedNotes = responseData.map((note: Notes) => {
          note.id = note._id; //normalize data (from db is _id)
          return note; //returun normalized
        });
        return notesAdapter.setAll(initialState, loadedNotes); //return data => store in adapter => store as normalized data with ids and entities
      },
      providesTags: (result, error, arg) => {
        //provide the tags that can be invalidate
        //could get result that doesnt have Id
        //if there an ID with optional chaining
        if (result?.ids) {
          return [
            { type: "Note", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Note" as const, id })),
          ];
        } else return [{ type: "Note", id: "LIST" }]; //if no id
      },
    }),
  }),
});
export const { useGetNotesQuery } = notesApiSlice;

// create selectors

//return the query result object
export const selectNotesResult = notesApiSlice.endpoints.getNotes.select(null);

//create memoized selector
const selectNotesData = createSelector(
  selectNotesResult,
  (notesResult) => notesResult.data //normalized state object with ids & entities
);
type RootState = ReturnType<typeof store.getState>;

//getselectors creates these selectors and rename them with aliases useing destructuring
export const {
  selectAll: selectAllNotes,
  selectById: selectNoteById,
  selectIds: selectNoteIds,
  // pass in a selector that returns the Notes slice of state
} = notesAdapter.getSelectors<RootState>(
  (state) => selectNotesData(state) ?? initialState
);
