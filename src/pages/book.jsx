// import "../styles/dashboard.css";
// import "../styles/book.css";
// import { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { supabase } from "../lib/supabaseClient";
// import { useAuth } from "../context/auth.jsx";
// import Topbar from "../components/Topbar.jsx";

// const SERVICES = [
//   {
//     id: "swim",
//     name: "Swimming Lessons",
//     subtitle: "1 hour • Main Pool",
//     durationLabel: "1 hour",
//     durationMinutes: 60,
//     price: 15,
//     priceCents: 1500,
//     icon: "pool",
//     accent: "blue",
//     location: "Main Pool",
//   },
//   {
//     id: "library",
//     name: "Library Sessions",
//     subtitle: "2 hours • Reading / Study Room",
//     durationLabel: "2 hours",
//     durationMinutes: 120,
//     price: 0,
//     priceCents: 0,
//     icon: "local_library",
//     accent: "emerald",
//     location: "Reading / Study Room",
//   },
//   {
//     id: "hall",
//     name: "Hall Reservations",
//     subtitle: "3 hours • Conference Hall A",
//     durationLabel: "3 hours",
//     durationMinutes: 180,
//     price: 50,
//     priceCents: 5000,
//     icon: "storefront",
//     accent: "purple",
//     location: "Conference Hall A",
//   },
//   {
//     id: "parking",
//     name: "Parking Spaces",
//     subtitle: "All day • Parking Lot B",
//     durationLabel: "All day",
//     durationMinutes: 24 * 60,
//     price: 10,
//     priceCents: 1000,
//     icon: "local_parking",
//     accent: "orange",
//     location: "Parking Lot B",
//   },
// ];

// const TIME_SLOTS = {
//   swim: [
//     { time: "09:00", available: false },
//     { time: "10:00", available: true },
//     { time: "11:00", available: true },
//     { time: "14:00", available: false },
//     { time: "15:00", available: true },
//     { time: "16:00", available: false },
//   ],
//   library: [
//     { time: "09:00", available: true },
//     { time: "11:00", available: false },
//     { time: "13:00", available: true },
//     { time: "15:00", available: false },
//   ],
//   hall: [
//     { time: "10:00", available: true },
//     { time: "14:00", available: true },
//     { time: "18:00", available: false },
//   ],
//   parking: [{ time: "All Day", available: true }],
// };

// // Weekly overview (still static for visual)
// const AVAILABILITY_TIMES = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];
// const AVAILABILITY_SERVICES = ["Swimming", "Library", "Hall", "Parking"];
// const SAMPLE_AVAIL = {
//   "09:00": { Swimming: "Available", Library: "Booked", Hall: "Available", Parking: "Available" },
//   "10:00": { Swimming: "Available", Library: "Available", Hall: "Available", Parking: "Available" },
//   "11:00": { Swimming: "Booked", Library: "Booked", Hall: "Booked", Parking: "Booked" },
//   "14:00": { Swimming: "Available", Library: "Booked", Hall: "Booked", Parking: "Booked" },
//   "15:00": { Swimming: "Available", Library: "Available", Hall: "Booked", Parking: "Available" },
//   "16:00": { Swimming: "Available", Library: "Booked", Hall: "Available", Parking: "Booked" },
// };

// // ---------- date helpers (no extra libraries) ----------
// function startOfDay(d) {
//   const x = new Date(d);
//   x.setHours(0, 0, 0, 0);
//   return x;
// }
// function startOfMonth(d) {
//   const x = new Date(d);
//   x.setDate(1);
//   x.setHours(0, 0, 0, 0);
//   return x;
// }
// function addMonths(d, n) {
//   const x = new Date(d);
//   x.setMonth(x.getMonth() + n);
//   return x;
// }
// function daysInMonth(d) {
//   const year = d.getFullYear();
//   const month = d.getMonth();
//   return new Date(year, month + 1, 0).getDate();
// }
// function isSameDay(a, b) {
//   return (
//     a?.getFullYear() === b?.getFullYear() &&
//     a?.getMonth() === b?.getMonth() &&
//     a?.getDate() === b?.getDate()
//   );
// }
// function formatMonthYear(d) {
//   return new Intl.DateTimeFormat(undefined, { month: "long", year: "numeric" }).format(d);
// }
// function formatLongDate(d) {
//   return new Intl.DateTimeFormat(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" }).format(d);
// }

