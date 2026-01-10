import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/auth.jsx";
import "../styles/bookings.css";

export default function BookingsPage() {
  const { user } = useAuth();
const navigate = useNavigate();
  const [tab, setTab] = useState("upcoming"); // upcoming | past
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  const now = useMemo(() => new Date(), []);

  async function loadBookings() {
    if (!user) return;

    setLoading(true);
    setError("");

    const { data, error } = await supabase
  .from("bookings")
  .select("*")
  .order("start_time", { ascending: true });


    if (error) {
      setError(error.message);
      setBookings([]);
    } else {
      setBookings(data ?? []);
    }

    setLoading(false);
  }

  async function createDemoBooking() {
    if (!user) return;

    const start = new Date();
    start.setDate(start.getDate() + 3);
    start.setHours(14, 0, 0, 0);

    const { error } = await supabase.from("bookings").insert([
      {
        user_id: user.id,
        service: "Swimming Lessons",
        location: "Main Pool",
        duration_minutes: 60,
        price_cents: 1500,
        start_time: start.toISOString(),
        status: "confirmed",
      },
    ]);

    if (error) {
      setError(error.message);
      return;
    }

    loadBookings();
  }

  useEffect(() => {
    loadBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const upcoming = bookings.filter((b) => new Date(b.start_time) >= now);
  const past = bookings.filter((b) => new Date(b.start_time) < now);
  const activeList = tab === "upcoming" ? upcoming : past;

  return (
    <div className="bookings-root">
      <div className="bookings-shell">
        <div className="bookings-header flex items-start justify-between gap-4">
          <div>
            <div className="bookings-title">My Bookings</div>
            <div className="bookings-subtitle">
              View and manage all your leisure centre reservations
            </div>
          </div>

<div className="flex items-center gap-3">
  <button
    type="button"
    onClick={() => navigate("/dashboard")}
    className="h-10 px-4 rounded-full border border-slate-200 bg-white text-slate-700 text-[13px] hover:bg-slate-50 transition"
  >
    ← Dashboard
  </button>

  <button
    type="button"
    onClick={createDemoBooking}
    className="h-10 px-4 rounded-full bg-slate-900 text-white text-[13px] font-medium hover:bg-black transition"
  >
    + Add demo booking
  </button>
</div>


          {/* Demo button for testing
          <button
            type="button"
            onClick={createDemoBooking}
            className="h-10 px-4 rounded-full bg-slate-900 text-white text-[13px] font-medium hover:bg-black transition"
          >
            + Add demo booking
          </button> */}
        </div>

        <div className="bookings-tabs">
          <button
            type="button"
            onClick={() => setTab("upcoming")}
            className={`bookings-tab ${
              tab === "upcoming" ? "bookings-tab-active" : ""
            }`}
          >
            Upcoming ({upcoming.length})
          </button>

          <button
            type="button"
            onClick={() => setTab("past")}
            className={`bookings-tab ${tab === "past" ? "bookings-tab-active" : ""}`}
          >
            Past ({past.length})
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="bookings-empty-card">
            <div className="bookings-empty-title">Loading…</div>
            <div className="bookings-empty-text">Fetching from Supabase</div>
          </div>
        ) : error ? (
          <div className="bookings-empty-card">
            <div className="bookings-empty-title">Error</div>
            <div className="bookings-empty-text">{error}</div>
          </div>
        ) : activeList.length === 0 ? (
          <div className="bookings-empty-card">
            <div className="bookings-empty-icon">
              <span className="material-icons text-slate-400">event</span>
            </div>
            <div className="bookings-empty-title">No upcoming bookings</div>
            <div className="bookings-empty-text">Book a service to see it here</div>
          </div>
        ) : (
          <div className="mt-4 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <div className="divide-y divide-slate-100">
              {activeList.map((b) => (
                <div key={b.id} className="px-6 py-4 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      {b.service}
                    </div>
                    <div className="text-[12px] text-slate-500">
                      {new Date(b.start_time).toLocaleString()}
                      {b.location ? ` • ${b.location}` : ""}
                      {b.duration_minutes ? ` • ${b.duration_minutes} min` : ""}
                    </div>
                  </div>

                  <span className="text-[11px] px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                    {b.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
