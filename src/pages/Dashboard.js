import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [userStats, setUserStats] = useState({
    level: 1,
    stars: 0,
    badges: [],
    streakDays: 0
  });

  // Charger les statistiques utilisateur
  useEffect(() => {
    const savedStats = localStorage.getItem('dyshelper-user-stats');
    if (savedStats) {
      setUserStats(JSON.parse(savedStats));
    }
  }, []);

  const activities = [
    {
      id: 'dictee-magique',
      title: 'Dictée Magique',
      description: 'Écoute et écris ! Choisis entre phrases sérieuses ou amusantes, et même en mode rap !',
      icon: '✨',
      color: '#6366f1',
      route: '/dictee-magique'
    },
    {
      id: 'poesie-musicale', 
      title: 'Poésie Musicale',
      description: 'Crée de magnifiques poèmes avec de la musique ! Laisse libre cours à ta créativité.',
      icon: '🎵',
      color: '#10b981',
      route: '/poesie-musicale'
    },
    {
      id: 'exercices',
      title: 'Exercices Ludiques',
      description: 'Des jeux amusants : textes à trous, quiz et bien plus encore !',
      icon: '🎮',
      color: '#f59e0b',
      route: '/exercices'
    }
  ];

  const achievements = [
    { name: 'Première étoile', icon: '⭐', earned: userStats.stars >= 1 },
    { name: 'Lecteur assidu', icon: '📚', earned: userStats.streakDays >= 3 },
    { name: 'Poète en herbe', icon: '🌱', earned: userStats.badges.includes('poet') },
    { name: 'Champion de dictée', icon: '🏆', earned: userStats.badges.includes('dictation') }
  ];

  return (
    <div className="dashboard">
      <div className="container">
        {/* Section d'accueil */}
        <div className="welcome-section">
          <div className="welcome-card">
            <h1>🌟 Bonjour petit champion !</h1>
            <p>Prêt pour une nouvelle aventure d'apprentissage ? Choisis ton activité préférée !</p>
            
            <div className="user-stats">
              <div className="stat-item">
                <span className="stat-icon">🏅</span>
                <div>
                  <strong>Niveau {userStats.level}</strong>
                  <small>Continue comme ça !</small>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon">⭐</span>
                <div>
                  <strong>{userStats.stars} étoiles</strong>
                  <small>Collectées</small>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon">🔥</span>
                <div>
                  <strong>{userStats.streakDays} jours</strong>
                  <small>De suite</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activités principales */}
        <div className="activities-section">
          <h2>🎯 Tes Activités</h2>
          <div className="activities-grid">
            {activities.map((activity) => (
              <Link 
                key={activity.id} 
                to={activity.route} 
                className="activity-card child-friendly"
                style={{ borderColor: activity.color }}
              >
                <div 
                  className="activity-icon"
                  style={{ backgroundColor: activity.color }}
                >
                  {activity.icon}
                </div>
                <h3>{activity.title}</h3>
                <p>{activity.description}</p>
                <div className="activity-action">
                  <span className="play-button">▶️ Jouer</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Section récompenses */}
        <div className="achievements-section">
          <h2>🏆 Tes Récompenses</h2>
          <div className="achievements-grid">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className={`achievement-card ${achievement.earned ? 'earned' : 'locked'}`}
              >
                <div className="achievement-icon">
                  {achievement.earned ? achievement.icon : '🔒'}
                </div>
                <p>{achievement.name}</p>
                {achievement.earned && (
                  <div className="earned-badge">Obtenu !</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Motivation quotidienne */}
        <div className="motivation-section">
          <div className="motivation-card">
            <div className="motivation-content">
              <h3>💪 Message du jour</h3>
              <p>"Chaque petit pas compte ! Tu es en train de devenir un super lecteur !"</p>
              <div className="motivation-actions">
                <button className="btn btn-primary animate-bounce">
                  🎯 Commencer une activité
                </button>
              </div>
            </div>
            <div className="motivation-character">
              🦸‍♀️
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;