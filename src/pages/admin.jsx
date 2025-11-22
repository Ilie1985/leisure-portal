// src/pages/admin.jsx
import "../styles/dashboard.css"; // reuse top nav styles
import "../styles/admin.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const summaryStats = {
  bookingsToday: 18,
  bookingsWeek: 96,
  bookingsMonth: 342,
  activeMembers: 128,
  revenueToday: "$1,240",
  revenueMonth: "$18,430",
};

const recentActivity = [
  {
    id: 1,
    title: "New booking confirmed",
    detail: "Swimming Lesson • 10:00 AM • John Doe",
    time: "2 mins ago",
    icon: "check_circle",
    color: "text-emerald-500",
  },
  {
    id: 2,
    title: "Membership renewed",
    detail: "Premium plan • Jane Smith",
    time: "15 mins ago",
    icon: "autorenew",
    color: "text-purple-500",
  },
  {
    id: 3,
    title: "Booking cancelled",
    detail: "Hall Reservation • 6:00 PM • Mark Lee",
    time: "32 mins ago",
    icon: "cancel",
    color: "text-rose-500",
  },
  {
    id: 4,
    title: "New user registered",
    detail: "Standard user • emma@example.com",
    time: "1 hour ago",
    icon: "person_add",
    color: "text-blue-500",
  },
];

const bookingsRows = [
  {
    id: "BK-1045",
    user: "John Doe",
    service: "Swimming Lesson",
    date: "Nov 5, 2025",
    time: "10:00",
    status: "Confirmed",
    amount: "$15",
  },
  {
    id: "BK-1046",
    user: "Jane Smith",
    service: "Library Session",
    date: "Nov 5, 2025",
    time: "11:00",
    status: "Pending",
    amount: "$0",
  },
  {
    id: "BK-1047",
    user: "Mark Lee",
    service: "Hall Reservation",
    date: "Nov 5, 2025",
    time: "18:00",
    status: "Cancelled",
    amount: "$50",
  },
  {
    id: "BK-1048",
    user: "Sarah Chen",
    service: "Parking Space",
    date: "Nov 5, 2025",
    time: "All day",
    status: "Confirmed",
    amount: "$10",
  },
  {
    id: "BK-1049",
    user: "Tom Walker",
    service: "Swimming Lesson",
    date: "Nov 6, 2025",
    time: "09:00",
    status: "Pending",
    amount: "$15",
  },
];

