import React, { useEffect, useState } from 'react';
import './Series.css';

const API_KEY = 'ecbe21cc6f4335fd681bef2762742946';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const YOUTUBE_BASE_URL = 'https://www.youtube.com/embed/';

const Series = () => {
  const [series, setSeries] = useState([]); // Stocker les séries chargées
  const [page, setPage] = useState(1); // Stocker le numéro de page actuel pour la pagination
  const [hasMore, setHasMore] = useState(true); // Indique s'il reste des séries à charger
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [selectedSeries, setSelectedSeries] = useState(null);

  // Fonction pour récupérer une page de séries populaires
  const fetchSeries = async (pageNumber) => {
    try {
      const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=${pageNumber}`);
      const data = await response.json();

      // Ajouter les nouvelles séries à la liste existante
      setSeries((prevSeries) => [...prevSeries, ...data.results]);

      // Si le nombre de résultats retournés est inférieur au maximum par page (20), il n'y a plus de séries à charger
      if (data.results.length < 20) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des séries :", error);
    }
  };

  // Charger la première page de séries lors du premier rendu du composant
  useEffect(() => {
    fetchSeries(page);
  }, [page]); // Recharger lorsque le numéro de page change

  // Charger le trailer d'une série
  const fetchTrailer = async (seriesId) => {
    try {
      const response = await fetch(`${BASE_URL}/tv/${seriesId}/videos?api_key=${API_KEY}&language=en-US`);
      const data = await response.json();

      // Chercher une vidéo de type Trailer sur YouTube
      const trailer = data.results.find((video) => video.type === 'Trailer' && video.site === 'YouTube');
      if (trailer) {
        setTrailerUrl(`${YOUTUBE_BASE_URL}${trailer.key}`);
      } else {
        alert('Aucun trailer disponible pour cette série.');
        setTrailerUrl(null);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du trailer :", error);
    }
  };

  // Afficher les détails d'une série
  const handleShowInfo = (series) => {
    setSelectedSeries(series);
  };

  // Fonction pour charger la page suivante
  const loadMoreSeries = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1); // Incrémenter le numéro de page
    }
  };

  return (
    <div className="series-page">
      <h1>Séries Populaires</h1>
      <div className="series-grid">
        {series.map((show) => (
          <div key={show.id} className="series-card">
            <img
              src={`${IMAGE_BASE_URL}${show.poster_path}`}
              alt={show.name || "Image indisponible"}
              className="series-poster"
            />
            <div className="series-info">
              <h3>{show.name || "Titre indisponible"}</h3>
              <div className="series-actions">
                <button onClick={() => fetchTrailer(show.id)}>▶ Play</button>
                <button onClick={() => handleShowInfo(show)}>ℹ Info</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bouton pour charger plus de séries */}
      {hasMore && (
        <button className="load-more-btn" onClick={loadMoreSeries}>
          Charger plus
        </button>
      )}

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
      {selectedSeries && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedSeries.name}</h2>
            <p>{selectedSeries.overview || "Aucune description disponible."}</p>
            <p>Note moyenne : {selectedSeries.vote_average || "N/A"}</p>
            <p>Première diffusion : {selectedSeries.first_air_date || "Indisponible"}</p>
            <button className="close-btn" onClick={() => setSelectedSeries(null)}>Fermer</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Series;