// export default function BookPage() {
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const [selectedServiceId, setSelectedServiceId] = useState("swim");

//   // ✅ default selection: tomorrow (so it’s always future-friendly)
//   const today = useMemo(() => startOfDay(new Date()), []);
//   const tomorrow = useMemo(() => {
//     const t = new Date(today);
//     t.setDate(t.getDate() + 1);
//     return t;
//   }, [today]);

//   const [selectedDate, setSelectedDate] = useState(tomorrow);
//   const [viewMonth, setViewMonth] = useState(startOfMonth(tomorrow));
//   const [selectedTime, setSelectedTime] = useState("10:00");

//   const service = useMemo(
//     () => SERVICES.find((s) => s.id === selectedServiceId),
//     [selectedServiceId]
//   );

//   const timeOptions = TIME_SLOTS[selectedServiceId] || [];

//   // ensure selectedTime always valid for service
//   useEffect(() => {
//     const firstAvailable = timeOptions.find((t) => t.available)?.time || "";
//     if (!firstAvailable) return;
//     if (!timeOptions.some((t) => t.time === selectedTime && t.available)) {
//       setSelectedTime(firstAvailable);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [selectedServiceId]);

//   // Calendar grid for current viewMonth
//   const calendarCells = useMemo(() => {
//     const first = startOfMonth(viewMonth);
//     const total = daysInMonth(first);
//     const startWeekday = first.getDay(); // 0 Sun .. 6 Sat

//     // blanks for alignment
//     const blanks = Array.from({ length: startWeekday }, (_, i) => ({
//       type: "blank",
//       key: `blank-${i}`,
//     }));

//     const days = Array.from({ length: total }, (_, i) => {
//       const dayNum = i + 1;
//       const date = new Date(first);
//       date.setDate(dayNum);

//       const disabled = startOfDay(date) < today; // disable past
//       return {
//         type: "day",
//         key: `day-${dayNum}`,
//         dayNum,
//         date,
//         disabled,
//         selected: isSameDay(date, selectedDate),
//       };
//     });

//     return [...blanks, ...days];
//   }, [viewMonth, selectedDate, today]);

//   const canGoPrev = useMemo(() => {
//     // don’t allow navigating to months entirely in the past
//     return startOfMonth(viewMonth) > startOfMonth(today);
//   }, [viewMonth, today]);

//   const handleConfirm = async () => {
//     if (!user) {
//       alert("You must be logged in to book.");
//       return;
//     }

//     // Build start_time from selectedDate + selectedTime
//     const start = new Date(selectedDate);

//     if (selectedTime === "All Day") {
//       start.setHours(9, 0, 0, 0); // default start time for all-day
//     } else {
//       const [hh, mm] = selectedTime.split(":").map((x) => Number(x));
//       start.setHours(hh || 0, mm || 0, 0, 0);
//     }

//     const payload = {
//       user_id: user.id,
//       service: service.name,
//       location: service.location,
//       duration_minutes: service.durationMinutes,
//       price_cents: service.priceCents,
//       start_time: start.toISOString(),
//       status: "confirmed",
//     };

//     const { error } = await supabase.from("bookings").insert([payload]);

//     if (error) {
//       alert(`Booking failed: ${error.message}`);
//       return;
//     }

//     // go see it in My Bookings
//     navigate("/bookings");
//   };

//   return (
//     <div className="dashboard-root">
//       {/* ✅ shared topbar with logout + admin button */}
//       <Topbar active="book" />

//       <main className="dashboard-shell">
//         <div className="book-main">
//           {/* Header */}
//           <section>
//             <h1 className="book-header-title">Book a Service</h1>
//             <p className="book-header-subtitle">
//               Choose from our range of leisure services and find a time that works for you.
//             </p>

