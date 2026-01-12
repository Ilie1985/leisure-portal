// // src/pages/admin.jsx
// import "../styles/dashboard.css"; // reuse top nav styles
// import "../styles/admin.css";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";

// const summaryStats = {
//   bookingsToday: 18,
//   bookingsWeek: 96,
//   bookingsMonth: 342,
//   activeMembers: 128,
//   revenueToday: "$1,240",
//   revenueMonth: "$18,430",
// };

// const recentActivity = [
//   {
//     id: 1,
//     title: "New booking confirmed",
//     detail: "Swimming Lesson • 10:00 AM • John Doe",
//     time: "2 mins ago",
//     icon: "check_circle",
//     color: "text-emerald-500",
//   },
//   {
//     id: 2,
//     title: "Membership renewed",
//     detail: "Premium plan • Jane Smith",
//     time: "15 mins ago",
//     icon: "autorenew",
//     color: "text-purple-500",
//   },
//   {
//     id: 3,
//     title: "Booking cancelled",
//     detail: "Hall Reservation • 6:00 PM • Mark Lee",
//     time: "32 mins ago",
//     icon: "cancel",
//     color: "text-rose-500",
//   },
//   {
//     id: 4,
//     title: "New user registered",
//     detail: "Standard user • emma@example.com",
//     time: "1 hour ago",
//     icon: "person_add",
//     color: "text-blue-500",
//   },
// ];

// const bookingsRows = [
//   {
//     id: "BK-1045",
//     user: "John Doe",
//     service: "Swimming Lesson",
//     date: "Nov 5, 2025",
//     time: "10:00",
//     status: "Confirmed",
//     amount: "$15",
//   },
//   {
//     id: "BK-1046",
//     user: "Jane Smith",
//     service: "Library Session",
//     date: "Nov 5, 2025",
//     time: "11:00",
//     status: "Pending",
//     amount: "$0",
//   },
//   {
//     id: "BK-1047",
//     user: "Mark Lee",
//     service: "Hall Reservation",
//     date: "Nov 5, 2025",
//     time: "18:00",
//     status: "Cancelled",
//     amount: "$50",
//   },
//   {
//     id: "BK-1048",
//     user: "Sarah Chen",
//     service: "Parking Space",
//     date: "Nov 5, 2025",
//     time: "All day",
//     status: "Confirmed",
//     amount: "$10",
//   },
//   {
//     id: "BK-1049",
//     user: "Tom Walker",
//     service: "Swimming Lesson",
//     date: "Nov 6, 2025",
//     time: "09:00",
//     status: "Pending",
//     amount: "$15",
//   },
// ];

// export default function AdminPage() {
//   const navigate = useNavigate();
//   const [statusFilter, setStatusFilter] = useState("all");

//   const goDashboard = () => navigate("/dashboard");
//   const goAdmin = () => navigate("/admin");

//   const filteredBookings =
//     statusFilter === "all"
//       ? bookingsRows
//       : bookingsRows.filter((b) => b.status.toLowerCase() === statusFilter);

//   return (
//     <div className="admin-root">
//       {/* Top nav – shows you're in Admin */}
//       <header className="dashboard-topbar">
//         <div className="dashboard-brand" onClick={goDashboard}>
//           <div className="w-9 h-9 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-lg font-bold">
//             L
//           </div>
//           <div className="leading-tight">
//             <div className="text-[14px] font-semibold text-slate-900">
//               Leisure Management
//             </div>
//             <div className="text-[11px] text-slate-500">Admin Console</div>
//           </div>
//         </div>

//         <nav className="dashboard-nav">
//           <button className="dashboard-nav-link" onClick={goDashboard}>
//             <span className="material-icons text-[16px]">home</span>
//             <span>User View</span>
//           </button>
//           <button
//             className="dashboard-nav-link dashboard-nav-link-active"
//             onClick={goAdmin}
//           >
//             <span className="material-icons text-[16px]">insights</span>
//             <span>Admin Overview</span>
//           </button>
//         </nav>

