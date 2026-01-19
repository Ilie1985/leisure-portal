import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth.jsx";

export default function AdminRoute({ children }) {
   // Get current user, role, and loading state from Auth context
  const { user, role, loading } = useAuth();
  // Store current location so the app knows where the user tried to go
  const location = useLocation();


  // show a temporary loading message to avoid flashing the page
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-600">
        AdminRoute Loading...
      </div>
    );
  }


  // If no user is logged in, redirect to the login page
  if (!user) return <Navigate to="/" replace state={{ from: location }} />;

  
  // If the user is logged in but does not have the ADMIN role, redirect them back to the dashboard
  if (role !== "ADMIN") return <Navigate to="/dashboard" replace />;

  return children;
}
