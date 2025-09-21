import React from 'react';

const PoesieMusicale = () => {
  return (
    <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
      <h1>🎵 Poésie Musicale</h1>
      <p>Crée de magnifiques poèmes avec de la musique !</p>
      <div style={{ 
        background: 'white', 
        padding: '40px', 
        borderRadius: '12px', 
        marginTop: '40px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <h2>🚧 En cours de développement</h2>
        <p>Cette fonctionnalité arrivera bientôt ! Tu pourras :</p>
        <ul style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
          <li>✍️ Écrire tes propres poèmes</li>
          <li>🎼 Ajouter de la musique de fond</li>
          <li>🎤 Enregistrer ta voix</li>
          <li>🎨 Créer des visuels colorés</li>
        </ul>
      </div>
    </div>
  );
};

export default PoesieMusicale;