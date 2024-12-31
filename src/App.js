import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Settings from "./pages/Settings";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage"; 

const API_KEY = "ecbe21cc6f4335fd681bef2762742946";
const BASE_URL = "https://api.themoviedb.org/3";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // État de connexion
  const [showLoginModal, setShowLoginModal] = useState(true); // Affichage de la modale
  const [searchResults, setSearchResults] = useState([]);

  const handleLogin = (status) => {
    setIsLoggedIn(status); // Mise à jour de l'état de connexion
  };

  return (
    <Router>
      <div className="app">
        {/* Afficher la modale de connexion si l'utilisateur n'est pas connecté */}
        <LoginPage
          isVisible={showLoginModal && !isLoggedIn}
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
        />

        {/* Contenu principal (affiché uniquement si l'utilisateur est connecté) */}
        {isLoggedIn && (
          <>
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
                      <Banner
                        endpoint={`${BASE_URL}/movie/popular?api_key=${API_KEY}`}
                        type="movie"
                      />
                      <Movies movies={searchResults} />
                      <Footer />
                    </>
                  }
                />
                <Route
                  path="/series"
                  element={
                    <>
                      <Banner
                        endpoint={`${BASE_URL}/tv/popular?api_key=${API_KEY}`}
                        type="series"
                      />
                      <Series />
                      <Footer />
                    </>
                  }
                />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
