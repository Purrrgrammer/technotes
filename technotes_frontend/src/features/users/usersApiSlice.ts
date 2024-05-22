import {
  createSelector,
  createEntityAdapter,
  EntityId,
  EntityState,
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apislice";
import { UserType } from "../../interfaces/index";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { store } from "../../app/store";

const usersAdapter = createEntityAdapter({});
const initialState = usersAdapter.getInitialState();
export interface ServerResponse {
  message: string;
  status: number;
  [others: string]: any;
}
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      validateStatus: (response: ServerResponse, result: any) => {
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 5,
      transformResponse: (
        responseData: ServerResponse
      ): EntityState<{ id: EntityId }, EntityId> => {
        const loadedUsers = responseData.map((user: UserType) => {
          user.id = user._id;

          return user;
        });
        return usersAdapter.setAll(initialState, loadedUsers);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "User", id: "LIST" },
            ...result.ids.map((id) => ({ type: "User" as const, id })),
          ];
        } else return [{ type: "User", id: "LIST" }];
      },
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;

// returns the query result object

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select(null);

// creates memoized selector
const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data // normalized state object with ids & entities
);
type RootState = ReturnType<typeof store.getState>;

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
  // Pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors<RootState | any>(
  (state) => selectUsersData(state) ?? initialState
);
// const usersAdapter = createEntityAdapter < User > {};
