import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

{
  /********************imports for User side  ***************/
}

import store from "./store.js";
import PrivateRoute from "./components/PrivateRoute.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";

{
  /*********************imports from Admin side  ********************/
}

import AdminHomeScreen from "./screens/AdminHomeScreen.jsx";
import AdminLoginScreen from "./screens/AdminLoginScreen.jsx";
import AdminPrivateRoute from "./components/AdminPrivateRoute.jsx";

import UsersListScreen from "./screens/UserListScreen.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/************User side routes ***************/}
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>

      {/************admin side routes ***************/}
      <Route path="/admin/login" element={<AdminLoginScreen />} />
      <Route path="" element={<AdminPrivateRoute />}>
        <Route index={true} path="/admin" element={<AdminHomeScreen />} />
        <Route path="/admin/users-list" element={<UsersListScreen />} />
      </Route>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>
  </Provider>
);
