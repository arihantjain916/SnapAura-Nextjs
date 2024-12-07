import { createSlice } from "@reduxjs/toolkit";
// import cookie from "js-cookie";

export interface AuthState {
  isAuthenticated: boolean;
  username: string;
  email: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  username: "",
  email: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userdata: (state, action) => {
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.username = "";
      state.email = "";
    },
  },
});

export const { logout, userdata } = authSlice.actions;
export default authSlice.reducer;
