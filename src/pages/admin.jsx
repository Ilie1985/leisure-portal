import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import "../styles/admin.css"; 
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

  // navigation
  const goDashboard = () => navigate("/dashboard");
  const goAdmin = () => navigate("/admin");

  // load
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

  // actions
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

  // Derived data 

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

  // UI logic

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
