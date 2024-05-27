import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface tokenType {
  accessToken: string;
}
interface initialStateType {
  token: string;
}
const authSlice = createSlice({
  name: "auth",
  initialState: { token: null },
  reducers: {
    setCredentials: (state, action: PayloadAction<tokenType>) => {

      const { accessToken } = action.payload;
      state.token = accessToken;
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
export const selectCurrentToken = (state) => state.auth.token;
