// src/pages/profile.jsx
import "../styles/dashboard.css"; // reuse top nav styles
import "../styles/profile.css";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();

  const goDashboard = () => navigate("/dashboard");
  const goBook = () => navigate("/book");
  const goBookings = () => navigate("/bookings");
  const goMembership = () => navigate("/membership");
  const goProfile = () => navigate("/profile");

  return (
    <div className="profile-root">
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
          <button className="dashboard-nav-link" onClick={goMembership}>
            <span className="material-icons text-[16px]">credit_card</span>
            <span>Membership</span>
          </button>
          <button
            className="dashboard-nav-link dashboard-nav-link-active"
            onClick={goProfile}
          >
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
      <main className="profile-shell">
        <header className="profile-header">
          <h1 className="profile-title">Profile Settings</h1>
          <p className="profile-subtitle">
            Manage your account information and security settings
          </p>
        </header>

        <div className="profile-layout">
          {/* LEFT – avatar + security */}
          <aside className="profile-sidebar">
            <div className="profile-avatar-wrapper">
              <div className="profile-avatar">
                JD
                <div className="profile-avatar-badge">
                  <span className="material-icons text-[18px] text-blue-600">
                    photo_camera
                  </span>
                </div>
              </div>
              <div className="profile-avatar-name">John Doe</div>
              <div className="profile-avatar-email">user@example.com</div>
              <span className="profile-role-badge">USER</span>
            </div>

            <div className="profile-security-card">
              <div className="profile-security-title">Account Security</div>

              <div className="profile-security-item">
                <div className="profile-security-icon">
                  <span className="material-icons text-[18px] text-emerald-500">
                    lock
                  </span>
                </div>
                <div>
                  <div className="profile-security-text-title">
                    Password Encryption
                  </div>
                  <div className="profile-security-text-sub">
                    AES-256 encryption for all stored passwords.
                  </div>
                </div>
              </div>

              <div className="profile-security-item">
                <div className="profile-security-icon">
                  <span className="material-icons text-[18px] text-blue-500">
                    timer
                  </span>
                </div>
                <div>
                  <div className="profile-security-text-title">Auto Logout</div>
                  <div className="profile-security-text-sub">
                    Session timeout after 30 minutes of inactivity.
                  </div>
                </div>
              </div>

              <div className="profile-security-item">
                <div className="profile-security-icon">
                  <span className="material-icons text-[18px] text-purple-500">
                    security
                  </span>
                </div>
                <div>
                  <div className="profile-security-text-title">
                    Role-Based Access
                  </div>
                  <div className="profile-security-text-sub">
                    Secure permissions based on your account role.
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT – forms / settings */}
          <section className="profile-main">
            {/* Personal Information */}
            <div className="profile-card">
              <div className="profile-card-header">
                <div className="profile-card-title">Personal Information</div>
                <div className="profile-card-subtitle">
                  Update your account details
                </div>
              </div>
              <div className="profile-card-body">
                <div className="profile-form-grid">
                  <div className="profile-form-row">
                    <label className="profile-label">Full Name</label>
                    <input
                      className="profile-input"
                      defaultValue="John Doe"
                      type="text"
                    />
                  </div>
                  <div className="profile-form-row">
                    <label className="profile-label">Email Address</label>
                    <input
                      className="profile-input profile-input-disabled"
                      defaultValue="user@example.com"
                      type="email"
                      disabled
                    />
                  </div>

                  <div className="profile-form-row">
                    <label className="profile-label">Phone Number</label>
                    <input
                      className="profile-input"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div className="profile-form-row">
                    <label className="profile-label">Date of Birth</label>
                    <input
                      className="profile-input"
                      placeholder="dd/mm/yyyy"
                      type="text"
                    />
                  </div>

                  <div className="profile-form-row md:col-span-2">
                    <label className="profile-label">Address</label>
                    <input
                      className="profile-input"
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div className="profile-form-row">
                    <label className="profile-label">City</label>
                    <input className="profile-input" placeholder="New York" />
                  </div>
                  <div className="profile-form-row">
                    <label className="profile-label">State/Province</label>
                    <input className="profile-input" placeholder="NY" />
                  </div>
                  <div className="profile-form-row">
                    <label className="profile-label">ZIP/Postal Code</label>
                    <input className="profile-input" placeholder="10001" />
                  </div>
                  <div className="profile-form-row">
                    <label className="profile-label">Emergency Contact</label>
                    <input
                      className="profile-input"
                      placeholder="Name & phone number"
                    />
                  </div>
                </div>

                <div className="profile-actions">
                  <button className="profile-button">Cancel</button>
                  <button className="profile-button profile-button-primary">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>

            {/* Session info + change password */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Session info */}
              <div className="profile-session-card lg:col-span-1">
                <div className="profile-card-header">
                  <div className="profile-card-title">Session Information</div>
                </div>
                <div className="profile-session-list">
                  <div>
                    <div className="profile-session-item-label">
                      Last Login
                    </div>
                    <div className="profile-session-item-value">
                      Nov 1, 2025 10:30 AM
                    </div>
                  </div>
                  <div>
                    <div className="profile-session-item-label">
                      Session Timeout
                    </div>
                    <div className="profile-session-item-value">
                      30 minutes
                    </div>
                  </div>
                  <div>
                    <div className="profile-session-item-label">
                      Account Created
                    </div>
                    <div className="profile-session-item-value">
                      Jan 15, 2024
                    </div>
                  </div>
                </div>
              </div>

              {/* Change password */}
              <div className="profile-card lg:col-span-2">
                <div className="profile-card-header">
                  <div className="profile-card-title">Change Password</div>
                  <div className="profile-card-subtitle">
                    Update your password to keep your account secure
                  </div>
                </div>
                <div className="profile-card-body">
                  <div className="profile-password-info">
                    <div className="flex items-start gap-2">
                      <span className="material-icons text-[18px] text-blue-600 mt-[1px]">
                        shield
                      </span>
                      <p>
                        All passwords are encrypted using AES-256 encryption
                        before storage. Your password is never stored in plain
                        text.
                      </p>
                    </div>
                  </div>

                  <div className="profile-password-grid">
                    <div className="profile-form-row">
                      <label className="profile-label">Current Password</label>
                      <input
                        type="password"
                        className="profile-input"
                        placeholder="Enter current password"
                      />
                    </div>
                    <div className="profile-form-row">
                      <label className="profile-label">New Password</label>
                      <input
                        type="password"
                        className="profile-input"
                        placeholder="Enter new password"
                      />
                      <p className="mt-1 text-[11px] text-slate-500">
                        Password must be at least 8 characters with uppercase,
                        lowercase, and numbers.
                      </p>
                    </div>
                    <div className="profile-form-row">
                      <label className="profile-label">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="profile-input"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>

                  <div className="profile-actions mt-4">
                    <button className="profile-button">Cancel</button>
                    <button className="profile-button profile-button-primary">
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Notification preferences */}
            <div className="profile-card">
              <div className="profile-card-header">
                <div className="profile-card-title">
                  Notification Preferences
                </div>
                <div className="profile-card-subtitle">
                  Choose how you want to receive updates
                </div>
              </div>
              <div className="profile-card-body">
                <div className="profile-notify-list">
                  <NotifyRow label="Email notifications for booking confirmations" checked />
                  <NotifyRow label="SMS reminders for upcoming sessions" checked />
                  <NotifyRow label="Membership renewal reminders" checked />
                  <NotifyRow label="Promotional offers and updates" />
                  <NotifyRow label="Weekly activity summary" />
                </div>

                <div className="profile-actions mt-5">
                  <button className="profile-button profile-button-primary">
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function NotifyRow({ label, checked }) {
  return (
    <div className="profile-notify-item">
      <span className="profile-notify-label">{label}</span>
      <div
        className={
          "profile-toggle " + (checked ? "" : "profile-toggle-off")
        }
      >
        <div
          className={
            "profile-toggle-thumb " +
            (checked ? "" : "profile-toggle-thumb-off")
          }
        />
      </div>
    </div>
  );
}
