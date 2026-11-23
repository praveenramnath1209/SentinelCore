import { useEffect, useState, useRef } from "react";
import {
  FaBell,
  FaMoon,
  FaSun,
  FaUserCircle,
  FaSignOutAlt,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import API from "./api/axios";
import SearchBar from "./SearchBar";
import "./Dashboard.css";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [time, setTime] = useState(new Date());
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") !== "light";
  });

  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  // Live Clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Theme Handling
  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove("light-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.add("light-theme");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Load Recent Notifications
  const loadNotifications = async () => {
    try {
      setLoadingNotifications(true);
      const response = await API.get("/alerts/recent");
      setNotifications(response.data || []);
    } catch {
      setNotifications([]);
    } finally {
      setLoadingNotifications(false);
    }
  };

  useEffect(() => {
    loadNotifications();
    const interval = setInterval(loadNotifications, 20000);
    return () => clearInterval(interval);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notificationCount = notifications.filter(
    (n) => n.status !== "RESOLVED"
  ).length;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <header className="navbar">
        {/* Left Status Indicator */}
        <div className="navbar-left">
          <div className="soc-status-chip">
            <span className="pulse-dot"></span>
            <span className="soc-status-text">SOC ONLINE</span>
          </div>
          <span className="navbar-divider">/</span>
          <span className="navbar-env-badge">Cloud Telemetry</span>
        </div>

        {/* Center Search */}
        <div className="navbar-center">
          <SearchBar />
        </div>

        {/* Right Controls */}
        <div className="navbar-right">
          {/* Live Telemetry Clock */}
          <div className="navbar-clock" title="Local System Time">
            <span className="clock-time">{time.toLocaleTimeString()}</span>
            <span className="clock-date">
              {time.toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Theme Switcher */}
          <button
            className="theme-toggle-btn"
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme"
          >
            {darkMode ? <FaSun className="theme-icon sun" /> : <FaMoon className="theme-icon moon" />}
          </button>

          {/* Notifications Trigger */}
          <div className="notification-wrapper" ref={notificationRef}>
            <button
              className={`notification-btn ${showNotifications ? "active" : ""}`}
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfile(false);
              }}
              title="Recent Security Alerts"
              aria-label="Security Alerts"
            >
              <FaBell className="bell-icon" />
              {notificationCount > 0 && (
                <span className="notification-badge">
                  {notificationCount > 99 ? "99+" : notificationCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  className="notification-dropdown"
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                >
                  <div className="dropdown-header">
                    <div className="dropdown-title-group">
                      <h4>Security Alerts</h4>
                      <span className="alert-count-pill">{notificationCount} Active</span>
                    </div>
                    <button
                      className="header-link-btn"
                      onClick={() => {
                        navigate("/alerts");
                        setShowNotifications(false);
                      }}
                    >
                      View All
                    </button>
                  </div>

                  <div className="notification-list">
                    {loadingNotifications ? (
                      <div className="dropdown-empty">Checking alerts...</div>
                    ) : notifications.length === 0 ? (
                      <div className="dropdown-empty">
                        <FaCheckCircle className="empty-icon" />
                        <span>All systems clear. No active alerts.</span>
                      </div>
                    ) : (
                      notifications.slice(0, 5).map((alert) => (
                        <div
                          key={alert.id || Math.random()}
                          className={`notification-item severity-${(alert.severity || "info").toLowerCase()}`}
                          onClick={() => {
                            navigate("/alerts");
                            setShowNotifications(false);
                          }}
                        >
                          <div className="notif-item-top">
                            <span className="notif-asset">{alert.assetName || alert.asset || "System"}</span>
                            <span className={`notif-badge badge-${(alert.severity || "info").toLowerCase()}`}>
                              {alert.severity || "Info"}
                            </span>
                          </div>
                          <p className="notif-desc">{alert.description || "Alert trigger detected"}</p>
                          <div className="notif-item-bottom">
                            <span className="notif-status">{alert.status || "OPEN"}</span>
                            <span className="notif-time">
                              {alert.createdAt ? new Date(alert.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Recent"}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="dropdown-footer">
                    <button
                      className="dropdown-action-btn"
                      onClick={() => {
                        navigate("/alerts");
                        setShowNotifications(false);
                      }}
                    >
                      Open Alerts Center
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Chip */}
          <div className="profile-wrapper" ref={profileRef}>
            <div
              className={`profile-chip ${showProfile ? "active" : ""}`}
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotifications(false);
              }}
              title="User Account Menu"
            >
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user?.username || "Admin"
                )}&background=6366f1&color=ffffff&bold=true&size=80`}
                alt="Profile"
              />
              <div className="profile-chip-text">
                <span className="profile-name">{user?.username || "Administrator"}</span>
                <span className="profile-role">{user?.role || "ADMIN"}</span>
              </div>
            </div>

            {/* Profile Dropdown */}
            <AnimatePresence>
              {showProfile && (
                <motion.div
                  className="profile-dropdown"
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                >
                  <div className="profile-dropdown-user">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user?.username || "Admin"
                      )}&background=6366f1&color=ffffff&bold=true&size=96`}
                      alt="Avatar"
                    />
                    <div>
                      <h5>{user?.username || "Administrator"}</h5>
                      <p>{user?.email || "admin@sentinelcore.com"}</p>
                      <span className="badge badge-info">{user?.role || "ADMIN"}</span>
                    </div>
                  </div>

                  <div className="profile-dropdown-divider"></div>

                  <button
                    className="profile-menu-item logout"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt />
                    <span>Sign Out</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
