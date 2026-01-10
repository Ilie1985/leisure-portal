// src/context/router.jsx
import { createBrowserRouter } from "react-router-dom";
import AdminPage from "../pages/admin.jsx";

import AuthPage from "../pages/auth.jsx";
import DashboardPage from "../pages/dashboard.jsx";
import BookPage from "../pages/book.jsx";
import BookingsPage from "../pages/bookings.jsx";
import MembershipPage from "../pages/membership.jsx";
import ProfilePage from "../pages/profile.jsx";

import ProtectedRoute from "../components/ProtectedRoute.jsx";

export const router = createBrowserRouter([
  { path: "/", element: <AuthPage /> }, // your “home” landing page
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/book",
    element: (
      <ProtectedRoute>
        <BookPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/bookings",
    element: (
      <ProtectedRoute>
        <BookingsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/membership",
    element: (
      <ProtectedRoute>
        <MembershipPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
  path: "*",
  element: <AuthPage />,
},

{
  path: "/admin",
  element: (
    <ProtectedRoute>
      <AdminPage />
    </ProtectedRoute>
  ),
},

]);