//             {/* Service cards */}
//             <div className="book-services-row">
//               {SERVICES.map((s) => (
//                 <div
//                   key={s.id}
//                   className={`book-service-card ${s.id === selectedServiceId ? "book-service-card-active" : ""}`}
//                   onClick={() => {
//                     setSelectedServiceId(s.id);
//                     const firstAvailable = (TIME_SLOTS[s.id] || []).find((t) => t.available)?.time || "";
//                     setSelectedTime(firstAvailable);
//                   }}
//                 >
//                   <div className="book-service-card-inner" />
//                   <div className="book-service-card-content">
//                     <div>
//                       <div className="book-service-title">{s.name}</div>
//                       <div className="book-service-subtitle">{s.subtitle}</div>
//                     </div>
//                     <div className="flex items-center justify-between text-[12px]">
//                       <span className="book-service-badge">
//                         <span className="material-icons text-[14px]">{s.icon}</span>
//                         {s.durationLabel}
//                       </span>
//                       <span className="font-semibold">{s.price === 0 ? "Free" : `$${s.price}`}</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>

//           {/* Booking grid */}
//           <section className="book-grid">
//             {/* Left: detail + calendar + times */}
//             <div className="book-detail-card">
//               <div className="book-detail-header">
//                 <div>
//                   <div className="book-detail-title">{service.name}</div>
//                   <div className="text-[13px] text-slate-500">
//                     Select your preferred date and time slot
//                   </div>
//                 </div>

//                 <div className="book-detail-meta">
//                   <span className="book-detail-meta-pill">
//                     <span className="material-icons text-[16px] text-blue-500">schedule</span>
//                     {service.durationLabel}
//                   </span>
//                   <span className="book-detail-meta-pill">
//                     <span className="material-icons text-[16px] text-slate-500">place</span>
//                     {service.location}
//                   </span>
//                   <span className="book-detail-meta-pill">
//                     <span className="material-icons text-[16px] text-emerald-500">attach_money</span>
//                     {service.price === 0 ? "Free" : `$${service.price}`}
//                   </span>
//                 </div>
//               </div>

//               {/* ✅ REAL Calendar */}
//               <div className="book-calendar">
//                 <div className="book-calendar-header">
//                   <span className="font-medium text-slate-700">{formatMonthYear(viewMonth)}</span>

//                   <div className="flex items-center gap-2">
//                     <button
//                       type="button"
//                       className="h-8 px-3 rounded-full border border-slate-200 bg-white text-slate-700 text-[12px] hover:bg-slate-50 disabled:opacity-50"
//                       onClick={() => canGoPrev && setViewMonth(startOfMonth(addMonths(viewMonth, -1)))}
//                       disabled={!canGoPrev}
//                       title="Previous month"
//                     >
//                       ←
//                     </button>
//                     <button
//                       type="button"
//                       className="h-8 px-3 rounded-full border border-slate-200 bg-white text-slate-700 text-[12px] hover:bg-slate-50"
//                       onClick={() => setViewMonth(startOfMonth(addMonths(viewMonth, 1)))}
//                       title="Next month"
//                     >
//                       →
//                     </button>
//                   </div>
//                 </div>

//                 <div className="book-calendar-grid">
//                   {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
//                     <div key={d} className="book-calendar-dayname">
//                       {d}
//                     </div>
//                   ))}

//                   {calendarCells.map((cell) => {
//                     if (cell.type === "blank") {
//                       return <div key={cell.key} />;
//                     }

//                     const cls = `book-calendar-day ${
//                       cell.selected ? "book-calendar-day-selected" : ""
//                     }`;

//                     return (
//                       <button
//                         key={cell.key}
//                         type="button"
//                         className={cls}
//                         disabled={cell.disabled}
//                         onClick={() => !cell.disabled && setSelectedDate(cell.date)}
//                         title={cell.disabled ? "Past date" : "Select date"}
//                         style={cell.disabled ? { opacity: 0.4, cursor: "not-allowed" } : undefined}
//                       >
//                         {cell.dayNum}
//                       </button>
//                     );
//                   })}
//                 </div>

//                 <div className="mt-3 text-[12px] text-slate-500">
//                   Selected: <span className="text-slate-700 font-medium">{formatLongDate(selectedDate)}</span>
//                 </div>
//               </div>

//               {/* Time slots */}
//               <div className="book-times-title">Available Time Slots</div>
//               <div className="book-times-grid">
//                 {timeOptions.map((slot) => {
//                   const isSelected = slot.time === selectedTime;

//                   const base = slot.available
//                     ? "book-timeslot book-timeslot-available"
//                     : "book-timeslot book-timeslot-unavailable";

//                   const cls = isSelected
//                     ? "book-timeslot book-timeslot-selected"
//                     : base;

