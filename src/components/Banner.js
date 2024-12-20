import React, { useEffect, useState } from 'react';
import './Banner.css';

const Banner = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
   
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.themoviedb.org/3/trending/all/week?api_key=ecbe21cc6f4335fd681bef2762742946'
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const results = data.results;
        if (results && results.length > 0) {
          setMovie(results[Math.floor(Math.random() * results.length)]);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };
    fetchData();
  }, []);

  return (
    <header
      className="banner"
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        backgroundPosition: 'center center',
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">Info</button>
        </div>
        <h1 className="banner_description">
          {movie?.overview?.length > 150
            ? movie?.overview.substring(0, 150) + '...'
            : movie?.overview}
        </h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
};

export default Banner;