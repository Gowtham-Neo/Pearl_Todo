import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../Pages/Home";
import Signin from "../Pages/Signin";
import Signup from "../Pages/Signup";
import NotFound from "../Pages/NotFound";
import Logout from "../components/Logout";
import ProtectedRoute from "./ProtectedRoute";
const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/TaskDashboard" replace /> },
  //   {
  //     path: "/TaskDashboard",
  //     element: <Home />,
  //   },

  {
    path: "/TaskDashboard",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },

  {
    path: "/login",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
export default router;
