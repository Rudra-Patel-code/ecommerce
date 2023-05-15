import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducers";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export const server = "http://localhost:4000/api/v1";

export default store;
