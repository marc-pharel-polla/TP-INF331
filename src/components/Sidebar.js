import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // `useLocation` pour détecter la page active
import "./Sidebar.css";
import {
  FaHome,
  FaFire,
  FaFilm,
  FaTv,
  FaDownload,
  FaCog,
  FaInfoCircle,
} from "react-icons/fa";

const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(false); // Gère l'effet hover (agrandir ou non la sidebar)
  const location = useLocation(); // Permet de savoir quelle page est active

  return (
    <div
      className={`sidebar-container ${isHovered ? "expanded" : ""}`}
      onMouseEnter={() => setIsHovered(true)} // Agrandir sidebar au survol
      onMouseLeave={() => setIsHovered(false)} // Réduire sidebar après le survol
    >
      <div className="sidebar">
        <ul>
          {/* Chaque lien vérifie s'il est actif en comparant son `to` avec `location.pathname` */}
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
              <span className="sidebar-text">Series</span>
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
      </div>
    </div>
  );
};

export default Sidebar;
