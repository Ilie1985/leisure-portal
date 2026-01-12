// import "../styles/dashboard.css"; // reuse topbar + shell styles
// import "../styles/book.css";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const SERVICES = [
//   {
//     id: "swim",
//     name: "Swimming Lessons",
//     subtitle: "1 hour • Main Pool",
//     duration: "1 hour",
//     price: 15,
//     icon: "pool",
//     accent: "blue",
//   },
//   {
//     id: "library",
//     name: "Library Sessions",
//     subtitle: "2 hours • Reading / Study Room",
//     duration: "2 hours",
//     price: 0,
//     icon: "local_library",
//     accent: "emerald",
//   },
//   {
//     id: "hall",
//     name: "Hall Reservations",
//     subtitle: "3 hours • Conference Hall A",
//     duration: "3 hours",
//     price: 50,
//     icon: "storefront",
//     accent: "purple",
//   },
//   {
//     id: "parking",
//     name: "Parking Spaces",
//     subtitle: "All day • Parking Lot B",
//     duration: "All day",
//     price: 10,
//     icon: "local_parking",
//     accent: "orange",
//   },
// ];

// // Simple static month (like your Figma: November 2025)
// const DAYS = Array.from({ length: 30 }, (_, i) => i + 1);

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

// // Static weekly availability grid (just for visual)
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

// export default function BookPage() {
//   const navigate = useNavigate();
//   const [selectedServiceId, setSelectedServiceId] = useState("swim");
//   const [selectedDay, setSelectedDay] = useState(5);
//   const [selectedTime, setSelectedTime] = useState("10:00");

//   const service = SERVICES.find((s) => s.id === selectedServiceId);
//   const timeOptions = TIME_SLOTS[selectedServiceId] || [];

//   const handleConfirm = () => {
//     alert(
//       `Booked: ${service.name} on November ${selectedDay}, 2025 at ${selectedTime}`
//     );
//   };

//   const handleGoDashboard = () => navigate("/dashboard");
//   const handleGoBook = () => navigate("/book");
//   const handleGoBookings = () => navigate("/bookings");
//   const handleGoMembership = () => navigate("/membership");
//   const handleGoProfile = () => navigate("/profile");

//   return (
//     <div className="dashboard-root">
//       {/* Same topbar as dashboard, but "Book Services" active */}
//       <header className="dashboard-topbar">
//         <div className="dashboard-brand" onClick={handleGoDashboard}>
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
//           <button
//             className="dashboard-nav-link"
//             onClick={handleGoDashboard}
//           >
//             <span className="material-icons text-[16px]">home</span>
//             <span>Dashboard</span>
//           </button>
//           <button
//             className="dashboard-nav-link dashboard-nav-link-active"
//             onClick={handleGoBook}
//           >
//             <span className="material-icons text-[16px]">calendar_today</span>
//             <span>Book Services</span>
//           </button>
//           <button
//             className="dashboard-nav-link"
//             onClick={handleGoBookings}
//           >
//             <span className="material-icons text-[16px]">list_alt</span>
//             <span>My Bookings</span>
//           </button>
//           <button
//             className="dashboard-nav-link"
//             onClick={handleGoMembership}
//           >
//             <span className="material-icons text-[16px]">credit_card</span>
//             <span>Membership</span>
//           </button>
//           <button
//             className="dashboard-nav-link"
//             onClick={handleGoProfile}
//           >
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
//                   className={`book-service-card ${
//                     s.id === selectedServiceId ? "book-service-card-active" : ""
//                   }`}
//                   onClick={() => {
//                     setSelectedServiceId(s.id);
//                     // Reset to first available slot
//                     const firstAvailable =
//                       (TIME_SLOTS[s.id] || []).find((t) => t.available)?.time ||
//                       "";
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
//                         <span className="material-icons text-[14px]">
//                           {s.icon}
//                         </span>
//                         {s.duration}
//                       </span>
//                       <span className="font-semibold">
//                         {s.price === 0 ? "Free" : `$${s.price}`}
//                       </span>
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
//                     <span className="material-icons text-[16px] text-blue-500">
//                       schedule
//                     </span>
//                     {service.duration}
//                   </span>
//                   <span className="book-detail-meta-pill">
//                     <span className="material-icons text-[16px] text-slate-500">
//                       place
//                     </span>
//                     {service.subtitle.split("•")[1]?.trim() || "Facility"}
//                   </span>
//                   <span className="book-detail-meta-pill">
//                     <span className="material-icons text-[16px] text-emerald-500">
//                       attach_money
//                     </span>
//                     {service.price === 0 ? "Free" : `$${service.price}`}
//                   </span>
//                 </div>
//               </div>

