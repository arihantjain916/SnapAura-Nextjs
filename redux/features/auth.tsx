import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export interface AuthState {
  isAuthenticated: boolean;
  username: string;
  email: string;
  profile?: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  username: "",
  email: "",
  profile:""
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userdata: (state, action) => {
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.profile = action.payload.profile
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.username = "";
      state.email = "";
      state.profile = "";
      Cookies.remove("AUTH_TOKEN");
    },
  },
});

export const { logout, userdata } = authSlice.actions;
export default authSlice.reducer;
