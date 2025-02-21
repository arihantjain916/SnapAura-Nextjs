import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export interface AuthState {
  id:string;
  isAuthenticated: boolean;
  username: string;
  email: string;
  profile?: string | null;
  name?: string;
}

const initialState: AuthState = {
  id:"",
  isAuthenticated: false,
  username: "",
  email: "",
  profile: null,
  name: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userdata: (state, action) => {
      state.id = action.payload.id;
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.profile = action.payload.profile;
    },
    logout: (state) => {
      state.id = "";
      state.isAuthenticated = false;
      state.username = "";
      state.email = "";
      state.profile = null;
      state.name = "";
      Cookies.remove("AUTH_TOKEN");
      Cookies.remove("isEmailVerified");
    },
  },
});

export const { logout, userdata } = authSlice.actions;
export default authSlice.reducer;