//               {/* Calendar */}
//               <div className="book-calendar">
//                 <div className="book-calendar-header">
//                   <span className="font-medium text-slate-700">
//                     November 2025
//                   </span>
//                   <span className="text-[12px] text-slate-500">
//                     Select a date
//                   </span>
//                 </div>
//                 <div className="book-calendar-grid">
//                   {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
//                     <div key={d} className="book-calendar-dayname">
//                       {d}
//                     </div>
//                   ))}
//                   {DAYS.map((d) => (
//                     <button
//                       key={d}
//                       type="button"
//                       className={`book-calendar-day ${
//                         d === selectedDay ? "book-calendar-day-selected" : ""
//                       }`}
//                       onClick={() => setSelectedDay(d)}
//                     >
//                       {d}
//                     </button>
//                   ))}
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
//                       onClick={() =>
//                         slot.available && setSelectedTime(slot.time)
//                       }
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
//                 <div className="book-summary-value">
//                   Wednesday, November {selectedDay}, 2025
//                 </div>
//               </div>

//               <div className="book-summary-section">
//                 <div className="book-summary-label">Time</div>
//                 <div className="book-summary-value">{selectedTime}</div>
//               </div>

//               <div className="book-summary-section">
//                 <div className="book-summary-label">Duration</div>
//                 <div className="book-summary-value">{service.duration}</div>
//               </div>

//               <div className="book-summary-section flex items-center justify-between">
//                 <div className="book-summary-label">Total Price</div>
//                 <div className="book-summary-price">
//                   {service.price === 0 ? "Free" : `$${service.price}`}
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 className="book-summary-button"
//                 onClick={handleConfirm}
//               >
//                 Confirm Booking
//               </button>

//               <div className="mt-3 text-[11px] text-slate-500">
//                 You&apos;ll receive a confirmation email after booking.
//               </div>
//             </div>
//           </section>

//           {/* Weekly availability */}
//           <section className="book-availability-card">
//             <div className="book-availability-title">
//               Weekly Availability Overview
//             </div>
//             <div className="book-availability-subtitle">
//               Current availability for November {selectedDay}
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
//                     <td className="book-availability-td text-slate-600">
//                       {time}
//                     </td>
//                     {AVAILABILITY_SERVICES.map((name) => {
//                       const status = SAMPLE_AVAIL[time]?.[name];
//                       const isAvailable = status === "Available";
//                       return (
//                         <td
//                           key={name}
//                           className="book-availability-td text-center"
//                         >
//                           <span
//                             className={
//                               isAvailable
//                                 ? "book-pill-available"
//                                 : "book-pill-booked"
//                             }
//                           >
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
import "../styles/dashboard.css"; // reuse topbar + shell styles
import "../styles/book.css";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "../context/auth.jsx";

