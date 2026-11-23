import { useState, useRef, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function SearchBar({
  placeholder = "Search pages, assets, telemetry...",
}) {
  const [value, setValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const pages = [
    {
      name: "Dashboard",
      path: "/dashboard",
      category: "Overview",
      keywords: ["dashboard", "home", "main", "kpi", "metrics"],
    },
    {
      name: "Asset Inventory",
      path: "/assets",
      category: "Inventory",
      keywords: ["asset", "assets", "device", "devices", "server", "workstation"],
    },
    {
      name: "Security Alerts",
      path: "/alerts",
      category: "Threats",
      keywords: ["alert", "alerts", "notification", "warning"],
    },
    {
      name: "Incident Response",
      path: "/incidents",
      category: "Threats",
      keywords: ["incident", "incidents", "security", "breach"],
    },
    {
      name: "Vulnerability Scanner",
      path: "/vulnerabilities",
      category: "Vulnerabilities",
      keywords: ["vulnerability", "vulnerabilities", "cve", "scan", "patch"],
    },
    {
      name: "Cloud Infrastructure",
      path: "/cloud",
      category: "Infrastructure",
      keywords: ["cloud", "aws", "azure", "gcp", "instances"],
    },
    {
      name: "Compliance Reports",
      path: "/reports",
      category: "Analytics",
      keywords: ["report", "reports", "analytics", "compliance", "export"],
    },
    {
      name: "User Management",
      path: "/users",
      category: "Administration",
      keywords: ["user", "users", "employee", "roles", "admin"],
    },
  ];

  const filteredPages = pages.filter((page) => {
    const search = value.trim().toLowerCase();
    if (!search) return false;
    return (
      page.name.toLowerCase().includes(search) ||
      page.category.toLowerCase().includes(search) ||
      page.keywords.some((k) => k.toLowerCase().includes(search))
    );
  });

  const handleSelect = (path) => {
    navigate(path);
    setValue("");
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && filteredPages.length > 0) {
      handleSelect(filteredPages[0].path);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="searchbar-container" ref={containerRef}>
      <div className="searchbar-input-box">
        <FaSearch className="searchbar-icon" />

        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
        />

        {value && (
          <button
            type="button"
            className="searchbar-clear"
            onClick={() => {
              setValue("");
              setShowSuggestions(false);
            }}
          >
            <FaTimes />
          </button>
        )}

        <kbd className="searchbar-shortcut">/</kbd>
      </div>

      {showSuggestions && value.trim() && (
        <div className="searchbar-dropdown">
          {filteredPages.length > 0 ? (
            filteredPages.map((page) => (
              <div
                key={page.path}
                className="searchbar-item"
                onClick={() => handleSelect(page.path)}
              >
                <div className="searchbar-item-info">
                  <span className="searchbar-item-name">{page.name}</span>
                  <span className="searchbar-item-category">{page.category}</span>
                </div>
                <span className="searchbar-item-arrow">↵</span>
              </div>
            ))
          ) : (
            <div className="searchbar-no-results">
              No matching pages found for "{value}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
