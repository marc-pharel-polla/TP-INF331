import React, { useState } from "react";
import "./Settings.css";

const Settings = () => {
  const [theme, setTheme] = useState("dark"); // Par défaut : thème sombre
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordSet, setPasswordSet] = useState(false); // Vérifie si le mot de passe est défini

  // Gestion du changement de thème
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // Gestion de la soumission du mot de passe
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (newPassword.trim() !== "") {
      setPassword(newPassword);
      setNewPassword("");
      setPasswordSet(true);
      alert("Mot de passe défini avec succès !");
    } else {
      alert("Veuillez entrer un mot de passe valide.");
    }
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>

      {/* Section Thème */}
      <div className="theme-section">
        <h2>Changer de Thème</h2>
        <p>Thème actuel : {theme === "dark" ? "Noir et Orange" : "Blanc et Bleu"}</p>
        <button onClick={toggleTheme}>
          Passer en {theme === "dark" ? "Blanc et Bleu" : "Noir et Orange"}
        </button>
      </div>

      {/* Section Mot de passe */}
      <div className="password-section">
        <h2>Définir un mot de passe</h2>
        {passwordSet ? (
          <p>Un mot de passe est déjà défini.</p>
        ) : (
          <form onSubmit={handlePasswordSubmit}>
            <label htmlFor="password">Nouveau mot de passe :</label>
            <input
              type="password"
              id="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Entrez un mot de passe"
            />
            <button type="submit">Définir</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Settings;
