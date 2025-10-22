import React from 'react';
import { Link } from 'react-router-dom';
import { FaFilm, FaHeart } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <FaFilm />
        <Link to="/">TMDB Catálogo</Link>
      </div>
      <nav className="nav-links">
        <Link to="/">Início</Link>
        <Link to="/watchlist">
          <FaHeart /> Minha Lista
        </Link>
      </nav>
    </header>
  );
};

export default Header;