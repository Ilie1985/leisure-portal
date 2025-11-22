import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/auth.jsx";

function App() {
  return (
    <Routes>
      {/* Main auth route */}
      <Route path="/" element={<AuthPage />} />

      {/* Fallback: any unknown route goes back to login */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
