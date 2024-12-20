import React, { useEffect, useState } from "react";
import "./SearchHeader.css";

const API_KEY = 'ecbe21cc6f4335fd681bef2762742946'; 
const BASE_URL = 'https://api.themoviedb.org/3';

const SearchHeader = ({ onSearch, searchQuery }) => {
  const [backgroundImage, setBackgroundImage] = useState("");
  const [isLoading, setIsLoading] = useState(true); // État pour gérer le préchargement

  useEffect(() => {
    const fetchRandomImage = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=fr-FR`
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          // Sélectionner un élément aléatoire
          const randomItem = data.results[Math.floor(Math.random() * data.results.length)];
          setBackgroundImage(`https://image.tmdb.org/t/p/original${randomItem.backdrop_path}`);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'image de fond :", error);
      } finally {
        setIsLoading(false); // Désactiver le préchargement après la récupération
      }
    };

    fetchRandomImage();
  }, []);

  return (
    <div
      className="search-header"
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
      }}
    >
      {isLoading ? (
        <p className="loading-text">Chargement...</p>
      ) : (
        <div className="overlay">
          <h1>Bienvenue,</h1>
          <p>Des millions de films, émissions télévisées et artistes...</p>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Rechercher un film, une émission télévisée, un artiste..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
            />
            <button className >Recherche</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchHeader;
