import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { Dashboard, LoginPage, RegisterPage } from "./pages";

import "./index.scss";
import { RequireAuth } from "./components";
import { AuthProvider } from "./context";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/dashboard",
    element: (
      <RequireAuth>
        <Dashboard />
      </RequireAuth>
    ),
  },
]);

const App = () => (
  <MantineProvider>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </MantineProvider>
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("app")
);
