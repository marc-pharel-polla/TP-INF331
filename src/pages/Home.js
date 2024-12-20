import React, { useEffect, useState } from "react";
import "./Home.css"; 
import SearchHeader from "../components/SearchHeader";

const API_KEY = 'ecbe21cc6f4335fd681bef2762742946'; 
const BASE_URL = 'https://api.themoviedb.org/3';

const categories = [
  { title: "Tendances", endpoint: `/trending/all/week` },
  { title: "Films Populaires", endpoint: `/movie/popular` },
  { title: "Séries Populaires", endpoint: `/tv/popular` },
  { title: "Films d'Action", endpoint: `/discover/movie?with_genres=28` },
  { title: "Comédies", endpoint: `/discover/movie?with_genres=35` },
];

const Home = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const dataPromises = categories.map(async (category) => {
        const response = await fetch(
          `${BASE_URL}${category.endpoint}?api_key=${API_KEY}&language=fr-FR`
        );
        const data = await response.json();
        return { title: category.title, items: data.results || [] };
      });

      const results = await Promise.all(dataPromises);
      setCategoryData(results);
    };

    fetchData();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Logique de recherche si nécessaire
  };

  return (
    <div className="home-container">
      <SearchHeader onSearch={handleSearch} searchQuery={searchQuery} />
      {categoryData.map((category, index) => (
        <div key={index} className="category-section">
          <h2 className="category-title">{category.title}</h2>
          <div className="category-scroll">
            {category.items && category.items.length > 0 ? (
              category.items.map((item) => (
                <div key={item.id} className="category-item">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                    alt={item.title || item.name}
                    className="category-image"
                  />
                  <p className="category-name">{item.title || item.name}</p>
                </div>
              ))
            ) : (
              <p className="no-items">Aucun contenu disponible.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
