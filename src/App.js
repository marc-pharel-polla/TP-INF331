import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
//import Header from "./components/Header";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Settings from "./pages/Settings";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Home from "./pages/Home";

const API_KEY = 'ecbe21cc6f4335fd681bef2762742946'; 
const BASE_URL = 'https://api.themoviedb.org/3';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  //const [searchQuery, setSearchQuery] = useState("");

  /*const handleSearch = async (query) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
    }
  };*/

  return (
    <Router>
      <div className="app">
       
        {/* Barre latérale */}
        <Sidebar />

        {/* Contenu principal */}
        <div className="main-content">
          <Routes>
            {/* Route pour la page d'accueil */}
            <Route path="/" element={<Home />} />
            
            <Route
              path="/movies"
              element={
                <>
                  <Banner endpoint={`${BASE_URL}/movie/popular?api_key=${API_KEY}`} type="movie" />
                  <Movies movies={searchResults} />
                  <Footer />
                </>
              }
            />
            <Route
              path="/series"
              element={
                <>
                  <Banner endpoint={`${BASE_URL}/tv/popular?api_key=${API_KEY}`} type="series" />
                  <Series />
                  <Footer />
                </>
              }
            />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
