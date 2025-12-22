import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import App from "./App";
import "./index.css";
import LandingPage from "./pages/common/LandingPage";
import Register from "./pages/common/Register";
import Login from "./pages/common/Login"

const router= createBrowserRouter ([
{
  path:"/",
  element:<LandingPage/>

},
{
  path:"/register",
  element:<Register/>

}
,
{
  path:"/login",
  element:<Login/>
}
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
