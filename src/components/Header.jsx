import React from "react";
import "./Header.css"; 
function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <h1>Advanced XDD Movies Downloader</h1>
      </div>
      <div className="header-center">
        <input
          type="text"
          className="search-input"
          placeholder="Search for movie name..."
        />
        <button className="search-button">
          <i className="fa fa-search"></i>
        </button>
      </div>
      <div className="header-right">
        <button className="user-profile">
          <i className="fa fa-user-circle"></i>
        </button>
      </div>
    </header>
  );
}

export default Header;
