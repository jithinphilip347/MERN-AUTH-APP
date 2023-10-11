import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import AdminSlice from "./slices/AdminSlice";
import { apiSlice } from "./slices/apiSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    adminAuth: AdminSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