const SERVICES = [
  {
    id: "swim",
    name: "Swimming Lessons",
    subtitle: "1 hour • Main Pool",
    duration: "1 hour",
    price: 15,
    icon: "pool",
    accent: "blue",
  },
  {
    id: "library",
    name: "Library Sessions",
    subtitle: "2 hours • Reading / Study Room",
    duration: "2 hours",
    price: 0,
    icon: "local_library",
    accent: "emerald",
  },
  {
    id: "hall",
    name: "Hall Reservations",
    subtitle: "3 hours • Conference Hall A",
    duration: "3 hours",
    price: 50,
    icon: "storefront",
    accent: "purple",
  },
  {
    id: "parking",
    name: "Parking Spaces",
    subtitle: "All day • Parking Lot B",
    duration: "All day",
    price: 10,
    icon: "local_parking",
    accent: "orange",
  },
];

// Simple static month (like your Figma: November 2025)
const DAYS = Array.from({ length: 30 }, (_, i) => i + 1);

const TIME_SLOTS = {
  swim: [
    { time: "09:00", available: false },
    { time: "10:00", available: true },
    { time: "11:00", available: true },
    { time: "14:00", available: false },
    { time: "15:00", available: true },
    { time: "16:00", available: false },
  ],
  library: [
    { time: "09:00", available: true },
    { time: "11:00", available: false },
    { time: "13:00", available: true },
    { time: "15:00", available: false },
  ],
  hall: [
    { time: "10:00", available: true },
    { time: "14:00", available: true },
    { time: "18:00", available: false },
  ],
  parking: [{ time: "All Day", available: true }],
};

// Static weekly availability grid (just for visual)
const AVAILABILITY_TIMES = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];
const AVAILABILITY_SERVICES = ["Swimming", "Library", "Hall", "Parking"];

const SAMPLE_AVAIL = {
  "09:00": { Swimming: "Available", Library: "Booked", Hall: "Available", Parking: "Available" },
  "10:00": { Swimming: "Available", Library: "Available", Hall: "Available", Parking: "Available" },
  "11:00": { Swimming: "Booked", Library: "Booked", Hall: "Booked", Parking: "Booked" },
  "14:00": { Swimming: "Available", Library: "Booked", Hall: "Booked", Parking: "Booked" },
  "15:00": { Swimming: "Available", Library: "Available", Hall: "Booked", Parking: "Available" },
  "16:00": { Swimming: "Available", Library: "Booked", Hall: "Available", Parking: "Booked" },
};

function durationToMinutes(durationLabel) {
  const d = (durationLabel || "").toLowerCase();
  if (d.includes("all day")) return 24 * 60;

  // tries to find "1 hour", "2 hours", etc.
  const match = d.match(/(\d+)\s*hour/);
  if (match) return parseInt(match[1], 10) * 60;

  return 60; // fallback
}

function buildStartTimeISO(selectedDay, selectedTime) {
  // November 2025 => month index 10 (0=Jan)
  const year = 2025;
  const monthIndex = 10;

  if (selectedTime === "All Day") {
    const dt = new Date(year, monthIndex, selectedDay, 9, 0, 0, 0); // 09:00 default
    return dt.toISOString();
  }

  const [hh, mm] = selectedTime.split(":").map((n) => parseInt(n, 10));
  const dt = new Date(year, monthIndex, selectedDay, hh || 0, mm || 0, 0, 0);
  return dt.toISOString();
}

