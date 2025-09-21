import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="container">
        <div className="nav-brand">
          <h1>🎯 Dys-Helper</h1>
          <p>Apprendre en s'amusant !</p>
        </div>
        
        <div className="nav-links">
          <NavLink to="/" className="nav-link">
            🏠 Accueil
          </NavLink>
          <NavLink to="/dictee-magique" className="nav-link">
            ✨ Dictée Magique
          </NavLink>
          <NavLink to="/poesie-musicale" className="nav-link">
            🎵 Poésie Musicale
          </NavLink>
          <NavLink to="/exercices" className="nav-link">
            🎮 Exercices
          </NavLink>
          <NavLink to="/espace-parents" className="nav-link parent-link">
            👨‍👩‍👧‍👦 Espace Parents
          </NavLink>
          <NavLink to="/blog" className="nav-link parent-link">
            📝 Blog
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;