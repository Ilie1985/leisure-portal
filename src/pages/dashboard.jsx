// src/pages/dashboard.jsx
import { useAuth } from "../context/auth.jsx";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";

const mockUpcomingBookings = [
  {
    id: 1,
    service: "Swimming Lesson",
    date: "2025-11-05 at 14:00",
    status: "Confirmed",
  },
  {
    id: 2,
    service: "Library Session",
    date: "2025-11-08 at 10:00",
    status: "Confirmed",
  },
  {
    id: 3,
    service: "Hall Reservation",
    date: "2025-11-10 at 18:00",
    status: "Pending",
  },
];

export default function DashboardPage() {
  const navigate = useNavigate();
const { user, role} = useAuth();
const displayName = user?.email?.split("@")[0] ?? "User";
const initials = (displayName[0] ?? "U").toUpperCase();

  const goDashboard = () => navigate("/dashboard");
  const goBook = () => navigate("/book");
  const goBookings = () => navigate("/bookings");       // we'll build later
  const goMembership = () => navigate("/membership");   // later
  const goProfile = () => navigate("/profile");         // later

  return (
    <div className="dashboard-root">
      {/* Top nav */}
      <header className="dashboard-topbar">
       
        <div 
  className="dashboard-brand cursor-pointer"
  onClick={() => navigate("/")}
>
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
          <button
            className="dashboard-nav-link dashboard-nav-link-active"
            onClick={goDashboard}
          >
            <span className="material-icons text-[16px]">home</span>
            <span>Dashboard</span>
          </button>
          <button className="dashboard-nav-link" onClick={goBook}>
            <span className="material-icons text-[16px]">calendar_today</span>
            <span>Book Services</span>
          </button>
          <button className="dashboard-nav-link" onClick={goBookings}>
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
            {initials}
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="dashboard-shell">
        <div className="dashboard-main">
          {/* Hero / welcome */}
          <section className="dashboard-hero">
            <div className="dashboard-hero-title">Welcome back, {user?.email?.split("@")[0]}!
Role: {role}
</div>
            <div className="dashboard-hero-subtitle">
              Manage your bookings and membership in one place.
            </div>

            <div className="dashboard-hero-badges">
              <span className="dashboard-hero-badge">
                <span className="material-icons text-[14px] mr-1">
                  verified_user
                </span>
                Role: USER
              </span>
              <span className="dashboard-hero-badge">
                <span className="material-icons text-[14px] mr-1">
                  stars
                </span>
                Membership: Active (42 days remaining)
              </span>
            </div>

            {/* Stats */}
            <div className="dashboard-stats-grid">
              <div className="dashboard-stat-card">
                <div className="dashboard-stat-label">
                  <span>Upcoming Bookings</span>
                  <span className="material-icons text-[18px] text-blue-500">
                    calendar_today
                  </span>
                </div>
                <div className="dashboard-stat-value">3</div>
                <div className="dashboard-stat-sub">Next: Nov 5, 2025</div>
              </div>

              <div className="dashboard-stat-card">
                <div className="dashboard-stat-label">
                  <span>Total Sessions</span>
                  <span className="material-icons text-[18px] text-emerald-500">
                    list
                  </span>
                </div>
                <div className="dashboard-stat-value">47</div>
                <div className="dashboard-stat-sub">This year</div>
              </div>

              <div className="dashboard-stat-card">
                <div className="dashboard-stat-label">
                  <span>Membership Status</span>
                  <span className="material-icons text-[18px] text-purple-500">
                    credit_card
                  </span>
                </div>
                <div className="dashboard-stat-value">Active</div>
                <div className="dashboard-stat-sub">Expires Dec 31, 2025</div>
              </div>

              <div className="dashboard-stat-card">
                <div className="dashboard-stat-label">
                  <span>Notifications</span>
                  <span className="material-icons text-[18px] text-orange-500">
                    notifications
                  </span>
                </div>
                <div className="dashboard-stat-value">2</div>
                <div className="dashboard-stat-sub">Unread messages</div>
              </div>
            </div>
          </section>

          {/* Renewal banner */}
          <section className="dashboard-renewal-banner">
            <div className="dashboard-renewal-icon">
              <span className="material-icons text-amber-600 text-[20px]">
                warning
              </span>
            </div>
            <div className="dashboard-renewal-text">
              <div className="dashboard-renewal-title">
                Membership Renewal Reminder
              </div>
              <div className="dashboard-renewal-sub">
                Your membership expires in 42 days. Renew now to continue
                enjoying all benefits.
              </div>
            </div>
            <button className="dashboard-renewal-button">Renew Membership</button>
          </section>

          {/* Quick actions */}
          <section>
            <div className="dashboard-quick-title">Quick Actions</div>
            <div className="dashboard-quick-grid">
              <div className="dashboard-quick-card" onClick={goBook}>
                <div className="dashboard-quick-icon bg-blue-50">
                  <span className="material-icons text-blue-600">
                    calendar_today
                  </span>
                </div>
                <div className="dashboard-quick-title-text">Book Services</div>
                <div className="dashboard-quick-sub">
                  Reserve swimming, library, hall, or parking
                </div>
              </div>

              <div className="dashboard-quick-card" onClick={goBookings}>
                <div className="dashboard-quick-icon bg-emerald-50">
                  <span className="material-icons text-emerald-600">list</span>
                </div>
                <div className="dashboard-quick-title-text">My Bookings</div>
                <div className="dashboard-quick-sub">
                  View and manage your reservations
                </div>
              </div>

              <div className="dashboard-quick-card" onClick={goMembership}>
                <div className="dashboard-quick-icon bg-purple-50">
                  <span className="material-icons text-purple-600">
                    credit_card
                  </span>
                </div>
                <div className="dashboard-quick-title-text">Membership</div>
                <div className="dashboard-quick-sub">
                  Manage your membership and benefits
                </div>
              </div>

              <div className="dashboard-quick-card" onClick={goProfile}>
                <div className="dashboard-quick-icon bg-orange-50">
                  <span className="material-icons text-orange-500">person</span>
                </div>
                <div className="dashboard-quick-title-text">Profile Settings</div>
                <div className="dashboard-quick-sub">
                  Update your personal information
                </div>
              </div>
            </div>
          </section>

          {/* Upcoming bookings */}
          <section className="dashboard-bookings-card">
            <div className="dashboard-bookings-header">Upcoming Bookings</div>
            {mockUpcomingBookings.map((b) => (
              <div key={b.id} className="dashboard-booking-row">
                <div className="dashboard-booking-main">
                  <div className="dashboard-booking-icon">
                    <span className="material-icons text-blue-600">event</span>
                  </div>
                  <div>
                    <div className="dashboard-booking-title">{b.service}</div>
                    <div className="dashboard-booking-meta">{b.date}</div>
                  </div>
                </div>
                <div>
                  {b.status === "Confirmed" ? (
                    <span className="dashboard-booking-status dashboard-booking-status-confirmed">
                      Confirmed
                    </span>
                  ) : (
                    <span className="dashboard-booking-status dashboard-booking-status-pending">
                      Pending
                    </span>
                  )}
                </div>
              </div>
            ))}

            <div className="dashboard-bookings-footer">View All Bookings</div>
          </section>
        </div>
      </main>
    </div>
  );
}