export default function BookPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [selectedServiceId, setSelectedServiceId] = useState("swim");
  const [selectedDay, setSelectedDay] = useState(5);

  const firstAvailableFor = (serviceId) =>
    (TIME_SLOTS[serviceId] || []).find((t) => t.available)?.time || "";

  const [selectedTime, setSelectedTime] = useState(() => firstAvailableFor("swim"));

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const service = useMemo(
    () => SERVICES.find((s) => s.id === selectedServiceId),
    [selectedServiceId]
  );

  const timeOptions = TIME_SLOTS[selectedServiceId] || [];

  const handleGoDashboard = () => navigate("/dashboard");
  const handleGoBook = () => navigate("/book");
  const handleGoBookings = () => navigate("/bookings");
  const handleGoMembership = () => navigate("/membership");
  const handleGoProfile = () => navigate("/profile");

  const handleConfirm = async () => {
    if (!user) {
      setError("You must be logged in to book a service.");
      return;
    }
    if (!service) {
      setError("Please select a service.");
      return;
    }
    if (!selectedTime) {
      setError("Please select a time slot.");
      return;
    }

    setSaving(true);
    setError("");

    const location = service.subtitle.split("•")[1]?.trim() || "Facility";
    const durationMinutes = durationToMinutes(service.duration);
    const priceCents = Math.round((service.price || 0) * 100);
    const startTimeISO = buildStartTimeISO(selectedDay, selectedTime);

    const { error: insErr } = await supabase.from("bookings").insert([
      {
        user_id: user.id,
        service: service.name,
        location,
        duration_minutes: durationMinutes,
        price_cents: priceCents,
        start_time: startTimeISO,
        status: "confirmed",
      },
    ]);

    if (insErr) {
      setError(insErr.message);
      setSaving(false);
      return;
    }

    setSaving(false);
    navigate("/bookings");
  };

  return (
    <div className="dashboard-root">
      {/* Topbar */}
      <header className="dashboard-topbar">
        <div className="dashboard-brand" onClick={handleGoDashboard}>
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
          <button className="dashboard-nav-link" onClick={handleGoDashboard}>
            <span className="material-icons text-[16px]">home</span>
            <span>Dashboard</span>
          </button>
          <button
            className="dashboard-nav-link dashboard-nav-link-active"
            onClick={handleGoBook}
          >
            <span className="material-icons text-[16px]">calendar_today</span>
            <span>Book Services</span>
          </button>
          <button className="dashboard-nav-link" onClick={handleGoBookings}>
            <span className="material-icons text-[16px]">list_alt</span>
            <span>My Bookings</span>
          </button>
          <button className="dashboard-nav-link" onClick={handleGoMembership}>
            <span className="material-icons text-[16px]">credit_card</span>
            <span>Membership</span>
          </button>
          <button className="dashboard-nav-link" onClick={handleGoProfile}>
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
            {(user?.email?.[0] || "U").toUpperCase()}
          </div>
        </div>
      </header>

      <main className="dashboard-shell">
        <div className="book-main">
          {/* Header */}
          <section>
            <h1 className="book-header-title">Book a Service</h1>
            <p className="book-header-subtitle">
              Choose from our range of leisure services and find a time that works for you.
            </p>

            {/* Service cards */}
            <div className="book-services-row">
              {SERVICES.map((s) => (
                <div
                  key={s.id}
                  className={`book-service-card ${
                    s.id === selectedServiceId ? "book-service-card-active" : ""
                  }`}
                  onClick={() => {
                    setSelectedServiceId(s.id);
                    setSelectedTime(firstAvailableFor(s.id));
                  }}
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
                        {s.duration}
                      </span>
                      <span className="font-semibold">
                        {s.price === 0 ? "Free" : `$${s.price}`}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Booking grid */}
          <section className="book-grid">
            {/* Left: detail + calendar + times */}
            <div className="book-detail-card">
              <div className="book-detail-header">
                <div>
                  <div className="book-detail-title">{service?.name}</div>
                  <div className="text-[13px] text-slate-500">
                    Select your preferred date and time slot
                  </div>
                </div>
                <div className="book-detail-meta">
                  <span className="book-detail-meta-pill">
                    <span className="material-icons text-[16px] text-blue-500">
                      schedule
                    </span>
                    {service?.duration}
                  </span>
                  <span className="book-detail-meta-pill">
                    <span className="material-icons text-[16px] text-slate-500">
                      place
                    </span>
                    {service?.subtitle.split("•")[1]?.trim() || "Facility"}
                  </span>
                  <span className="book-detail-meta-pill">
                    <span className="material-icons text-[16px] text-emerald-500">
                      attach_money
                    </span>
                    {service?.price === 0 ? "Free" : `$${service?.price}`}
                  </span>
                </div>
              </div>

              {/* Calendar */}
              <div className="book-calendar">
                <div className="book-calendar-header">
                  <span className="font-medium text-slate-700">November 2025</span>
                  <span className="text-[12px] text-slate-500">Select a date</span>
                </div>
                <div className="book-calendar-grid">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                    <div key={d} className="book-calendar-dayname">
                      {d}
                    </div>
                  ))}
                  {DAYS.map((d) => (
                    <button
                      key={d}
                      type="button"
                      className={`book-calendar-day ${
                        d === selectedDay ? "book-calendar-day-selected" : ""
                      }`}
                      onClick={() => setSelectedDay(d)}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time slots */}
              <div className="book-times-title">Available Time Slots</div>
              <div className="book-times-grid">
                {timeOptions.map((slot) => {
                  const isSelected = slot.time === selectedTime;
                  const base = slot.available
                    ? "book-timeslot book-timeslot-available"
                    : "book-timeslot book-timeslot-unavailable";
                  const cls = isSelected
                    ? "book-timeslot book-timeslot-selected"
                    : base;

                  return (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={!slot.available}
                      className={cls}
                      onClick={() => slot.available && setSelectedTime(slot.time)}
                    >
                      {slot.time}
                    </button>
                  );
                })}
              </div>

              {error ? (
                <div className="mt-4 text-[13px] text-red-600">{error}</div>
              ) : null}
            </div>

            {/* Right: summary */}
            <div className="book-summary-card">
              <div className="book-summary-title">Booking Summary</div>

              <div className="mt-4">
                <div className="book-summary-label">Service</div>
                <div className="book-summary-value">{service?.name}</div>
              </div>

              <div className="book-summary-section">
                <div className="book-summary-label">Date</div>
                <div className="book-summary-value">
                  November {selectedDay}, 2025
                </div>
              </div>

              <div className="book-summary-section">
                <div className="book-summary-label">Time</div>
                <div className="book-summary-value">{selectedTime}</div>
              </div>

              <div className="book-summary-section">
                <div className="book-summary-label">Duration</div>
                <div className="book-summary-value">{service?.duration}</div>
              </div>

              <div className="book-summary-section flex items-center justify-between">
                <div className="book-summary-label">Total Price</div>
                <div className="book-summary-price">
                  {service?.price === 0 ? "Free" : `$${service?.price}`}
                </div>
              </div>

              <button
                type="button"
                className="book-summary-button"
                onClick={handleConfirm}
                disabled={saving}
                style={{ opacity: saving ? 0.7 : 1 }}
              >
                {saving ? "Saving..." : "Confirm Booking"}
              </button>

              <div className="mt-3 text-[11px] text-slate-500">
                You&apos;ll receive a confirmation email after booking.
              </div>
            </div>
          </section>

          {/* Weekly availability */}
          <section className="book-availability-card">
            <div className="book-availability-title">Weekly Availability Overview</div>
            <div className="book-availability-subtitle">
              Current availability for November {selectedDay}
            </div>

            <table className="book-availability-table">
              <thead>
                <tr>
                  <th className="book-availability-th">Time</th>
                  {AVAILABILITY_SERVICES.map((name) => (
                    <th key={name} className="book-availability-th">
                      {name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {AVAILABILITY_TIMES.map((time) => (
                  <tr key={time}>
                    <td className="book-availability-td text-slate-600">{time}</td>
                    {AVAILABILITY_SERVICES.map((name) => {
                      const status = SAMPLE_AVAIL[time]?.[name];
                      const isAvailable = status === "Available";
                      return (
                        <td key={name} className="book-availability-td text-center">
                          <span className={isAvailable ? "book-pill-available" : "book-pill-booked"}>
                            {status}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </main>
    </div>
  );
}
