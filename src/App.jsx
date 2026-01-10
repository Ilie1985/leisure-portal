import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/auth.jsx";
import DashboardPage from "./pages/dashboard.jsx";
import BookPage from "./pages/book.jsx";
import BookingsPage from "./pages/bookings.jsx";
import MembershipPage from "./pages/membership.jsx";
import ProfilePage from "./pages/profile.jsx";
import AdminPage from "./pages/admin.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx"; // ✅ adjust path if needed

function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<AuthPage />} />

      {/* Protected */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/book"
        element={
          <ProtectedRoute>
            <BookPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bookings"
        element={
          <ProtectedRoute>
            <BookingsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/membership"
        element={
          <ProtectedRoute>
            <MembershipPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
