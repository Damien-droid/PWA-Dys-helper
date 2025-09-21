import React from 'react';

const EspaceParents = () => {
  return (
    <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
      <h1>👨‍👩‍👧‍👦 Espace Parents</h1>
      <p>Suivez les progrès de votre enfant et personnalisez son apprentissage</p>
      <div style={{ 
        background: 'white', 
        padding: '40px', 
        borderRadius: '12px', 
        marginTop: '40px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <h2>🚧 En cours de développement</h2>
        <p>Bientôt vous pourrez :</p>
        <ul style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
          <li>📊 Voir les statistiques de progression</li>
          <li>📝 Ajouter vos propres mots et phrases</li>
          <li>📋 Créer des listes personnalisées</li>
          <li>📄 Exporter les progrès en PDF</li>
        </ul>
      </div>
    </div>
  );
};

export default EspaceParents;