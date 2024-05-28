import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface tokenType {
  accessToken: string | null;
}
interface initialStateType {
  token: string | null;
}

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null },
  reducers: {
    setCredentials: (state: any, action: PayloadAction<tokenType>) => {
      const { accessToken } = action.payload;
      if (accessToken !== null) {
        state.token = action.payload.accessToken;
      }
      console.log(`accessToken is Set`);
    },
    logout: (state) => {
      console.log("logged out");
      state.token = null;
    },
  },
});
export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentToken = (state: {
  auth: { token: initialStateType };
}) => state.auth.token;
