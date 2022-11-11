import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";

export let store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
