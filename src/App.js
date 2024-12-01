import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar"; // Importation de la barre latérale

// Import des pages
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Settings from "./pages/Settings";

// Liste des films (similaire à ce que vous aviez)
const movies = [
  { title: "Dragon Ball Z", date: "2 mars 2024", rating: 8.5, img: "https://via.placeholder.com/150" },
  { title: "Fast and Furious", date: "28 jan 2019", rating: 7.2, img: "https://via.placeholder.com/150" },
  { title: "Blacklist", date: "8 juil 2023", rating: 9.0, img: "https://via.placeholder.com/150" },
  { title: "Attack on Titan", date: "14 juin 2022", rating: 8.8, img: "https://via.placeholder.com/150" },
];

function App() {
  return (
    <Router>
      <div className="app">
        {/* Header fixé */}
        <header className="app-header">
          <div className="header-content">
            <h1 className="app-title">Advanced Movies Downloader</h1>
            <div className="search-container">
              <input type="text" placeholder="Search for movie name..." className="search-input" />
            </div>
          </div>
        </header>

        {/* Barre latérale */}
        <Sidebar />

        {/* Contenu principal */}
        <div className="main-content">
          <Routes>
            {/* Route d'accueil */}
            <Route
              path="/"
              element={
                <>
                  {/* Section de tendances */}
                  <section className="trending-section">
                    <h2>Tendances</h2>
                    <div className="trending-grid">
                      {movies.map((movie, index) => (
                        <div key={index} className="trending-card">
                          <img src={movie.img} alt={movie.title} />
                          <h3>{movie.title}</h3>
                          <p>{movie.date}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Section de contenu (grille de films/séries) */}
                  <section className="movies-section">
                    <h2>Films et Séries</h2>
                    <div className="movies-grid">
                      {movies.map((movie, index) => (
                        <div key={index} className="movie-card">
                          <img src={movie.img} alt={movie.title} />
                          <h3>{movie.title}</h3>
                          <p>{movie.date}</p>
                          <span className="rating">⭐ {movie.rating}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </>
              }
            />
            {/* Route pour la page des Films */}
            <Route path="/movies" element={<Movies />} />
            {/* Route pour la page des Séries TV */}
            <Route path="/series" element={<Series />} />
            {/* Route pour la page des Paramètres */}
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
