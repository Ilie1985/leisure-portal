import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth.jsx";

export default function ProtectedRoute({ children }) {

   // Retrieve authentication state from the Auth context and store location  
  const { user, loading } = useAuth();
  const location = useLocation();



  // display a loading indicator to prevent premature redirects
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-600">
        Loading...
      </div>
    );
  }


   // If the user is not logged in, redirect them to the login page
  if (!user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
}
