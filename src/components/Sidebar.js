import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaFire,
  FaFilm,
  FaTv,
  FaDownload,
  FaCog,
  FaInfoCircle,
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation(); // Hook pour obtenir la route actuelle

  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <nav>
          <ul>
            <li>
              <Link
                to="/"
                className={`sidebar-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
              >
                <FaHome className="sidebar-icon" />
                <span className="sidebar-text">Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/trending"
                className={`sidebar-link ${
                  location.pathname === "/trending" ? "active" : ""
                }`}
              >
                <FaFire className="sidebar-icon" />
                <span className="sidebar-text">Trending</span>
              </Link>
            </li>
            <li>
              <Link
                to="/movies"
                className={`sidebar-link ${
                  location.pathname === "/movies" ? "active" : ""
                }`}
              >
                <FaFilm className="sidebar-icon" />
                <span className="sidebar-text">Movies</span>
              </Link>
            </li>
            <li>
              <Link
                to="/series"
                className={`sidebar-link ${
                  location.pathname === "/series" ? "active" : ""
                }`}
              >
                <FaTv className="sidebar-icon" />
                <span className="sidebar-text">TV Series</span>
              </Link>
            </li>
            <li>
              <Link
                to="/downloads"
                className={`sidebar-link ${
                  location.pathname === "/downloads" ? "active" : ""
                }`}
              >
                <FaDownload className="sidebar-icon" />
                <span className="sidebar-text">Downloads</span>
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className={`sidebar-link ${
                  location.pathname === "/settings" ? "active" : ""
                }`}
              >
                <FaCog className="sidebar-icon" />
                <span className="sidebar-text">Settings</span>
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`sidebar-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
              >
                <FaInfoCircle className="sidebar-icon" />
                <span className="sidebar-text">About</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
