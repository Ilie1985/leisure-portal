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

  // up-to-date calendar: current month by default
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