export default function AdminPage() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("all");

  const goDashboard = () => navigate("/dashboard");
  const goAdmin = () => navigate("/admin");

  const filteredBookings =
    statusFilter === "all"
      ? bookingsRows
      : bookingsRows.filter((b) => b.status.toLowerCase() === statusFilter);

  return (
    <div className="admin-root">
      {/* Top nav – shows you're in Admin */}
      <header className="dashboard-topbar">
        <div className="dashboard-brand" onClick={goDashboard}>
          <div className="w-9 h-9 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-lg font-bold">
            L
          </div>
          <div className="leading-tight">
            <div className="text-[14px] font-semibold text-slate-900">
              Leisure Management
            </div>
            <div className="text-[11px] text-slate-500">Admin Console</div>
          </div>
        </div>

        <nav className="dashboard-nav">
          <button className="dashboard-nav-link" onClick={goDashboard}>
            <span className="material-icons text-[16px]">home</span>
            <span>User View</span>
          </button>
          <button
            className="dashboard-nav-link dashboard-nav-link-active"
            onClick={goAdmin}
          >
            <span className="material-icons text-[16px]">insights</span>
            <span>Admin Overview</span>
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <button className="relative">
            <span className="material-icons text-slate-500 text-[20px]">
              notifications
            </span>
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
              4
            </span>
          </button>
          <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[14px] font-semibold">
            AD
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="admin-shell">
        <header className="admin-header">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="admin-title">Admin Overview</h1>
              <p className="admin-subtitle">
                Monitor bookings, memberships, and revenue at a glance.
              </p>
            </div>
            <span className="admin-badge">
              <span className="material-icons text-[14px] text-purple-600">
                admin_panel_settings
              </span>
              ADMIN ROLE
            </span>
          </div>
        </header>

        <section className="admin-layout">
          {/* Summary cards */}
          <div className="admin-summary-grid">
            <div className="admin-summary-card">
              <div className="admin-summary-label">
                <span>Bookings Today</span>
                <div className="admin-summary-icon">
                  <span className="material-icons text-[18px] text-blue-500">
                    event_available
                  </span>
                </div>
              </div>
              <div className="admin-summary-value">
                {summaryStats.bookingsToday}
              </div>
              <div className="admin-summary-sub">+12% vs yesterday</div>
            </div>

            <div className="admin-summary-card">
              <div className="admin-summary-label">
                <span>This Week</span>
                <div className="admin-summary-icon">
                  <span className="material-icons text-[18px] text-emerald-500">
                    calendar_view_week
                  </span>
                </div>
              </div>
              <div className="admin-summary-value">
                {summaryStats.bookingsWeek}
              </div>
              <div className="admin-summary-sub">+8 new members</div>
            </div>

            <div className="admin-summary-card">
              <div className="admin-summary-label">
                <span>Active Memberships</span>
                <div className="admin-summary-icon">
                  <span className="material-icons text-[18px] text-purple-500">
                    credit_card
                  </span>
                </div>
              </div>
              <div className="admin-summary-value">
                {summaryStats.activeMembers}
              </div>
              <div className="admin-summary-sub">92% renewal rate</div>
            </div>

            <div className="admin-summary-card">
              <div className="admin-summary-label">
                <span>Revenue (Today)</span>
                <div className="admin-summary-icon">
                  <span className="material-icons text-[18px] text-amber-500">
                    attach_money
                  </span>
                </div>
              </div>
              <div className="admin-summary-value">
                {summaryStats.revenueToday}
              </div>
              <div className="admin-summary-sub">
                {summaryStats.revenueMonth} this month
              </div>
            </div>
          </div>

          {/* Main grid: bookings table + side column */}
          <div className="admin-main-grid">
            {/* BOOKINGS TABLE */}
            <div className="admin-card lg:col-span-2">
              <div className="admin-card-header">
                <div>
                  <div className="admin-card-title">Bookings Management</div>
                  <div className="admin-card-subtitle">
                    Today’s bookings across all services
                  </div>
                </div>
              </div>
              <div className="admin-card-body">
                <div className="admin-bookings-filters">
                  <div className="admin-filter-group">
                    <span>Status:</span>
                    <div className="admin-filter-chips">
                      <button
                        className={
                          "admin-chip " +
                          (statusFilter === "all" ? "admin-chip-active" : "")
                        }
                        onClick={() => setStatusFilter("all")}
                      >
                        All
                      </button>
                      <button
                        className={
                          "admin-chip " +
                          (statusFilter === "confirmed"
                            ? "admin-chip-active"
                            : "")
                        }
                        onClick={() => setStatusFilter("confirmed")}
                      >
                        Confirmed
                      </button>
                      <button
                        className={
                          "admin-chip " +
                          (statusFilter === "pending"
                            ? "admin-chip-active"
                            : "")
                        }
                        onClick={() => setStatusFilter("pending")}
                      >
                        Pending
                      </button>
                      <button
                        className={
                          "admin-chip " +
                          (statusFilter === "cancelled"
                            ? "admin-chip-active"
                            : "")
                        }
                        onClick={() => setStatusFilter("cancelled")}
                      >
                        Cancelled
                      </button>
                    </div>
                  </div>

                  <div className="admin-filter-group">
                    <span className="material-icons text-[14px] text-slate-400">
                      search
                    </span>
                    <span>Search & filters (coming soon)</span>
                  </div>
                </div>

                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Booking ID</th>
                        <th>User</th>
                        <th>Service</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Amount</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookings.map((b) => (
                        <tr key={b.id} className="admin-row">
                          <td>{b.id}</td>
                          <td>{b.user}</td>
                          <td>{b.service}</td>
                          <td>{b.date}</td>
                          <td>{b.time}</td>
                          <td>
                            <span
                              className={
                                "admin-status-badge " +
                                (b.status === "Confirmed"
                                  ? "admin-status-confirmed"
                                  : b.status === "Pending"
                                  ? "admin-status-pending"
                                  : "admin-status-cancelled")
                              }
                            >
                              {b.status}
                            </span>
                          </td>
                          <td>{b.amount}</td>
                          <td>
                            <div className="admin-booking-actions">
                              <span className="admin-action-link">
                                View
                              </span>
                              {b.status === "Pending" && (
                                <>
                                  <span className="admin-action-link">
                                    Approve
                                  </span>
                                  <span className="admin-action-link text-rose-500">
                                    Cancel
                                  </span>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredBookings.length === 0 && (
                        <tr>
                          <td colSpan={8} className="py-6 text-center text-[11px] text-slate-500">
                            No bookings match the selected filter.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN – KPIs & activity */}
            <div className="space-y-6">
              {/* KPIs */}
              <div className="admin-card">
                <div className="admin-card-header">
                  <div>
                    <div className="admin-card-title">Key Metrics</div>
                    <div className="admin-card-subtitle">
                      Quick snapshot of system health
                    </div>
                  </div>
                </div>
                <div className="admin-card-body">
                  <div className="admin-kpi-list">
                    <div className="admin-kpi-item">
                      <div>
                        <div className="admin-kpi-label">
                          Conversion rate (bookings / visits)
                        </div>
                        <div className="admin-kpi-value">37%</div>
                      </div>
                      <span className="admin-kpi-pill">+4.2% this week</span>
                    </div>
                    <div className="admin-kpi-item">
                      <div>
                        <div className="admin-kpi-label">
                          Peak usage time today
                        </div>
                        <div className="admin-kpi-value">6:00 PM</div>
                      </div>
                      <span className="admin-kpi-pill">Hall & Pool</span>
                    </div>
                    <div className="admin-kpi-item">
                      <div>
                        <div className="admin-kpi-label">
                          Expiring memberships (30 days)
                        </div>
                        <div className="admin-kpi-value">24</div>
                      </div>
                      <span className="admin-kpi-pill">Reminders enabled</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Simple chart placeholder */}
              <div className="admin-card">
                <div className="admin-card-header">
                  <div>
                    <div className="admin-card-title">Booking Trends</div>
                    <div className="admin-card-subtitle">
                      Weekly bookings by service (mocked)
                    </div>
                  </div>
                </div>
                <div className="admin-card-body">
                  <div className="admin-chart-placeholder">
                    Chart integration ready – plug in Recharts or another
                    library later.
                  </div>
                </div>
              </div>

              {/* Recent activity */}
              <div className="admin-card">
                <div className="admin-card-header">
                  <div>
                    <div className="admin-card-title">Recent Activity</div>
                    <div className="admin-card-subtitle">
                      Latest bookings, renewals, and changes
                    </div>
                  </div>
                </div>
                <div className="admin-card-body">
                  <div className="admin-activity-list">
                    {recentActivity.map((item) => (
                      <div key={item.id} className="admin-activity-item">
                        <div className="admin-activity-icon">
                          <span
                            className={
                              "material-icons text-[18px] " + item.color
                            }
                          >
                            {item.icon}
                          </span>
                        </div>
                        <div className="admin-activity-main">
                          <div className="admin-activity-title">
                            {item.title}
                          </div>
                          <div className="admin-activity-meta">
                            {item.detail} • {item.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
