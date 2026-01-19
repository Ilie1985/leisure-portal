import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth.jsx";

export default function Topbar({ active = "dashboard" }) {
  const navigate = useNavigate();

  const { role, signOut, user } = useAuth();

  const go = (path) => () => navigate(path);

  const isActive = (key) => (active === key ? "dashboard-nav-link-active" : "");

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/", { replace: true });
    } catch (e) {
      console.warn("Logout error:", e?.message);
    }
  };

  const displayName = user?.email?.split("@")[0] ?? "U";
  const initials = (displayName[0] ?? "U").toUpperCase();

  return (
    <header className="dashboard-topbar">
      <div className="dashboard-brand cursor-pointer" onClick={go("/dashboard")}>
        <div className="w-9 h-9 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-lg font-bold">
          L
        </div>
        <div className="leading-tight">
          <div className="text-[14px] font-semibold text-slate-900">
            Leisure Management
          </div>
          <div className="text-[11px] text-slate-500">Your wellness hub</div>
        </div>
      </div>

      <nav className="dashboard-nav">
        <button className={`dashboard-nav-link ${isActive("dashboard")}`} onClick={go("/dashboard")}>
          <span className="material-icons text-[16px]">home</span>
          <span>Dashboard</span>
        </button>

        <button className={`dashboard-nav-link ${isActive("book")}`} onClick={go("/book")}>
          <span className="material-icons text-[16px]">calendar_today</span>
          <span>Book Services</span>
        </button>

        <button className={`dashboard-nav-link ${isActive("bookings")}`} onClick={go("/bookings")}>
          <span className="material-icons text-[16px]">list_alt</span>
          <span>My Bookings</span>
        </button>

        <button className={`dashboard-nav-link ${isActive("membership")}`} onClick={go("/membership")}>
          <span className="material-icons text-[16px]">credit_card</span>
          <span>Membership</span>
        </button>

        <button className={`dashboard-nav-link ${isActive("profile")}`} onClick={go("/profile")}>
          <span className="material-icons text-[16px]">person</span>
          <span>Profile</span>
        </button>

        {/* Admin button only shows for admins*/}
        {role === "ADMIN" && (
          <button
            className={`dashboard-nav-link ${isActive("admin")}`}
            onClick={go("/admin")}
            title="Admin Overview"
          >
            <span className="material-icons text-[16px]">admin_panel_settings</span>
            <span>Admin</span>
          </button>
        )}
      </nav>

      <div className="flex items-center gap-3">
        <button className="relative">
          <span className="material-icons text-slate-500 text-[20px]">
            notifications
          </span>
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
            2
          </span>
        </button>

        <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-[14px] font-semibold">
          {initials}
        </div>

        {/* Logout button */}
        <button
          type="button"
          onClick={handleLogout}
          className="h-9 px-4 rounded-full border border-slate-200 bg-white text-slate-700 text-[13px] hover:bg-slate-50 transition"
          title="Logout"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
