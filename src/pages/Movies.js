import React, { useEffect, useState } from 'react';
import './Movies.css';

const API_KEY = 'ecbe21cc6f4335fd681bef2762742946';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const YOUTUBE_BASE_URL = 'https://www.youtube.com/embed/';

const Movies = ({ movies: searchResults }) => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [moviesToShow, setMoviesToShow] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Nouvelle page courante

  // Charger les films populaires
  const fetchPopularMovies = async (page = 1) => {
    try {
      const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
      const data = await response.json();
      setPopularMovies((prevMovies) => [...prevMovies, ...data.results]); // Concatène les nouveaux films
    } catch (error) {
      console.error("Erreur lors du chargement des films :", error);
    }
  };

  useEffect(() => {
    fetchPopularMovies(currentPage);
  }, [currentPage]); // Recharger lorsque la page change

  useEffect(() => {
    if (searchResults && searchResults.length > 0) {
      setMoviesToShow(searchResults);
    } else {
      setMoviesToShow(popularMovies);
    }
  }, [searchResults, popularMovies]);

  // Charger plus de films
  const loadMoreMovies = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Récupérer le trailer d'un film
  const fetchTrailer = async (movieId) => {
    try {
      const response = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`);
      const data = await response.json();

      const trailer = data.results.find((video) => video.type === 'Trailer' && video.site === 'YouTube');
      if (trailer) {
        setTrailerUrl(`${YOUTUBE_BASE_URL}${trailer.key}`);
      } else {
        alert('Aucun trailer disponible pour ce film.');
        setTrailerUrl(null);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du trailer :", error);
    }
  };

  const handleShowInfo = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="movies-page">
      <h1>{searchResults && searchResults.length > 0 ? "Résultats de la recherche" : "Films Populaires"}</h1>
      <div className="movies-grid">
        {moviesToShow.length > 0 ? (
          moviesToShow.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title || "Image non disponible"}
                className="movie-poster"
              />
              <div className="movie-info">
                <h3>{movie.title || "Titre indisponible"}</h3>
                <div className="movie-actions">
                  <button onClick={() => fetchTrailer(movie.id)}>▶ Play</button>
                  <button onClick={() => handleShowInfo(movie)}>ℹ Info</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Aucun film trouvé.</p>
        )}
      </div>

      {/* Bouton "Charger plus" */}
      <button onClick={loadMoreMovies} className="load-more-btn">Charger plus de films</button>

      {/* Modale pour lire le trailer */}
      {trailerUrl && (
        <div className="modal">
          <div className="modal-content">
            <iframe
              src={trailerUrl}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Trailer"
            />
            <button className="close-btn" onClick={() => setTrailerUrl(null)}>Fermer</button>
          </div>
        </div>
      )}

      {/* Modale pour afficher les infos */}
      {selectedMovie && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedMovie.title}</h2>
            <p>{selectedMovie.overview || "Aucune description disponible."}</p>
            <p>Note moyenne : {selectedMovie.vote_average || "N/A"}</p>
            <p>Date de sortie : {selectedMovie.release_date || "Indisponible"}</p>
            <button className="close-btn" onClick={() => setSelectedMovie(null)}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movies;
