import React from 'react';

const Blog = () => {
  return (
    <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
      <h1>📝 Blog des Parents</h1>
      <p>Partagez vos expériences et découvrez les conseils d'autres parents</p>
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
          <li>✍️ Publier vos propres articles</li>
          <li>💬 Commenter les posts</li>
          <li>📤 Partager vos listes de mots</li>
          <li>💡 Découvrir des astuces d'autres parents</li>
        </ul>
      </div>
    </div>
  );
};

export default Blog;