//                   return (
//                     <button
//                       key={slot.time}
//                       type="button"
//                       disabled={!slot.available}
//                       className={cls}
//                       onClick={() => slot.available && setSelectedTime(slot.time)}
//                     >
//                       {slot.time}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Right: summary */}
//             <div className="book-summary-card">
//               <div className="book-summary-title">Booking Summary</div>

//               <div className="mt-4">
//                 <div className="book-summary-label">Service</div>
//                 <div className="book-summary-value">{service.name}</div>
//               </div>

//               <div className="book-summary-section">
//                 <div className="book-summary-label">Date</div>
//                 <div className="book-summary-value">{formatLongDate(selectedDate)}</div>
//               </div>

//               <div className="book-summary-section">
//                 <div className="book-summary-label">Time</div>
//                 <div className="book-summary-value">{selectedTime}</div>
//               </div>

//               <div className="book-summary-section">
//                 <div className="book-summary-label">Duration</div>
//                 <div className="book-summary-value">{service.durationLabel}</div>
//               </div>

//               <div className="book-summary-section flex items-center justify-between">
//                 <div className="book-summary-label">Total Price</div>
//                 <div className="book-summary-price">
//                   {service.price === 0 ? "Free" : `$${service.price}`}
//                 </div>
//               </div>

//               <button type="button" className="book-summary-button" onClick={handleConfirm}>
//                 Confirm Booking
//               </button>

//               <div className="mt-3 text-[11px] text-slate-500">
//                 You&apos;ll see the booking in <b>My Bookings</b> after confirming.
//               </div>
//             </div>
//           </section>

//           {/* Weekly availability */}
//           <section className="book-availability-card">
//             <div className="book-availability-title">Weekly Availability Overview</div>
//             <div className="book-availability-subtitle">
//               Current availability for {formatLongDate(selectedDate)}
//             </div>

//             <table className="book-availability-table">
//               <thead>
//                 <tr>
//                   <th className="book-availability-th">Time</th>
//                   {AVAILABILITY_SERVICES.map((name) => (
//                     <th key={name} className="book-availability-th">
//                       {name}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {AVAILABILITY_TIMES.map((time) => (
//                   <tr key={time}>
//                     <td className="book-availability-td text-slate-600">{time}</td>
//                     {AVAILABILITY_SERVICES.map((name) => {
//                       const status = SAMPLE_AVAIL[time]?.[name];
//                       const isAvailable = status === "Available";
//                       return (
//                         <td key={name} className="book-availability-td text-center">
//                           <span className={isAvailable ? "book-pill-available" : "book-pill-booked"}>
//                             {status}
//                           </span>
//                         </td>
//                       );
//                     })}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </section>
//         </div>
//       </main>
//     </div>
//   );
// }



// src/pages/book.jsx
import "../styles/book.css";
import "../styles/dashboard.css";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/auth.jsx";
import Topbar from "../components/Topbar.jsx";

// Fallback time slots (you can improve later by making slots a DB table)
const GENERIC_SLOTS = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

function fmtMoney(priceCents) {
  if (!priceCents) return "Free";
  return `$${(priceCents / 100).toFixed(2)}`;
}

function startOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function endOfMonth(d) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}
function sameDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function BookPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [servicesError, setServicesError] = useState("");

  const [selectedServiceSlug, setSelectedServiceSlug] = useState("");
  const selectedService = useMemo(
    () => services.find((s) => s.slug === selectedServiceSlug),
    [services, selectedServiceSlug]
  );

  // ✅ up-to-date calendar: current month by default
  const today = useMemo(() => new Date(), []);
  const [monthCursor, setMonthCursor] = useState(startOfMonth(today));
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState("10:00");

  // load services from Supabase
  useEffect(() => {
    let mounted = true;

    async function loadServices() {
      setServicesLoading(true);
      setServicesError("");

      const { data, error } = await supabase
        .from("services")
        .select("slug,name,subtitle,location,duration_minutes,price_cents,icon")
        .order("name", { ascending: true });

      if (!mounted) return;

      if (error) {
        setServicesError(error.message);
        setServices([]);
        setSelectedServiceSlug("");
      } else {
        setServices(data ?? []);
        // pick first service by default
        const first = (data ?? [])[0]?.slug ?? "";
        setSelectedServiceSlug((prev) => prev || first);
      }

      setServicesLoading(false);
    }

    loadServices();
    return () => {
      mounted = false;
    };
  }, []);

  // time slot options: if all-day service => "All Day"
  const timeOptions = useMemo(() => {
    if (!selectedService) return [];
    if (selectedService.duration_minutes >= 1440) return ["All Day"];
    return GENERIC_SLOTS;
  }, [selectedService]);

  // keep selectedTime valid when changing service
  useEffect(() => {
    if (!selectedService) return;
    const opts = selectedService.duration_minutes >= 1440 ? ["All Day"] : GENERIC_SLOTS;
    if (!opts.includes(selectedTime)) setSelectedTime(opts[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedServiceSlug]);

  // Build month grid
  const monthDays = useMemo(() => {
    const first = startOfMonth(monthCursor);
    const last = endOfMonth(monthCursor);

    const daysInMonth = [];
    for (let d = new Date(first); d <= last; d.setDate(d.getDate() + 1)) {
      daysInMonth.push(new Date(d));
    }

    // pad start (Sunday-based grid)
    const startPad = first.getDay(); // 0-6
    const pads = Array.from({ length: startPad }, () => null);

    return [...pads, ...daysInMonth];
  }, [monthCursor]);

  const monthTitle = useMemo(() => {
    return monthCursor.toLocaleString(undefined, { month: "long", year: "numeric" });
  }, [monthCursor]);

  const handleConfirm = async () => {
    try {
      if (!user) {
        alert("Please log in first.");
        navigate("/");
        return;
      }
      if (!selectedService) {
        alert("Please select a service.");
        return;
      }

      // Build start_time from selectedDate + selectedTime
      const start = new Date(selectedDate);

      if (selectedTime === "All Day") {
        start.setHours(9, 0, 0, 0);
      } else {
        const [hh, mm] = selectedTime.split(":");
        start.setHours(Number(hh), Number(mm), 0, 0);
      }

      // block bookings in the past
      if (start < new Date()) {
        alert("Please choose a future date/time.");
        return;
      }

      const { error } = await supabase.from("bookings").insert([
        {
          user_id: user.id,
          service: selectedService.name,
          location: selectedService.location,
          duration_minutes: selectedService.duration_minutes,
          price_cents: selectedService.price_cents,
          start_time: start.toISOString(),
          status: "pending",
        },
      ]);

      if (error) throw error;

      alert("✅ Booking created!");
      navigate("/bookings");
    } catch (e) {
      alert("❌ Booking failed: " + (e?.message || "Unknown error"));
    }
  };

  return (
    <div className="dashboard-root">
      {/* ✅ shared topbar (you already use it elsewhere) */}
      <Topbar active="book" />

      <main className="dashboard-shell">
        <div className="book-main">
          <section>
            <h1 className="book-header-title">Book a Service</h1>
            <p className="book-header-subtitle">
              Choose a service from Supabase and book a future time.
            </p>

            {servicesLoading ? (
              <div className="mt-4 text-slate-600">Loading services…</div>
            ) : servicesError ? (
              <div className="mt-4 text-red-600">Error: {servicesError}</div>
            ) : (
              <div className="book-services-row">
                {services.map((s) => (
                  <div
                    key={s.slug}
                    className={`book-service-card ${
                      s.slug === selectedServiceSlug ? "book-service-card-active" : ""
                    }`}
                    onClick={() => setSelectedServiceSlug(s.slug)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="book-service-card-inner" />
                    <div className="book-service-card-content">
                      <div>
                        <div className="book-service-title">{s.name}</div>
                        <div className="book-service-subtitle">{s.subtitle}</div>
                      </div>

                      <div className="flex items-center justify-between text-[12px]">
                        <span className="book-service-badge">
                          <span className="material-icons text-[14px]">{s.icon}</span>
                          {s.duration_minutes >= 1440
                            ? "All day"
                            : `${s.duration_minutes} min`}
                        </span>
                        <span className="font-semibold">{fmtMoney(s.price_cents)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Booking grid */}
          <section className="book-grid">
            {/* Left */}
            <div className="book-detail-card">
              <div className="book-detail-header">
                <div>
                  <div className="book-detail-title">
                    {selectedService?.name ?? "Select a service"}
                  </div>
                  <div className="text-[13px] text-slate-500">
                    Pick a future date + time
                  </div>
                </div>

                {selectedService && (
                  <div className="book-detail-meta">
                    <span className="book-detail-meta-pill">
                      <span className="material-icons text-[16px] text-blue-500">
                        schedule
                      </span>
                      {selectedService.duration_minutes >= 1440
                        ? "All day"
                        : `${selectedService.duration_minutes} min`}
                    </span>

                    <span className="book-detail-meta-pill">
                      <span className="material-icons text-[16px] text-slate-500">
                        place
                      </span>
                      {selectedService.location}
                    </span>

                    <span className="book-detail-meta-pill">
                      <span className="material-icons text-[16px] text-emerald-500">
                        attach_money
                      </span>
                      {fmtMoney(selectedService.price_cents)}
                    </span>
                  </div>
                )}
              </div>

              {/* Calendar */}
              <div className="book-calendar">
                <div className="book-calendar-header flex items-center justify-between">
                  <button
                    type="button"
                    className="h-9 px-3 rounded-full border border-slate-200 bg-white text-slate-700 text-[12px] hover:bg-slate-50"
                    onClick={() =>
                      setMonthCursor((d) => startOfMonth(new Date(d.getFullYear(), d.getMonth() - 1, 1)))
                    }
                  >
                    ←
                  </button>

                  <div className="text-center">
                    <div className="font-medium text-slate-700">{monthTitle}</div>
                    <div className="text-[12px] text-slate-500">Select a date</div>
                  </div>

                  <button
                    type="button"
                    className="h-9 px-3 rounded-full border border-slate-200 bg-white text-slate-700 text-[12px] hover:bg-slate-50"
                    onClick={() =>
                      setMonthCursor((d) => startOfMonth(new Date(d.getFullYear(), d.getMonth() + 1, 1)))
                    }
                  >
                    →
                  </button>
                </div>

                <div className="book-calendar-grid">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                    <div key={d} className="book-calendar-dayname">
                      {d}
                    </div>
                  ))}

                  {monthDays.map((d, idx) => {
                    if (!d) return <div key={`pad-${idx}`} />;

                    const isPast = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0) <
                      new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);

                    const isSelected = sameDay(d, selectedDate);

                    return (
                      <button
                        key={d.toISOString()}
                        type="button"
                        disabled={isPast}
                        className={`book-calendar-day ${
                          isSelected ? "book-calendar-day-selected" : ""
                        } ${isPast ? "opacity-40 cursor-not-allowed" : ""}`}
                        onClick={() => !isPast && setSelectedDate(d)}
                      >
                        {d.getDate()}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time slots */}
              <div className="book-times-title">Available Time Slots</div>
              <div className="book-times-grid">
                {timeOptions.map((t) => {
                  const isSelected = t === selectedTime;
                  return (
                    <button
                      key={t}
                      type="button"
                      className={
                        isSelected
                          ? "book-timeslot book-timeslot-selected"
                          : "book-timeslot book-timeslot-available"
                      }
                      onClick={() => setSelectedTime(t)}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right summary */}
            <div className="book-summary-card">
              <div className="book-summary-title">Booking Summary</div>

              {!selectedService ? (
                <div className="mt-4 text-slate-600 text-sm">Select a service to continue.</div>
              ) : (
                <>
                  <div className="mt-4">
                    <div className="book-summary-label">Service</div>
                    <div className="book-summary-value">{selectedService.name}</div>
                  </div>

                  <div className="book-summary-section">
                    <div className="book-summary-label">Date</div>
                    <div className="book-summary-value">
                      {selectedDate.toLocaleDateString(undefined, {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>

                  <div className="book-summary-section">
                    <div className="book-summary-label">Time</div>
                    <div className="book-summary-value">{selectedTime}</div>
                  </div>

                  <div className="book-summary-section">
                    <div className="book-summary-label">Location</div>
                    <div className="book-summary-value">{selectedService.location}</div>
                  </div>

                  <div className="book-summary-section flex items-center justify-between">
                    <div className="book-summary-label">Total Price</div>
                    <div className="book-summary-price">{fmtMoney(selectedService.price_cents)}</div>
                  </div>

                  <button type="button" className="book-summary-button" onClick={handleConfirm}>
                    Confirm Booking
                  </button>

                  <div className="mt-3 text-[11px] text-slate-500">
                    Your booking will appear in “My Bookings”.
                  </div>
                </>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
