import React, { useState } from 'react';
import styled from 'styled-components';
import { useAccessibility } from '../components/AccessibilityProvider';

const Container = styled.div`
  padding: 40px 20px;
  max-width: 900px;
  margin: 0 auto;
`;

const Card = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  margin: 20px 0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const PoemDisplay = styled.div`
  font-size: 1.5em;
  line-height: 2;
  padding: 30px;
  margin: 20px 0;
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
  border-radius: 15px;
  text-align: center;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  margin: 30px 0;
`;

const Button = styled.button`
  background: ${props => props.primary ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'};
  color: ${props => props.primary ? 'white' : '#333'};
  border: none;
  padding: 15px 25px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 140px;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const CreativeSpace = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 20px;
  border: 2px solid #e1e5e9;
  border-radius: 15px;
  font-size: 1.2em;
  line-height: 1.6;
  resize: vertical;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const RhymeHelper = styled.div`
  background: #f8fafc;
  padding: 20px;
  border-radius: 15px;
  margin: 20px 0;
`;

const PoesieMusicale = () => {
  const { accessibilitySettings } = useAccessibility();
  const [currentPoem, setCurrentPoem] = useState('');
  const [userPoem, setUserPoem] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showRhymes, setShowRhymes] = useState(false);

  const poems = [
    {
      title: "Le Petit Chat",
      content: `Dans le jardin fleuri,
Un petit chat gris
Joue avec une souris,
Qui court jusqu'à midi !`,
      rhythm: [1.0, 1.2, 0.8, 1.0, 1.1, 0.9, 1.3, 0.7]
    },
    {
      title: "Les Couleurs",
      content: `Rouge comme une pomme,
Bleu comme la mer,
Vert comme les arbres,
Jaune comme l'hiver !`,
      rhythm: [1.0, 1.3, 0.9, 1.0, 1.2, 0.8, 1.1, 0.9]
    },
    {
      title: "La Lune",
      content: `Dans le ciel étoilé,
La lune sourit,
Elle éclaire la nuit,
Pour tous les enfants !`,
      rhythm: [0.9, 1.2, 1.0, 1.1, 0.8, 1.3, 1.0, 0.9]
    }
  ];

  const rhymeWords = {
    'at': ['chat', 'rat', 'plat', 'format'],
    'eau': ['beau', 'nouveau', 'oiseau', 'cadeau'],
    'ir': ['rire', 'sourire', 'partir', 'dormir'],
    'eur': ['fleur', 'bonheur', 'couleur', 'douceur'],
    'ot': ['mot', 'pot', 'sot', 'robot']
  };

  const speakPoem = (text, withMelody = false) => {
    if ('speechSynthesis' in window && accessibilitySettings.ttsEnabled) {
      window.speechSynthesis.cancel();
      setIsPlaying(true);

      if (withMelody) {
        const lines = text.split('\n').filter(line => line.trim());
        let lineIndex = 0;

        const speakLine = () => {
          if (lineIndex < lines.length) {
            const line = lines[lineIndex];
            const words = line.split(' ');
            let wordIndex = 0;

            const speakWord = () => {
              if (wordIndex < words.length) {
                const utterance = new SpeechSynthesisUtterance(words[wordIndex]);
                utterance.lang = 'fr-FR';
                utterance.rate = 0.6;
                utterance.pitch = 1.0 + (Math.sin(wordIndex * 0.8) * 0.4);
                utterance.volume = 0.8;

                utterance.onend = () => {
                  wordIndex++;
                  setTimeout(speakWord, 300);
                };

                window.speechSynthesis.speak(utterance);
              } else {
                lineIndex++;
                setTimeout(speakLine, 800);
              }
            };

            speakWord();
          } else {
            setIsPlaying(false);
          }
        };

        speakLine();
      } else {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'fr-FR';
        utterance.rate = 0.7;
        utterance.pitch = 1.1;
        utterance.onend = () => setIsPlaying(false);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const getRandomPoem = () => {
    const randomIndex = Math.floor(Math.random() * poems.length);
    const poem = poems[randomIndex];
    setCurrentPoem(poem.content);
  };

  const speakUserPoem = () => {
    if (userPoem.trim()) {
      speakPoem(userPoem, true);
    }
  };

  return (
    <Container>
      <Card>
        <h1 className="title">🎵 Poésie Musicale 🎵</h1>
        <p className="subtitle">Découvre la magie des mots en musique !</p>

        <PoemDisplay className={accessibilitySettings.accessibleFont ? 'accessible-text' : ''}>
          {currentPoem ? (
            <div>
              <h3 style={{ marginBottom: '20px', color: '#667eea' }}>Poème du jour</h3>
              <div style={{ whiteSpace: 'pre-line' }}>{currentPoem}</div>
            </div>
          ) : (
            <div>
              <p>🎭 Clique sur "Nouveau Poème" pour découvrir</p>
              <p>un poème magique !</p>
            </div>
          )}
        </PoemDisplay>

        <ButtonGroup>
          <Button primary onClick={getRandomPoem}>
            📜 Nouveau Poème
          </Button>
          <Button onClick={() => speakPoem(currentPoem)} disabled={isPlaying || !currentPoem}>
            🎤 Réciter
          </Button>
          <Button onClick={() => speakPoem(currentPoem, true)} disabled={isPlaying || !currentPoem}>
            🎵 Chanter
          </Button>
          <Button onClick={() => setShowRhymes(!showRhymes)}>
            🔍 Aide aux Rimes
          </Button>
        </ButtonGroup>

        {showRhymes && (
          <RhymeHelper>
            <h3>🎯 Aide aux Rimes</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginTop: '15px' }}>
              {Object.entries(rhymeWords).map(([ending, words]) => (
                <div key={ending} style={{ background: 'white', padding: '15px', borderRadius: '10px' }}>
                  <h4>-{ending}</h4>
                  <p>{words.join(', ')}</p>
                </div>
              ))}
            </div>
          </RhymeHelper>
        )}

        <Card style={{ background: '#f0f8ff', margin: '30px 0' }}>
          <h3>✍️ Crée ton propre poème !</h3>
          <CreativeSpace
            placeholder="Écris ici ton poème... Laisse libre cours à ta créativité !"
            value={userPoem}
            onChange={(e) => setUserPoem(e.target.value)}
            className={accessibilitySettings.accessibleFont ? 'accessible-text' : ''}
          />
          <ButtonGroup>
            <Button onClick={speakUserPoem} disabled={isPlaying || !userPoem.trim()}>
              🎭 Réciter mon poème
            </Button>
            <Button onClick={() => setUserPoem('')}>
              🗑️ Effacer
            </Button>
          </ButtonGroup>
        </Card>

        <div style={{ background: '#fff3cd', padding: '20px', borderRadius: '10px', marginTop: '20px' }}>
          <h3>🌟 Conseils pour créer un beau poème :</h3>
          <ul style={{ textAlign: 'left', paddingLeft: '20px' }}>
            <li>Choisis un thème que tu aimes (animaux, nature, famille...)</li>
            <li>Essaie de faire rimer les fins de vers</li>
            <li>Compte les syllabes pour créer un rythme</li>
            <li>Utilise des mots qui sonnent bien ensemble</li>
            <li>Laisse parler ton imagination !</li>
          </ul>
        </div>
      </Card>
    </Container>
  );
};

export default PoesieMusicale;