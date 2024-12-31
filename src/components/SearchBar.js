import React from 'react';
import './SearchBar.css'; 
const SearchBar = () => {
    return (
        <div className="search-container">
            <input
                type="text"
                className="search-input"
                placeholder="Rechercher un film, une émission télévisée ..."
            />
            <button className="search-button">Rechercher</button>
        </div>
    );
};

export default SearchBar;