// src/App.js
import React from "react";
import { RouterProvider} from "react-router-dom";
import router from "./Route/index.jsx";
export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
