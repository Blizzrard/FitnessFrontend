import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import Home from "./components/home";
import Activities from "./components/activities";
import Users from "./components/users";
import RoutineAcivities from "./components/routine_activites";
import Routines from "./components/routines";
import Login from "./components/login";
import Register from "./components/register";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/routines", element: <Routines /> },
      { path: "/activities", element: <Activities /> },
      { path: "/users", element: <Users /> },
      { path: "/routine_activities", element: <RoutineAcivities /> },
      { path: "/users/login", element: <Login /> },
      { path: "/users/register", element: <Register /> },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
