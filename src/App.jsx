import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/auth.jsx";
import DashboardPage from "./pages/dashboard.jsx";
import BookPage from "./pages/book.jsx";
import BookingsPage from "./pages/bookings.jsx";
import MembershipPage from "./pages/membership.jsx";
import ProfilePage from "./pages/profile.jsx";



function App() {
  return (
    <Routes>
      {/* Main auth route */}
      <Route path="/" element={<AuthPage />} />
       <Route path="/dashboard" element={<DashboardPage />} />
       <Route path="/book" element={<BookPage />} />
       <Route path="/bookings" element={<BookingsPage />} />
       <Route path="/membership" element={<MembershipPage />} />
       <Route path="/profile" element={<ProfilePage />} />

      {/* Fallback: any unknown route goes back to login */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
