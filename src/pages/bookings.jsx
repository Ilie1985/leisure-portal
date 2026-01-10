// // src/pages/bookings.jsx
// import "../styles/dashboard.css";   // reuse the top nav styles
// import "../styles/bookings.css";
// import { useNavigate } from "react-router-dom";

// export default function BookingsPage() {
//   const navigate = useNavigate();

//   const goDashboard = () => navigate("/dashboard");
//   const goBook = () => navigate("/book");
//   const goBookings = () => navigate("/bookings");
//   const goMembership = () => navigate("/membership");
//   const goProfile = () => navigate("/profile");

//   return (
//     <div className="bookings-root">
//       {/* Top nav (same as dashboard / book, but My Bookings active) */}
//       <header className="dashboard-topbar">
//         <div className="dashboard-brand" onClick={goDashboard}>
//           <div className="w-9 h-9 rounded-2xl bg-blue-600 flex items-center justify-center text-white text-lg font-bold">
//             L
//           </div>
//           <div className="leading-tight">
//             <div className="text-[14px] font-semibold text-slate-900">
//               Leisure Management
//             </div>
//             <div className="text-[11px] text-slate-500">Your wellness hub</div>
//           </div>
//         </div>

//         <nav className="dashboard-nav">
//           <button className="dashboard-nav-link" onClick={goDashboard}>
//             <span className="material-icons text-[16px]">home</span>
//             <span>Dashboard</span>
//           </button>
//           <button className="dashboard-nav-link" onClick={goBook}>
//             <span className="material-icons text-[16px]">calendar_today</span>
//             <span>Book Services</span>
//           </button>
//           <button
//             className="dashboard-nav-link dashboard-nav-link-active"
//             onClick={goBookings}
//           >
//             <span className="material-icons text-[16px]">list_alt</span>
//             <span>My Bookings</span>
//           </button>
//           <button className="dashboard-nav-link" onClick={goMembership}>
//             <span className="material-icons text-[16px]">credit_card</span>
//             <span>Membership</span>
//           </button>
//           <button className="dashboard-nav-link" onClick={goProfile}>
//             <span className="material-icons text-[16px]">person</span>
//             <span>Profile</span>
//           </button>
//         </nav>

//         <div className="flex items-center gap-4">
//           <button className="relative">
//             <span className="material-icons text-slate-500 text-[20px]">
//               notifications
//             </span>
//             <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">
//               2
//             </span>
//           </button>
//           <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-[14px] font-semibold">
//             JD
//           </div>
//         </div>
//       </header>

//       {/* Page content */}
//       <main className="bookings-shell">
//         <header className="bookings-header">
//           <h1 className="bookings-title">My Bookings</h1>
//           <p className="bookings-subtitle">
//             View and manage all your leisure centre reservations
//           </p>
//         </header>

//         {/* Tabs */}
//         <div className="bookings-tabs">
//           <button className="bookings-tab bookings-tab-active">
//             Upcoming (0)
//           </button>
//           <button className="bookings-tab">Past (6)</button>
//         </div>

//         {/* Empty state for upcoming bookings (matches your Figma) */}
//         <section className="bookings-empty-card">
//           <div className="bookings-empty-icon">
//             <span className="material-icons text-slate-300 text-[30px]">
//               event
//             </span>
//           </div>
//           <div className="bookings-empty-title">No upcoming bookings</div>
//           <div className="bookings-empty-text">
//             Book a service to see it here
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }






// import { useEffect, useMemo, useState } from "react";
// import { supabase } from "../lib/supabaseClient";
// import { useAuth } from "../context/auth.jsx";
// import "../styles/bookings.css";

// export default function BookingsPage() {
//   const { user } = useAuth();

//   const [tab, setTab] = useState("upcoming"); // upcoming | past
//   const [loading, setLoading] = useState(true);
//   const [bookings, setBookings] = useState([]);
//   const [error, setError] = useState("");

//   const now = useMemo(() => new Date(), []);

//   async function loadBookings() {
//     if (!user) return;

//     setLoading(true);
//     setError("");

//     const { data, error } = await supabase
//       .from("bookings")
//       .select("*")
//       .eq("user_id", user.id)
//       .order("start_time", { ascending: true });

