import { createSlice } from "@reduxjs/toolkit";
// import cookie from "js-cookie";

export interface AuthState {
  isAuthenticated: boolean;
  username: string;
  name: string;
  email: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  username: "",
  email: "",
  name: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
    logout: (state) => {
      //   cookie.remove("AUTH_TOKEN");
      state.isAuthenticated = false;
      state.username = "";
      // state.imageUrl = "";
      state.email = "";
      state.name = "";
    },
    register: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    updateProfile: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
  },
});

export const { logout, login, register } = authSlice.actions;
export default authSlice.reducer;
