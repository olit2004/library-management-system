import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

// Layouts & Protection
import App from "./App";
import "./index.css";
import DashboardLayout from "./components/layout/DashBoardLayout";
import ProtectedRoute from "./pages/common/ProtectedRoute";
import { AuthProvider } from "./hooks/useAuth"
import LandingPage from "./pages/common/LandingPage";
import Register from "./pages/common/Register";
import Login from "./pages/common/Login";
import Discover from "./pages/Member/Discover";
import Reservations from "./pages/Member/Reservations";
import MyLoans from "./pages/Member/MyLoans";
import History from "./pages/Member/History";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/member",
    
    element: (
      <ProtectedRoute allowedRoles={["MEMBER"]}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Discover />,
      },
      {
        path: "reservations",
        element: <Reservations />,
      },
      {
        path: "my-loans",
        element: <MyLoans />,
      },
      {
        path: "history",
        element: <History />,
      },
    ],
  },
  // Optional: Catch-all for 404s or Unauthorized
  {
    path: "/unauthorized",
    element: <div className="p-10 text-center">You do not have permission to view this page.</div>,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* We wrap the RouterProvider in AuthProvider so all routes 
      can access user data and roles immediately.
    */}
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);