//         <div className="flex items-center gap-4">
//           <button className="relative">
//             <span className="material-icons text-slate-500 text-[20px]">
//               notifications
//             </span>
//             <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
//               4
//             </span>
//           </button>
//           <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[14px] font-semibold">
//             AD
//           </div>
//         </div>
//       </header>

//       {/* Content */}
//       <main className="admin-shell">
//         <header className="admin-header">
//           <div className="flex items-center justify-between gap-3">
//             <div>
//               <h1 className="admin-title">Admin Overview</h1>
//               <p className="admin-subtitle">
//                 Monitor bookings, memberships, and revenue at a glance.
//               </p>
//             </div>
//             <span className="admin-badge">
//               <span className="material-icons text-[14px] text-purple-600">
//                 admin_panel_settings
//               </span>
//               ADMIN ROLE
//             </span>
//           </div>
//         </header>

//         <section className="admin-layout">
//           {/* Summary cards */}
//           <div className="admin-summary-grid">
//             <div className="admin-summary-card">
//               <div className="admin-summary-label">
//                 <span>Bookings Today</span>
//                 <div className="admin-summary-icon">
//                   <span className="material-icons text-[18px] text-blue-500">
//                     event_available
//                   </span>
//                 </div>
//               </div>
//               <div className="admin-summary-value">
//                 {summaryStats.bookingsToday}
//               </div>
//               <div className="admin-summary-sub">+12% vs yesterday</div>
//             </div>

//             <div className="admin-summary-card">
//               <div className="admin-summary-label">
//                 <span>This Week</span>
//                 <div className="admin-summary-icon">
//                   <span className="material-icons text-[18px] text-emerald-500">
//                     calendar_view_week
//                   </span>
//                 </div>
//               </div>
//               <div className="admin-summary-value">
//                 {summaryStats.bookingsWeek}
//               </div>
//               <div className="admin-summary-sub">+8 new members</div>
//             </div>

//             <div className="admin-summary-card">
//               <div className="admin-summary-label">
//                 <span>Active Memberships</span>
//                 <div className="admin-summary-icon">
//                   <span className="material-icons text-[18px] text-purple-500">
//                     credit_card
//                   </span>
//                 </div>
//               </div>
//               <div className="admin-summary-value">
//                 {summaryStats.activeMembers}
//               </div>
//               <div className="admin-summary-sub">92% renewal rate</div>
//             </div>

//             <div className="admin-summary-card">
//               <div className="admin-summary-label">
//                 <span>Revenue (Today)</span>
//                 <div className="admin-summary-icon">
//                   <span className="material-icons text-[18px] text-amber-500">
//                     attach_money
//                   </span>
//                 </div>
//               </div>
//               <div className="admin-summary-value">
//                 {summaryStats.revenueToday}
//               </div>
//               <div className="admin-summary-sub">
//                 {summaryStats.revenueMonth} this month
//               </div>
//             </div>
//           </div>

//           {/* Main grid: bookings table + side column */}
//           <div className="admin-main-grid">
//             {/* BOOKINGS TABLE */}
//             <div className="admin-card lg:col-span-2">
//               <div className="admin-card-header">
//                 <div>
//                   <div className="admin-card-title">Bookings Management</div>
//                   <div className="admin-card-subtitle">
//                     Today’s bookings across all services
//                   </div>
//                 </div>
//               </div>
//               <div className="admin-card-body">
//                 <div className="admin-bookings-filters">
//                   <div className="admin-filter-group">
//                     <span>Status:</span>
//                     <div className="admin-filter-chips">
//                       <button
//                         className={
//                           "admin-chip " +
//                           (statusFilter === "all" ? "admin-chip-active" : "")
//                         }
//                         onClick={() => setStatusFilter("all")}
//                       >
//                         All
//                       </button>
//                       <button
//                         className={
//                           "admin-chip " +
//                           (statusFilter === "confirmed"
//                             ? "admin-chip-active"
//                             : "")
//                         }
//                         onClick={() => setStatusFilter("confirmed")}
//                       >
//                         Confirmed
//                       </button>
//                       <button
//                         className={
//                           "admin-chip " +
//                           (statusFilter === "pending"
//                             ? "admin-chip-active"
//                             : "")
//                         }
//                         onClick={() => setStatusFilter("pending")}
//                       >
//                         Pending
//                       </button>
//                       <button
//                         className={
//                           "admin-chip " +
//                           (statusFilter === "cancelled"
//                             ? "admin-chip-active"
//                             : "")
//                         }
//                         onClick={() => setStatusFilter("cancelled")}
//                       >
//                         Cancelled
//                       </button>
//                     </div>
//                   </div>