//     if (error) {
//       setError(error.message);
//       setBookings([]);
//     } else {
//       setBookings(data ?? []);
//     }

//     setLoading(false);
//   }

//   // Quick test button: insert a demo booking for the logged in user
//   async function createDemoBooking() {
//     if (!user) return;

//     const start = new Date();
//     start.setDate(start.getDate() + 3);
//     start.setHours(14, 0, 0, 0);

//     const { error } = await supabase.from("bookings").insert([
//       {
//         user_id: user.id,
//         service: "Swimming Lessons",
//         location: "Main Pool",
//         duration_minutes: 60,
//         price_cents: 1500,
//         start_time: start.toISOString(),
//         status: "confirmed",
//       },
//     ]);

//     if (error) {
//       setError(error.message);
//       return;
//     }

//     loadBookings();
//   }

//   useEffect(() => {
//     loadBookings();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [user?.id]);

//   const upcoming = bookings.filter((b) => new Date(b.start_time) >= now);
//   const past = bookings.filter((b) => new Date(b.start_time) < now);

//   const activeList = tab === "upcoming" ? upcoming : past;

//   return (
//     <div className="bookings-root">
//       {/* Header / title area is already styled in your bookings.css */}
//       <div className="bookings-shell">
//         <div className="bookings-header">
//           <div>
//             <div className="bookings-title">My Bookings</div>
//             <div className="bookings-subtitle">
//               View and manage all your leisure centre reservations
//             </div>
//           </div>

//           {/* helpful test button */}
//           <button
//             onClick={createDemoBooking}
//             className="bookings-demo-button"
//             type="button"
//           >
//             + Add demo booking
//           </button>
//         </div>

//         {/* Tabs */}
//         <div className="bookings-tabs">
//           <button
//             type="button"
//             onClick={() => setTab("upcoming")}
//             className={`bookings-tab ${
//               tab === "upcoming" ? "bookings-tab-active" : ""
//             }`}
//           >
//             Upcoming ({upcoming.length})
//           </button>

//           <button
//             type="button"
//             onClick={() => setTab("past")}
//             className={`bookings-tab ${
//               tab === "past" ? "bookings-tab-active" : ""
//             }`}
//           >
//             Past ({past.length})
//           </button>
//         </div>

//         {/* Content */}
//         <div className="bookings-card">
//           {loading ? (
//             <div className="bookings-empty">
//               <div className="bookings-empty-title">Loading…</div>
//               <div className="bookings-empty-sub">Fetching from Supabase</div>
//             </div>
//           ) : error ? (
//             <div className="bookings-empty">
//               <div className="bookings-empty-title">Error</div>
//               <div className="bookings-empty-sub">{error}</div>
//             </div>
//           ) : activeList.length === 0 ? (
//             <div className="bookings-empty">
//               <div className="bookings-empty-title">
//                 No {tab === "upcoming" ? "upcoming" : "past"} bookings
//               </div>
//               <div className="bookings-empty-sub">
//                 Book a service to see it here
//               </div>
//             </div>
//           ) : (
//             <div className="bookings-list">
//               {activeList.map((b) => (
//                 <div key={b.id} className="bookings-row">
//                   <div className="bookings-row-left">
//                     <div className="bookings-row-title">{b.service}</div>
//                     <div className="bookings-row-meta">
//                       {new Date(b.start_time).toLocaleString()}
//                       {b.location ? ` • ${b.location}` : ""}
//                       {b.duration_minutes
//                         ? ` • ${b.duration_minutes} min`
//                         : ""}
//                     </div>
//                   </div>

//                   <div className="bookings-row-right">
//                     <span className={`bookings-status bookings-status-${b.status}`}>
//                       {b.status}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/auth.jsx";
import "../styles/bookings.css";

export default function BookingsPage() {
  const { user } = useAuth();

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

          {/* Demo button for testing */}
          <button
            type="button"
            onClick={createDemoBooking}
            className="h-10 px-4 rounded-full bg-slate-900 text-white text-[13px] font-medium hover:bg-black transition"
          >
            + Add demo booking
          </button>
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
