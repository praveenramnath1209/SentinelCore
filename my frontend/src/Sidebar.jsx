import {
  FaTachometerAlt,
  FaServer,
  FaUsers,
  FaShieldAlt,
  FaBug,
  FaCloud,
  FaChartBar,
  FaBell,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "./AuthContext";
import "./Dashboard.css";

function Sidebar() {
  const { user, logout } = useAuth();

  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem("sentinel_sidebar_collapsed") === "true";
  });

  useEffect(() => {
    if (collapsed) {
      document.body.classList.add("sidebar-collapsed");
    } else {
      document.body.classList.remove("sidebar-collapsed");
    }
    localStorage.setItem("sentinel_sidebar_collapsed", collapsed);
  }, [collapsed]);

  const menu = [
    {
      title: "Dashboard",
      icon: <FaTachometerAlt />,
      path: "/dashboard",
      roles: ["ADMIN", "ITSM", "USER"],
    },
    {
      title: "Assets",
      icon: <FaServer />,
      path: "/assets",
      roles: ["ADMIN", "ITSM"],
    },
    {
      title: "Alerts",
      icon: <FaBell />,
      path: "/alerts",
      roles: ["ADMIN", "ITSM", "USER"],
    },
    {
      title: "Incidents",
      icon: <FaShieldAlt />,
      path: "/incidents",
      roles: ["ADMIN", "ITSM"],
    },
    {
      title: "Vulnerabilities",
      icon: <FaBug />,
      path: "/vulnerabilities",
      roles: ["ADMIN", "ITSM"],
    },
    {
      title: "Cloud",
      icon: <FaCloud />,
      path: "/cloud",
      roles: ["ADMIN", "ITSM"],
    },
    {
      title: "Reports",
      icon: <FaChartBar />,
      path: "/reports",
      roles: ["ADMIN", "ITSM", "USER"],
    },
    {
      title: "Users",
      icon: <FaUsers />,
      path: "/users",
      roles: ["ADMIN"],
    },
  ];

  return (
    <motion.aside
      animate={{
        width: collapsed ? 76 : 250,
      }}
      transition={{
        duration: 0.25,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={`sidebar ${collapsed ? "is-collapsed" : ""}`}
    >
      {/* Brand Header */}
      <div className="sidebar-logo">
        <div className="logo-circle">
          <FaShieldAlt className="shield-icon" />
        </div>

        {!collapsed && (
          <div className="logo-text">
            <h2>Sentinel<span>Core</span></h2>
            <span className="brand-badge">SECUREOPS</span>
          </div>
        )}

        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          aria-label="Toggle Sidebar"
        >
          {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      {/* User Status Card */}
      <div className="sidebar-user">
        <div className="user-avatar-wrapper">
          <img
            src={`https://ui-avatars.com/api/?name=${
              encodeURIComponent(user?.username || "Admin")
            }&background=6366f1&color=ffffff&bold=true&size=100`}
            alt={user?.username || "Profile"}
          />
          <span className="online-indicator" title="Active Session"></span>
        </div>

        {!collapsed && (
          <div className="user-details">
            <h4>{user?.username || "SOC Analyst"}</h4>
            <span className="user-role-badge">{user?.role || "USER"}</span>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {menu
            .filter((m) => m.roles.includes(user?.role))
            .map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active-link" : ""}`
                  }
                  title={collapsed ? item.title : undefined}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {!collapsed && <span className="nav-title">{item.title}</span>}
                </NavLink>
              </li>
            ))}
        </ul>
      </nav>

      {/* Footer / Logout */}
      <div className="sidebar-footer">
        <button
          className="logout-btn"
          onClick={logout}
          title={collapsed ? "Sign Out" : undefined}
        >
          <FaSignOutAlt className="logout-icon" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </motion.aside>
  );
}

export default Sidebar;
