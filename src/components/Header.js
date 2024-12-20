import React, { useState } from "react";
import "./Header.css";

const Header = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  // Fonction appelée à chaque changement dans l'input
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Appel de la fonction onSearch avec la valeur actuelle
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="app-title">Advanced XDD Movies Downloader</h1>
        <div className="search-container">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search for movies..."
            className="search-input"
          />
          <button className="search-button">🔍</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
