import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth.jsx";
import { isAdmin } from "../lib/isAdmin";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-600">
        Loading...
      </div>
    );
  }

  if (!user) return <Navigate to="/" replace state={{ from: location }} />;

  if (!isAdmin(user)) return <Navigate to="/dashboard" replace />;

  return children;
}
