import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/auth.jsx";
import DashboardPage from "./pages/dashboard.jsx";
import BookPage from "./pages/book.jsx";

function App() {
  return (
    <Routes>
      {/* Main auth route */}
      <Route path="/" element={<AuthPage />} />
       <Route path="/dashboard" element={<DashboardPage />} />
       <Route path="/book" element={<BookPage />} />

      {/* Fallback: any unknown route goes back to login */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