//                   <div className="admin-filter-group">
//                     <span className="material-icons text-[14px] text-slate-400">
//                       search
//                     </span>
//                     <span>Search & filters (coming soon)</span>
//                   </div>
//                 </div>

//                 <div className="admin-table-wrapper">
//                   <table className="admin-table">
//                     <thead>
//                       <tr>
//                         <th>Booking ID</th>
//                         <th>User</th>
//                         <th>Service</th>
//                         <th>Date</th>
//                         <th>Time</th>
//                         <th>Status</th>
//                         <th>Amount</th>
//                         <th></th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredBookings.map((b) => (
//                         <tr key={b.id} className="admin-row">
//                           <td>{b.id}</td>
//                           <td>{b.user}</td>
//                           <td>{b.service}</td>
//                           <td>{b.date}</td>
//                           <td>{b.time}</td>
//                           <td>
//                             <span
//                               className={
//                                 "admin-status-badge " +
//                                 (b.status === "Confirmed"
//                                   ? "admin-status-confirmed"
//                                   : b.status === "Pending"
//                                   ? "admin-status-pending"
//                                   : "admin-status-cancelled")
//                               }
//                             >
//                               {b.status}
//                             </span>
//                           </td>
//                           <td>{b.amount}</td>
//                           <td>
//                             <div className="admin-booking-actions">
//                               <span className="admin-action-link">
//                                 View
//                               </span>
//                               {b.status === "Pending" && (
//                                 <>
//                                   <span className="admin-action-link">
//                                     Approve
//                                   </span>
//                                   <span className="admin-action-link text-rose-500">
//                                     Cancel
//                                   </span>
//                                 </>
//                               )}
//                             </div>
//                           </td>
//                         </tr>
//                       ))}
//                       {filteredBookings.length === 0 && (
//                         <tr>
//                           <td colSpan={8} className="py-6 text-center text-[11px] text-slate-500">
//                             No bookings match the selected filter.
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>

//             {/* RIGHT COLUMN – KPIs & activity */}
//             <div className="space-y-6">
//               {/* KPIs */}
//               <div className="admin-card">
//                 <div className="admin-card-header">
//                   <div>
//                     <div className="admin-card-title">Key Metrics</div>
//                     <div className="admin-card-subtitle">
//                       Quick snapshot of system health
//                     </div>
//                   </div>
//                 </div>
//                 <div className="admin-card-body">
//                   <div className="admin-kpi-list">
//                     <div className="admin-kpi-item">
//                       <div>
//                         <div className="admin-kpi-label">
//                           Conversion rate (bookings / visits)
//                         </div>
//                         <div className="admin-kpi-value">37%</div>
//                       </div>
//                       <span className="admin-kpi-pill">+4.2% this week</span>
//                     </div>
//                     <div className="admin-kpi-item">
//                       <div>
//                         <div className="admin-kpi-label">
//                           Peak usage time today
//                         </div>
//                         <div className="admin-kpi-value">6:00 PM</div>
//                       </div>
//                       <span className="admin-kpi-pill">Hall & Pool</span>
//                     </div>
//                     <div className="admin-kpi-item">
//                       <div>
//                         <div className="admin-kpi-label">
//                           Expiring memberships (30 days)
//                         </div>
//                         <div className="admin-kpi-value">24</div>
//                       </div>
//                       <span className="admin-kpi-pill">Reminders enabled</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Simple chart placeholder */}
//               <div className="admin-card">
//                 <div className="admin-card-header">
//                   <div>
//                     <div className="admin-card-title">Booking Trends</div>
//                     <div className="admin-card-subtitle">
//                       Weekly bookings by service (mocked)
//                     </div>
//                   </div>
//                 </div>
//                 <div className="admin-card-body">
//                   <div className="admin-chart-placeholder">
//                     Chart integration ready – plug in Recharts or another
//                     library later.
//                   </div>
//                 </div>
//               </div>

