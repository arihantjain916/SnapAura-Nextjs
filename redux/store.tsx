"use client";

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth";
// import blogReducer from "./features/blog";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();
const authpersistConfig = {
  key: "auth",
  storage,
  version: 1,
};
const blogpersistConfig = {
  key: "blog",
  storage,
  version: 1,
};

const AuthReducer = persistReducer(authpersistConfig, authReducer);
// const BlogReducer = persistReducer(blogpersistConfig, blogReducer);

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    // blog: BlogReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);