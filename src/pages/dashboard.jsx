import { useAuth } from "../context/auth.jsx";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useEffect, useMemo, useState } from "react";
import Topbar from "../components/Topbar.jsx";


export default function DashboardPage() {
  const navigate = useNavigate();
const { user, role} = useAuth();
const displayName = user?.email?.split("@")[0] ?? "User";
// const initials = (displayName[0] ?? "U").toUpperCase();


const [loadingBookings, setLoadingBookings] = useState(true);
const [userBookings, setUserBookings] = useState([]);
const [bookingError, setBookingError] = useState("");

const now = useMemo(() => new Date(), []);

useEffect(() => {
  async function load() {
    if (!user) {
      setLoadingBookings(false);
      setUserBookings([]);
      return;
    }

    setLoadingBookings(true);
    setBookingError("");

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("user_id", user.id)
      .order("start_time", { ascending: true });

    if (error) {
      setBookingError(error.message);
      setUserBookings([]);
    } else {
      setUserBookings(data ?? []);
    }

    setLoadingBookings(false);
  }

  load();
}, [user?.id]);


const upcomingBookings = userBookings.filter(
  (b) => new Date(b.start_time) >= now
);


  // const goDashboard = () => navigate("/dashboard");
  const goBook = () => navigate("/book");
  const goBookings = () => navigate("/bookings");       
  const goMembership = () => navigate("/membership");   
  const goProfile = () => navigate("/profile");         

  return (
    <div className="dashboard-root">
      {/* Top nav */}
     


<Topbar active="dashboard" />


      {/* Main */}
      <main className="dashboard-shell">
        <div className="dashboard-main">
          {/* Hero / welcome */}
          <section className="dashboard-hero">
            <div className="dashboard-hero-title">Welcome back, {displayName}! 
</div>
            <div className="dashboard-hero-subtitle">
              Manage your bookings and membership in one place.
            </div>

            <div className="dashboard-hero-badges">
              <span className="dashboard-hero-badge">
                <span className="material-icons text-[14px] mr-1">
                  verified_user
                </span>
                Role: {role ?? "USER"}

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
         
{loadingBookings ? (
  <div className="p-6 text-slate-500 text-sm">Loading bookings…</div>
) : bookingError ? (
  <div className="p-6 text-rose-600 text-sm">{bookingError}</div>
) : upcomingBookings.length === 0 ? (
  <div className="p-6 text-slate-500 text-sm">No upcoming bookings yet.</div>
) : (
  upcomingBookings.slice(0, 3).map((b) => (
    <div key={b.id} className="dashboard-booking-row">
      <div className="dashboard-booking-main">
        <div className="dashboard-booking-icon">
          <span className="material-icons text-blue-600">event</span>
        </div>
        <div>
          <div className="dashboard-booking-title">{b.service}</div>
          <div className="dashboard-booking-meta">
            {new Date(b.start_time).toLocaleString()}
            {b.location ? ` • ${b.location}` : ""}
          </div>
        </div>
      </div>

      <div>
        {String(b.status).toLowerCase() === "confirmed" ? (
          <span className="dashboard-booking-status dashboard-booking-status-confirmed">
            Confirmed
          </span>
        ) : (
          <span className="dashboard-booking-status dashboard-booking-status-pending">
            {b.status}
          </span>
        )}
      </div>
    </div>
  ))
)}

            <div className="dashboard-bookings-footer" onClick={goBookings}>View All Bookings</div>
          </section>
        </div>
      </main>
    </div>
  );
}
