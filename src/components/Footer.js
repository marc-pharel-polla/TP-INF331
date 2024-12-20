// src/components/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_links">
        <a href="#">Home</a>
        <a href="#">Movies</a>
        <a href="#">TV Shows</a>
        <a href="#">Contact Us</a>
      </div>
      <div className="footer_socials">
        <span>Follow us:</span>
        <a href="#">Facebook</a>
        <a href="#">Instagram</a>
        <a href="#">Twitter</a>
      </div>
      <p>&copy; 2024 Movies App. All Rights Reserved.</p>
    </div>
  );
};

export default Footer;
