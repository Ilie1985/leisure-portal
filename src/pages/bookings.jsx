// src/pages/bookings.jsx
import "../styles/dashboard.css";   // reuse the top nav styles
import "../styles/bookings.css";
import { useNavigate } from "react-router-dom";

export default function BookingsPage() {
  const navigate = useNavigate();

  const goDashboard = () => navigate("/dashboard");
  const goBook = () => navigate("/book");
  const goBookings = () => navigate("/bookings");
  const goMembership = () => navigate("/membership");
  const goProfile = () => navigate("/profile");

  return (
    <div className="bookings-root">
      {/* Top nav (same as dashboard / book, but My Bookings active) */}
      <header className="dashboard-topbar">
        <div className="dashboard-brand" onClick={goDashboard}>
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
          <button className="dashboard-nav-link" onClick={goDashboard}>
            <span className="material-icons text-[16px]">home</span>
            <span>Dashboard</span>
          </button>
          <button className="dashboard-nav-link" onClick={goBook}>
            <span className="material-icons text-[16px]">calendar_today</span>
            <span>Book Services</span>
          </button>
          <button
            className="dashboard-nav-link dashboard-nav-link-active"
            onClick={goBookings}
          >
            <span className="material-icons text-[16px]">list_alt</span>
            <span>My Bookings</span>
          </button>
          <button className="dashboard-nav-link" onClick={goMembership}>
            <span className="material-icons text-[16px]">credit_card</span>
            <span>Membership</span>
          </button>
          <button className="dashboard-nav-link" onClick={goProfile}>
            <span className="material-icons text-[16px]">person</span>
            <span>Profile</span>
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <button className="relative">
            <span className="material-icons text-slate-500 text-[20px]">
              notifications
            </span>
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
              2
            </span>
          </button>
          <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-[14px] font-semibold">
            JD
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="bookings-shell">
        <header className="bookings-header">
          <h1 className="bookings-title">My Bookings</h1>
          <p className="bookings-subtitle">
            View and manage all your leisure centre reservations
          </p>
        </header>

        {/* Tabs */}
        <div className="bookings-tabs">
          <button className="bookings-tab bookings-tab-active">
            Upcoming (0)
          </button>
          <button className="bookings-tab">Past (6)</button>
        </div>

        {/* Empty state for upcoming bookings (matches your Figma) */}
        <section className="bookings-empty-card">
          <div className="bookings-empty-icon">
            <span className="material-icons text-slate-300 text-[30px]">
              event
            </span>
          </div>
          <div className="bookings-empty-title">No upcoming bookings</div>
          <div className="bookings-empty-text">
            Book a service to see it here
          </div>
        </section>
      </main>
    </div>
  );
}
