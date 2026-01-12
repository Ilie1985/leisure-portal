import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth.jsx";

export default function AdminRoute({ children }) {
  const { user, role, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-600">
        AdminRoute Loading...
      </div>
    );
  }

  if (!user) return <Navigate to="/" replace state={{ from: location }} />;

  if (role !== "ADMIN") return <Navigate to="/dashboard" replace />;

  return children;
}