//               {/* Recent activity */}
//               <div className="admin-card">
//                 <div className="admin-card-header">
//                   <div>
//                     <div className="admin-card-title">Recent Activity</div>
//                     <div className="admin-card-subtitle">
//                       Latest bookings, renewals, and changes
//                     </div>
//                   </div>
//                 </div>
//                 <div className="admin-card-body">
//                   <div className="admin-activity-list">
//                     {recentActivity.map((item) => (
//                       <div key={item.id} className="admin-activity-item">
//                         <div className="admin-activity-icon">
//                           <span
//                             className={
//                               "material-icons text-[18px] " + item.color
//                             }
//                           >
//                             {item.icon}
//                           </span>
//                         </div>
//                         <div className="admin-activity-main">
//                           <div className="admin-activity-title">
//                             {item.title}
//                           </div>
//                           <div className="admin-activity-meta">
//                             {item.detail} • {item.time}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }


// src/pages/admin.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css"; // reuse top nav styles if you want
import "../styles/admin.css"; // optional (if you have it)
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/auth.jsx";

export default function AdminPage() {
  const navigate = useNavigate();
  const { role } = useAuth();

  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  const [filter, setFilter] = useState("all"); // all | confirmed | pending | cancelled
  const [q, setQ] = useState("");

  // --------- NAV ----------
  const goDashboard = () => navigate("/dashboard");
  const goAdmin = () => navigate("/admin");

  // --------- LOAD ----------
  async function loadAllBookings() {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("start_time", { ascending: false });

    if (error) {
      setError(error.message);
      setBookings([]);
    } else {
      setBookings(data ?? []);
    }

    setLoading(false);
  }

  useEffect(() => {
    // AdminRoute should already block non-admins, but this keeps it safe.
    if (role === "ADMIN") loadAllBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  // --------- ACTIONS ----------
  async function setStatus(id, status) {
    setError("");
    const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
    if (error) {
      setError(error.message);
      return;
    }
    loadAllBookings();
  }

  async function deleteBooking(id) {
    const ok = window.confirm("Delete this booking? This cannot be undone.");
    if (!ok) return;

    setError("");
    const { error } = await supabase.from("bookings").delete().eq("id", id);
    if (error) {
      setError(error.message);
      return;
    }
    loadAllBookings();
  }

  // --------- DERIVED DATA ----------
  const now = useMemo(() => new Date(), []);

  const filtered = useMemo(() => {
    let list = bookings;

    if (filter !== "all") list = list.filter((b) => (b.status || "").toLowerCase() === filter);

    if (q.trim()) {
      const query = q.trim().toLowerCase();
      list = list.filter((b) => {
        const service = (b.service || "").toLowerCase();
        const location = (b.location || "").toLowerCase();
        const userId = (b.user_id || "").toLowerCase();
        return service.includes(query) || location.includes(query) || userId.includes(query);
      });
    }

    return list;
  }, [bookings, filter, q]);

  const bookingsToday = useMemo(() => {
    return bookings.filter((b) => {
      const d = new Date(b.start_time);
      return d.toDateString() === now.toDateString();
    }).length;
  }, [bookings, now]);

  const confirmedCount = useMemo(
    () => bookings.filter((b) => (b.status || "").toLowerCase() === "confirmed").length,
    [bookings]
  );
  const pendingCount = useMemo(
    () => bookings.filter((b) => (b.status || "").toLowerCase() === "pending").length,
    [bookings]
  );
  const cancelledCount = useMemo(
    () => bookings.filter((b) => (b.status || "").toLowerCase() === "cancelled").length,
    [bookings]
  );

  const revenueToday = useMemo(() => {
    const totalCents = bookings
      .filter((b) => {
        const d = new Date(b.start_time);
        const isToday = d.toDateString() === now.toDateString();
        const isCancelled = (b.status || "").toLowerCase() === "cancelled";
        return isToday && !isCancelled;
      })
      .reduce((sum, b) => sum + (Number(b.price_cents) || 0), 0);

    return totalCents;
  }, [bookings, now]);

  const revenueTodayFormatted = useMemo(() => {
    const dollars = revenueToday / 100;
    return dollars.toLocaleString(undefined, { style: "currency", currency: "USD" });
  }, [revenueToday]);

  // --------- UI ----------
  return (
    <div className="dashboard-root">
      {/* Top nav */}
      <header className="dashboard-topbar">
        <div className="dashboard-brand cursor-pointer" onClick={goAdmin}>
          <div className="w-9 h-9 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-lg font-bold">
            L
          </div>
          <div className="leading-tight">
            <div className="text-[14px] font-semibold text-slate-900">Leisure Management</div>
            <div className="text-[11px] text-slate-500">Admin Console</div>
          </div>
        </div>

        <nav className="dashboard-nav">
          <button className="dashboard-nav-link" onClick={goDashboard}>
            <span className="material-icons text-[16px]">home</span>
            <span>User View</span>
          </button>

          <button className="dashboard-nav-link dashboard-nav-link-active" onClick={goAdmin}>
            <span className="material-icons text-[16px]">insights</span>
            <span>Admin Overview</span>
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <button className="relative">
            <span className="material-icons text-slate-500 text-[20px]">notifications</span>
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
              4
            </span>
          </button>
          <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-[14px] font-semibold">
            AD
          </div>
        </div>
      </header>

      <main className="dashboard-shell">
        <div className="dashboard-main">
          {/* Header */}
          <section className="mb-6">
            <div className="text-[32px] font-bold text-slate-900">Admin Overview</div>
            <div className="text-slate-500">
              Monitor bookings and manage them securely using Supabase + RLS.
            </div>

            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-[12px] font-semibold">
              <span className="material-icons text-[16px]">verified_user</span>
              ADMIN ROLE
            </div>
          </section>

          {/* Error */}
          {error && (
            <div className="mb-4 text-[13px] text-rose-700 bg-rose-50 border border-rose-100 rounded-xl px-3 py-2">
              {error}
            </div>
          )}

          {/* Loading */}
          {loading ? (
            <div className="min-h-[300px] flex items-center justify-center text-slate-600">
              Loading bookings from Supabase…
            </div>
          ) : (
            <>
              {/* Stats cards */}
              <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <StatCard
                  label="Bookings Today"
                  value={bookingsToday}
                  icon="calendar_today"
                />
                <StatCard label="Total Bookings" value={bookings.length} icon="list_alt" />
                <StatCard
                  label="Revenue (Today)"
                  value={revenueTodayFormatted}
                  icon="attach_money"
                />
                <StatCard
                  label="Status Breakdown"
                  value={`${confirmedCount}C / ${pendingCount}P / ${cancelledCount}X`}
                  icon="insights"
                />
              </section>

              {/* Filters + Search */}
              <section className="mt-8 bg-white rounded-3xl border border-slate-100 shadow-sm p-5">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex flex-wrap gap-2">
                    <FilterPill active={filter === "all"} onClick={() => setFilter("all")}>
                      All
                    </FilterPill>
                    <FilterPill
                      active={filter === "confirmed"}
                      onClick={() => setFilter("confirmed")}
                    >
                      Confirmed
                    </FilterPill>
                    <FilterPill active={filter === "pending"} onClick={() => setFilter("pending")}>
                      Pending
                    </FilterPill>
                    <FilterPill
                      active={filter === "cancelled"}
                      onClick={() => setFilter("cancelled")}
                    >
                      Cancelled
                    </FilterPill>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                        search
                      </span>
                      <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Search service, location, user_id…"
                        className="h-10 pl-10 pr-3 rounded-full border border-slate-200 text-[13px] outline-none focus:border-blue-400"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={loadAllBookings}
                      className="h-10 px-4 rounded-full bg-slate-900 text-white text-[13px] font-medium hover:bg-black transition"
                    >
                      Refresh
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="mt-5 overflow-x-auto">
                  {filtered.length === 0 ? (
                    <div className="py-10 text-center text-slate-500 text-[13px]">
                      No bookings match your filters.
                    </div>
                  ) : (
                    <table className="min-w-[900px] w-full text-[13px]">
                      <thead>
                        <tr className="text-left text-slate-500 border-b border-slate-100">
                          <th className="py-3 pr-4">Service</th>
                          <th className="py-3 pr-4">User ID</th>
                          <th className="py-3 pr-4">Start</th>
                          <th className="py-3 pr-4">Location</th>
                          <th className="py-3 pr-4">Price</th>
                          <th className="py-3 pr-4">Status</th>
                          <th className="py-3 pr-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.map((b) => (
                          <tr key={b.id} className="border-b border-slate-100">
                            <td className="py-3 pr-4 font-semibold text-slate-900">
                              {b.service}
                            </td>
                            <td className="py-3 pr-4 text-slate-600 font-mono">
                              {b.user_id}
                            </td>
                            <td className="py-3 pr-4 text-slate-700">
                              {new Date(b.start_time).toLocaleString()}
                            </td>
                            <td className="py-3 pr-4 text-slate-700">{b.location || "-"}</td>
                            <td className="py-3 pr-4 text-slate-700">
                              {((Number(b.price_cents) || 0) / 100).toLocaleString(undefined, {
                                style: "currency",
                                currency: "USD",
                              })}
                            </td>
                            <td className="py-3 pr-4">
                              <StatusBadge status={b.status} />
                            </td>
                            <td className="py-3 pr-4">
                              <div className="flex flex-wrap gap-2">
                                <button
                                  className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100"
                                  onClick={() => setStatus(b.id, "confirmed")}
                                  type="button"
                                >
                                  Confirm
                                </button>

                                <button
                                  className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100 hover:bg-amber-100"
                                  onClick={() => setStatus(b.id, "pending")}
                                  type="button"
                                >
                                  Pending
                                </button>

                                <button
                                  className="px-3 py-1 rounded-full bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100"
                                  onClick={() => setStatus(b.id, "cancelled")}
                                  type="button"
                                >
                                  Cancel
                                </button>

                                <button
                                  className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-100 hover:bg-rose-100"
                                  onClick={() => deleteBooking(b.id)}
                                  type="button"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </section>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[12px] text-slate-500 uppercase tracking-wide">{label}</div>
          <div className="mt-2 text-[28px] font-bold text-slate-900">{value}</div>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center">
          <span className="material-icons text-blue-600">{icon}</span>
        </div>
      </div>
    </div>
  );
}

function FilterPill({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "h-9 px-4 rounded-full border text-[13px] transition " +
        (active
          ? "bg-slate-900 text-white border-slate-900"
          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50")
      }
    >
      {children}
    </button>
  );
}

function StatusBadge({ status }) {
  const s = (status || "pending").toLowerCase();

  const cls =
    s === "confirmed"
      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
      : s === "cancelled"
      ? "bg-rose-50 text-rose-700 border-rose-100"
      : "bg-amber-50 text-amber-700 border-amber-100";

  return (
    <span className={"inline-flex items-center px-3 py-1 rounded-full border " + cls}>
      {s}
    </span>
  );
}
