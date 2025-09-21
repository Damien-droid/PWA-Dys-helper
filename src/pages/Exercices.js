import React from 'react';

const Exercices = () => {
  return (
    <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
      <h1>🎮 Exercices Ludiques</h1>
      <p>Des jeux amusants pour apprendre !</p>
      <div style={{ 
        background: 'white', 
        padding: '40px', 
        borderRadius: '12px', 
        marginTop: '40px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <h2>🚧 En cours de développement</h2>
        <p>Bientôt disponible ! Tu pourras jouer à :</p>
        <ul style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
          <li>📝 Textes à trous</li>
          <li>❓ Quiz interactifs</li>
          <li>🎧 Réécriture après écoute</li>
          <li>🧩 Puzzles de mots</li>
        </ul>
      </div>
    </div>
  );
};

export default Exercices;