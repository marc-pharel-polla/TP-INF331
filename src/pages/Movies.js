import React, { useEffect, useState } from 'react';
import './Movies.css'; // Pour le style

const API_KEY = 'ecbe21cc6f4335fd681bef2762742946'; 
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Récupérer les films populaires
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Erreur lors du chargement des films :", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="movies-page">
      <h1>Films Populaires</h1>
      <div className="movies-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
