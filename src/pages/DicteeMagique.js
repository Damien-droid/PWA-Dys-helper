import React, { useState } from 'react';
import './DicteeMagique.css';

const DicteeMagique = () => {
  const [mode, setMode] = useState('serious'); // 'serious', 'funny', 'rap'
  const [currentSentence, setCurrentSentence] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);

  const sentences = {
    serious: [
      "Le chat dort paisiblement sur le tapis.",
      "Les oiseaux chantent dans les arbres du jardin.",
      "Marie lit un livre passionnant dans sa chambre."
    ],
    funny: [
      "Le pingouin porte un chapeau de cowboy rigolo !",
      "Mon chien aime manger des spaghettis avec une fourchette.",
      "Les éléphants font du vélo dans la cuisine de grand-mère."
    ],
    rap: [
      "Yo, j'écris mes mots avec style et passion !",
      "Dans le quartier, les lettres dansent la samba !",
      "Mon stylo fait du beat sur le papier, c'est fantastique !"
    ]
  };

  const selectRandomSentence = () => {
    const modesSentences = sentences[mode];
    const randomIndex = Math.floor(Math.random() * modesSentences.length);
    setCurrentSentence(modesSentences[randomIndex]);
    setUserInput('');
  };

  const speakSentence = (text, isRap = false) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      utterance.rate = isRap ? 1.3 : 1;
      utterance.pitch = isRap ? 1.2 : 1;
      speechSynthesis.speak(utterance);
    }
  };

  const checkAnswer = () => {
    const isCorrect = userInput.toLowerCase().trim() === currentSentence.toLowerCase().trim();
    if (isCorrect) {
      setScore(score + 10);
      alert('🎉 Bravo ! C\'est parfait !');
    } else {
      alert('🤔 Presque ! Essaie encore.');
    }
  };

  const startDictation = () => {
    selectRandomSentence();
    setIsPlaying(true);
    setTimeout(() => {
      speakSentence(currentSentence, mode === 'rap');
    }, 500);
  };

  return (
    <div className="dictee-magique">
      <div className="container">
        <div className="header-section">
          <h1>✨ Dictée Magique</h1>
          <p>Écoute attentivement et écris ce que tu entends !</p>
          <div className="score-display">
            ⭐ Score: {score} points
          </div>
        </div>

        {/* Sélection du mode */}
        <div className="mode-selection">
          <h2>🎯 Choisis ton style :</h2>
          <div className="mode-buttons">
            <button
              className={`mode-btn ${mode === 'serious' ? 'active' : ''}`}
              onClick={() => setMode('serious')}
            >
              📚 Sérieux
            </button>
            <button
              className={`mode-btn ${mode === 'funny' ? 'active' : ''}`}
              onClick={() => setMode('funny')}
            >
              😄 Rigolo
            </button>
            <button
              className={`mode-btn ${mode === 'rap' ? 'active' : ''}`}
              onClick={() => setMode('rap')}
            >
              🎤 Rap
            </button>
          </div>
        </div>

        {/* Zone de jeu */}
        <div className="game-area">
          {!isPlaying ? (
            <div className="start-section">
              <div className="start-card">
                <h3>Prêt à commencer ?</h3>
                <p>Appuie sur le bouton pour entendre ta première phrase !</p>
                <button className="btn btn-primary btn-large" onClick={startDictation}>
                  🎵 Commencer la dictée
                </button>
              </div>
            </div>
          ) : (
            <div className="dictation-active">
              <div className="audio-controls">
                <button
                  className="btn btn-secondary"
                  onClick={() => speakSentence(currentSentence, mode === 'rap')}
                >
                  🔊 Réécouter
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => speakSentence(currentSentence, mode === 'rap')}
                >
                  🎵 Mode {mode === 'rap' ? 'Rap' : mode === 'funny' ? 'Rigolo' : 'Normal'}
                </button>
              </div>

              <div className="input-section">
                <label htmlFor="user-input">✍️ Écris ce que tu as entendu :</label>
                <textarea
                  id="user-input"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Tape ta réponse ici..."
                  rows="4"
                />
              </div>

              <div className="action-buttons">
                <button className="btn btn-success" onClick={checkAnswer}>
                  ✅ Vérifier ma réponse
                </button>
                <button className="btn btn-secondary" onClick={startDictation}>
                  🔄 Nouvelle phrase
                </button>
              </div>

              {/* Aide visuelle */}
              <div className="help-section">
                <details>
                  <summary>🤔 Besoin d'aide ?</summary>
                  <div className="help-content">
                    <p>Voici quelques conseils :</p>
                    <ul>
                      <li>Écoute attentivement plusieurs fois</li>
                      <li>Écris mot par mot</li>
                      <li>N'oublie pas les majuscules et la ponctuation</li>
                      <li>Prends ton temps !</li>
                    </ul>
                  </div>
                </details>
              </div>
            </div>
          )}
        </div>

        {/* Statistiques de session */}
        <div className="session-stats">
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-icon">🎯</span>
              <div>
                <strong>Mode actuel</strong>
                <p>{mode === 'serious' ? 'Sérieux' : mode === 'funny' ? 'Rigolo' : 'Rap'}</p>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-icon">⭐</span>
              <div>
                <strong>Points</strong>
                <p>{score}</p>
              </div>
            </div>
            <div className="stat-card">
              <span className="stat-icon">🏆</span>
              <div>
                <strong>Niveau</strong>
                <p>Débutant</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DicteeMagique;