import React, { useEffect, useState } from 'react';
import './Series.css';

const API_KEY = 'ecbe21cc6f4335fd681bef2762742946'; 
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const Series = () => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US`);
        const data = await response.json();
        setSeries(data.results);
      } catch (error) {
        console.error("Erreur lors du chargement des séries :", error);
      }
    };

    fetchSeries();
  }, []);

  return (
    <div className="series-page">
      <h1>Séries Populaires</h1>
      <div className="series-grid">
        {series.map((show) => (
          <div key={show.id} className="series-card">
            <img
              src={`${IMAGE_BASE_URL}${show.poster_path}`}
              alt={show.name}
              className="series-poster"
            />
            <h3>{show.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Series;
