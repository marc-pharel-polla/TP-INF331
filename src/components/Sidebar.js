import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <h2 className="app-title">XDD Downloader</h2>
        <nav>
          <ul>
            <li>
              <Link to="/" className="sidebar-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/trending" className="sidebar-link">
                Trendings
              </Link>
            </li>
            <li>
              <Link to="/movies" className="sidebar-link">
                Movies
              </Link>
            </li>
            <li>
              <Link to="/series" className="sidebar-link">
                TV Series
              </Link>
            </li>
            <li>
              <Link to="/downloads" className="sidebar-link">
                Downloads
              </Link>
            </li>
            <li>
              <Link to="/settings" className="sidebar-link">
                Settings
              </Link>
            </li>
            <li>
              <Link to="/about" className="sidebar-link">
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
