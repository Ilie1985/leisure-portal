// src/pages/membership.jsx
import "../styles/dashboard.css";   // reuse nav styles
import "../styles/membership.css";
import { useNavigate } from "react-router-dom";

export default function MembershipPage() {
  const navigate = useNavigate();

  const goDashboard = () => navigate("/dashboard");
  const goBook = () => navigate("/book");
  const goBookings = () => navigate("/bookings");
  const goMembership = () => navigate("/membership");
  const goProfile = () => navigate("/profile");

  const daysRemaining = 42;
  const progressPercent = 94; // just a static value to match Figma

  return (
    <div className="membership-root">
      {/* Top nav */}
      <header className="dashboard-topbar">
        <div className="dashboard-brand" onClick={goDashboard}>
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
          <button className="dashboard-nav-link" onClick={goDashboard}>
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
          <button
            className="dashboard-nav-link dashboard-nav-link-active"
            onClick={goMembership}
          >
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
            JD
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="membership-shell">
        <header className="membership-header">
          <h1 className="membership-title">Membership Management</h1>
          <p className="membership-subtitle">
            Manage your membership benefits and renewal
          </p>
        </header>

        {/* Status card */}
        <section className="membership-status-card">
          <div className="membership-status-header">
            <div className="membership-status-left">
              <div className="membership-status-icon">
                <span className="material-icons text-[18px]">workspace_premium</span>
              </div>
              <div>
                <div className="membership-status-title">Membership Status</div>
                <div className="membership-status-subtitle">
                  Active premium membership
                </div>
              </div>
            </div>
            <span className="membership-status-badge">ACTIVE</span>
          </div>

          <div className="membership-status-grid">
            <div>
              <div className="membership-label">Member Since</div>
              <div className="membership-value">Jan 2024</div>
            </div>
            <div>
              <div className="membership-label">Expiry Date</div>
              <div className="membership-value">Dec 31, 2025</div>
            </div>
            <div>
              <div className="membership-label">Days Remaining</div>
              <div className="membership-value">{daysRemaining}</div>
            </div>
            <div>
              <div className="membership-label">Membership ID</div>
              <div className="membership-value">#M-000001</div>
            </div>
          </div>

          <div className="membership-progress-wrapper">
            <div className="membership-progress-label">
              Membership Period Progress
            </div>
            <div className="membership-progress-bar">
              <div
                className="membership-progress-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Renewal banner */}
          <div className="membership-renewal-banner">
            <div className="membership-renewal-icon">
              <span className="material-icons text-amber-600 text-[18px]">
                warning
              </span>
            </div>
            <div>
              <div className="membership-renewal-text-title">
                Renewal Reminder
              </div>
              <div className="membership-renewal-text-sub">
                Your membership expires in {daysRemaining} days. Renew now to
                avoid interruption of benefits.
              </div>
            </div>
            <button className="membership-renewal-button">Renew Now</button>
          </div>
        </section>

        {/* Benefits */}
        <section>
          <h2 className="membership-section-title">Membership Benefits</h2>
          <div className="membership-benefits-grid">
            <div className="membership-benefit-card">
              <div className="membership-benefit-icon">
                <div className="membership-benefit-icon-circle">
                  <span className="material-icons text-[14px]">check</span>
                </div>
              </div>
              <div>
                <div className="membership-benefit-title">Free Library Access</div>
                <div className="membership-benefit-sub">
                  Unlimited library sessions at no extra cost
                </div>
              </div>
            </div>

            <div className="membership-benefit-card">
              <div className="membership-benefit-icon">
                <div className="membership-benefit-icon-circle">
                  <span className="material-icons text-[14px]">check</span>
                </div>
              </div>
              <div>
                <div className="membership-benefit-title">20% Off Swimming</div>
                <div className="membership-benefit-sub">
                  Discounted rates on all swimming lessons
                </div>
              </div>
            </div>

            <div className="membership-benefit-card">
              <div className="membership-benefit-icon">
                <div className="membership-benefit-icon-circle">
                  <span className="material-icons text-[14px]">star_border</span>
                </div>
              </div>
              <div>
                <div className="membership-benefit-title">Priority Booking</div>
                <div className="membership-benefit-sub">
                  Book services before non-members
                </div>
              </div>
            </div>

            <div className="membership-benefit-card">
              <div className="membership-benefit-icon">
                <div className="membership-benefit-icon-circle">
                  <span className="material-icons text-[14px]">check</span>
                </div>
              </div>
              <div>
                <div className="membership-benefit-title">Hall Discounts</div>
                <div className="membership-benefit-sub">
                  Special rates for event hall rentals
                </div>
              </div>
            </div>

            <div className="membership-benefit-card">
              <div className="membership-benefit-icon">
                <div className="membership-benefit-icon-circle">
                  <span className="material-icons text-[14px]">check</span>
                </div>
              </div>
              <div>
                <div className="membership-benefit-title">Parking Benefits</div>
                <div className="membership-benefit-sub">
                  Reduced parking fees all year
                </div>
              </div>
            </div>

            <div className="membership-benefit-card">
              <div className="membership-benefit-icon">
                <div className="membership-benefit-icon-circle">
                  <span className="material-icons text-[14px]">star_border</span>
                </div>
              </div>
              <div>
                <div className="membership-benefit-title">Exclusive Events</div>
                <div className="membership-benefit-sub">
                  Access to members-only activities
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Plans */}
        <section>
          <h2 className="membership-section-title">Membership Plans</h2>
          <div className="membership-plans-grid">
            {/* Annual */}
            <div className="membership-plan-card">
              <div className="membership-plan-icon">
                <span className="material-icons text-slate-500 text-[18px]">
                  credit_card
                </span>
              </div>
              <div className="membership-plan-name">Annual</div>
              <div className="membership-plan-subtitle">
                Best value for regular users
              </div>
              <div className="membership-plan-price">$50</div>
              <div className="membership-plan-price-sub">per year</div>
              <div className="membership-plan-features">
                <div className="membership-plan-feature">
                  <span className="membership-plan-feature-icon">
                    <span className="material-icons text-[12px]">check</span>
                  </span>
                  <span>All standard benefits</span>
                </div>
                <div className="membership-plan-feature">
                  <span className="membership-plan-feature-icon">
                    <span className="material-icons text-[12px]">check</span>
                  </span>
                  <span>12 months access</span>
                </div>
                <div className="membership-plan-feature">
                  <span className="membership-plan-feature-icon">
                    <span className="material-icons text-[12px]">check</span>
                  </span>
                  <span>Priority support</span>
                </div>
              </div>
              <button className="membership-plan-button">Current Plan</button>
            </div>

            {/* Family */}
            <div className="membership-plan-card membership-plan-card-popular">
              <div className="membership-plan-tag">Popular</div>
              <div className="membership-plan-icon">
                <span className="material-icons text-fuchsia-500 text-[18px]">
                  groups
                </span>
              </div>
              <div className="membership-plan-name">Family</div>
              <div className="membership-plan-subtitle">
                Perfect for families
              </div>
              <div className="membership-plan-price">$120</div>
              <div className="membership-plan-price-sub">up to 4 members</div>
              <div className="membership-plan-features">
                <div className="membership-plan-feature">
                  <span className="membership-plan-feature-icon">
                    <span className="material-icons text-[12px]">check</span>
                  </span>
                  <span>All annual benefits</span>
                </div>
                <div className="membership-plan-feature">
                  <span className="membership-plan-feature-icon">
                    <span className="material-icons text-[12px]">check</span>
                  </span>
                  <span>Up to 4 family members</span>
                </div>
                <div className="membership-plan-feature">
                  <span className="membership-plan-feature-icon">
                    <span className="material-icons text-[12px]">check</span>
                  </span>
                  <span>Family activity passes</span>
                </div>
              </div>
              <button className="membership-plan-button membership-plan-button-primary">
                Select Plan
              </button>
            </div>

            {/* Student */}
            <div className="membership-plan-card">
              <div className="membership-plan-icon">
                <span className="material-icons text-emerald-500 text-[18px]">
                  school
                </span>
              </div>
              <div className="membership-plan-name">Student</div>
              <div className="membership-plan-subtitle">
                Discounted for students
              </div>
              <div className="membership-plan-price">$30</div>
              <div className="membership-plan-price-sub">
                with valid student ID
              </div>
              <div className="membership-plan-features">
                <div className="membership-plan-feature">
                  <span className="membership-plan-feature-icon">
                    <span className="material-icons text-[12px]">check</span>
                  </span>
                  <span>All standard benefits</span>
                </div>
                <div className="membership-plan-feature">
                  <span className="membership-plan-feature-icon">
                    <span className="material-icons text-[12px]">check</span>
                  </span>
                  <span>Student verification required</span>
                </div>
                <div className="membership-plan-feature">
                  <span className="membership-plan-feature-icon">
                    <span className="material-icons text-[12px]">check</span>
                  </span>
                  <span>Renewable annually</span>
                </div>
              </div>
              <button className="membership-plan-button">Select Plan</button>
            </div>
          </div>
        </section>

        {/* Actions */}
        <section className="membership-actions-card">
          <div className="membership-actions-header">
            <div className="membership-actions-title">Membership Actions</div>
          </div>
          <div className="membership-actions-body">
            <div className="membership-action-row">Renew Membership</div>
            <div className="membership-action-row">View Payment History</div>
            <div className="membership-action-row">
              Download Membership Card
            </div>
            <div className="membership-action-row membership-action-row-danger">
              Cancel Membership
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
