import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css"; // ⬅️ import Tailwind component styles
import SecurityFeature from "../components/SecurityFeature.jsx";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/auth.jsx";


export default function AuthPage() {
  
  const [mode, setMode] = useState("login"); // "login" | "register"
  const { user } = useAuth();
const [submitting, setSubmitting] = useState(false);
const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [includeMembership, setIncludeMembership] = useState(true);

  const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Fake auth handler – replace with real API later
  //   if (mode === "login") {
  //     navigate("/dashboard");
  //   } else {
  //     navigate("/dashboard");
  //   }
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitting(true);
  setError("");

  try {
    if (mode === "register") {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;

      // If email confirmations are ON, user may need to confirm via email.
      // If OFF, they’ll be logged in immediately and redirected by the useEffect above.
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    }
  } catch (err) {
    setError(err.message || "Something went wrong");
  } finally {
    setSubmitting(false);
  }
};


  const handleQuickDemoUser = () => {
    navigate("/dashboard");
  };

  const handleQuickDemoAdmin = () => {
    navigate("/admin");
  };

  useEffect(() => {
  if (user) navigate("/dashboard");
}, [user, navigate]);


  return (
    <div className="auth-root">
      <div className="auth-shell">
        {/* LEFT PANEL */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="auth-left-title">Welcome Back</h1>
            <p className="auth-left-subtitle">
              Access your leisure centre services with secure authentication.
            </p>

            <div className="space-y-5">
              <SecurityFeature
                icon="lock"
                iconBg="bg-blue-50"
                iconColor="text-blue-600"
                title="Encrypted & Secure"
                description="All passwords are encrypted using industry-standard security."
              />
              <SecurityFeature
                icon="shield"
                iconBg="bg-violet-50"
                iconColor="text-violet-600"
                title="Role-Based Access"
                description="Access levels tailored to users, members, and administrators."
              />
              <SecurityFeature
                icon="schedule"
                iconBg="bg-pink-50"
                iconColor="text-pink-600"
                title="Auto-Timeout Protection"
                description="Sessions automatically expire after inactivity for your security."
              />
            </div>
          </div>

          {/* Image banner */}
          <div className="auth-image-card">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#1d4ed8_0,_transparent_55%),_radial-gradient(circle_at_bottom,_#0f172a_0,_transparent_60%)] opacity-70" />
            <div className="relative h-full flex items-end">
              <div className="p-6 text-white">
                <div className="uppercase tracking-wide text-[11px] text-slate-200 mb-1">
                  Secure Access Portal
                </div>
                <div className="text-xl font-semibold">
                  Leisure Management System
                </div>
                <div className="text-[13px] text-slate-200 mt-1 max-w-sm">
                  Manage memberships, bookings, and facility access from one
                  secure dashboard.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL – Auth card */}
        <div className="auth-card">
          <div className="mb-6">
            <h2 className="text-[18px] font-semibold text-slate-900">
              Sign In
            </h2>
            <p className="text-[13px] text-slate-500">
              Access your account to manage bookings and memberships.
            </p>
          </div>

          {/* Tabs */}
          <div className="auth-tabs">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`auth-tab ${
                mode === "login" ? "auth-tab-active" : "auth-tab-inactive"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode("register")}
              className={`auth-tab ${
                mode === "register" ? "auth-tab-active" : "auth-tab-inactive"
              }`}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 flex-1">
            <div className="space-y-1 text-sm">
              <label className="auth-input-label">Email Address</label>
              <div className="auth-input-wrapper">
                <span className="material-icons auth-input-icon">mail</span>

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="auth-input"
                />
              </div>
            </div>

            <div className="space-y-1 text-sm">
              <label className="auth-input-label">Password</label>
              <div className="auth-input-wrapper">
                <span className="material-icons auth-input-icon">lock</span>

                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="auth-input"
                />
              </div>
              <div className="flex items-center mt-1 text-[11px] text-slate-500 gap-1">
                <span className="material-icons text-[14px] text-slate-400">
                  security
                </span>
                <span>Encrypted with AES-256</span>
              </div>
            </div>

            {mode === "register" && (
              <div className="flex items-center gap-2 text-[13px] mt-2">
                <input
                  id="membership"
                  type="checkbox"
                  checked={includeMembership}
                  onChange={(e) => setIncludeMembership(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 accent-blue-600"
                />
                <label
                  htmlFor="membership"
                  className="text-slate-700 cursor-pointer"
                >
                  Add annual membership (+$50/year) with premium benefits
                </label>
              </div>
            )}

            <div className="flex items-center justify-between text-[13px] pt-1">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 accent-blue-600"
                />
                <span className="text-slate-700">Remember me</span>
              </label>
              <button
                type="button"
                className="text-blue-600 hover:text-blue-700 text-[13px]"
              >
                Forgot password?
              </button>
            </div>

            {/* <button type="submit" className="auth-primary-button">
              {mode === "login" ? "Sign In" : "Create Account"}
            </button> */}

{error && (
  <div className="text-[13px] text-rose-600 bg-rose-50 border border-rose-100 rounded-xl px-3 py-2">
    {error}
  </div>
)}

            <button type="submit" className="auth-primary-button" disabled={submitting}>
  {submitting ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
</button>

          </form>

          {/* Divider */}
          <div className="my-5 border-t border-slate-100" />

          {/* Quick demo access */}
          <div className="text-center mb-3">
            <div className="text-[12px] text-slate-500">
              Quick Demo Access
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleQuickDemoUser}
              className="auth-quick-button"
            >
              Login as User
            </button>
            <button
              type="button"
              onClick={handleQuickDemoAdmin}
              className="auth-quick-button"
            >
              Login as Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

