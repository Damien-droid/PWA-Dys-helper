import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAccessibility } from '../components/AccessibilityProvider';

const Container = styled.div`
  padding: 40px 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Card = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  margin: 20px 0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const SentenceDisplay = styled.div`
  font-size: 1.8em;
  line-height: 1.8;
  padding: 30px;
  margin: 20px 0;
  background: #f8fafc;
  border-radius: 15px;
  border-left: 5px solid #667eea;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  margin: 30px 0;
`;

const Button = styled.button`
  background: ${props => props.primary ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'};
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

const ModeSelector = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin: 20px 0;
`;

const ModeButton = styled.button`
  background: ${props => props.active ? '#667eea' : 'transparent'};
  color: ${props => props.active ? 'white' : '#667eea'};
  border: 2px solid #667eea;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
`;

const ScoreDisplay = styled.div`
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  padding: 20px;
  border-radius: 15px;
  margin: 20px 0;
  font-size: 1.2em;
  font-weight: bold;
`;

const DicteeMagique = () => {
  const { accessibilitySettings } = useAccessibility();
  const [currentSentence, setCurrentSentence] = useState('');
  const [mode, setMode] = useState('serieuse'); // 'serieuse' ou 'absurde'
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);

  const sentences = {
    serieuse: [
      "Le chat noir dort paisiblement sur le canapé.",
      "Marie mange une pomme rouge dans le jardin.",
      "Les oiseaux chantent joyeusement dans l'arbre.",
      "Papa lit un livre intéressant près de la fenêtre.",
      "Les enfants jouent ensemble dans la cour de récréation."
    ],
    absurde: [
      "Le poisson violet conduit une voiture violette.",
      "La lune mange des spaghettis avec une fourchette en or.",
      "Un éléphant rose danse la valse avec un pingouin.",
      "Les nuages portent des chaussettes rayées et des lunettes.",
      "Une carotte géante joue du piano dans l'espace."
    ]
  };

  const speakText = (text, singing = false) => {
    if ('speechSynthesis' in window && accessibilitySettings.ttsEnabled) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      utterance.rate = singing ? 0.6 : 0.8;
      utterance.pitch = singing ? 1.3 : 1.0;
      
      if (singing) {
        // Ajout d'une mélodie simple en modifiant le pitch
        const words = text.split(' ');
        let wordIndex = 0;
        
        const speakWord = () => {
          if (wordIndex < words.length) {
            const wordUtterance = new SpeechSynthesisUtterance(words[wordIndex]);
            wordUtterance.lang = 'fr-FR';
            wordUtterance.rate = 0.5;
            wordUtterance.pitch = 1.0 + (Math.sin(wordIndex * 0.5) * 0.3);
            
            wordUtterance.onend = () => {
              wordIndex++;
              setTimeout(speakWord, 200);
            };
            
            window.speechSynthesis.speak(wordUtterance);
          } else {
            setIsPlaying(false);
          }
        };
        
        setIsPlaying(true);
        speakWord();
      } else {
        utterance.onend = () => setIsPlaying(false);
        setIsPlaying(true);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const getRandomSentence = () => {
    const sentenceList = sentences[mode];
    const randomIndex = Math.floor(Math.random() * sentenceList.length);
    return sentenceList[randomIndex];
  };

  const startDictation = () => {
    const newSentence = getRandomSentence();
    setCurrentSentence(newSentence);
    speakText(newSentence);
  };

  const speakWithSong = () => {
    if (currentSentence) {
      speakText(currentSentence, true);
    }
  };

  const nextSentence = () => {
    setScore(score + 10);
    startDictation();
  };

  useEffect(() => {
    startDictation();
  }, [mode]);

  return (
    <Container>
      <Card>
        <h1 className="title">✨ Dictée Magique ✨</h1>
        <p className="subtitle">Écoute et découvre des phrases magiques !</p>
        
        <ScoreDisplay>
          🏆 Score: {score} points | Niveau: {level}
        </ScoreDisplay>

        <ModeSelector>
          <ModeButton 
            active={mode === 'serieuse'} 
            onClick={() => setMode('serieuse')}
          >
            📖 Phrases Sérieuses
          </ModeButton>
          <ModeButton 
            active={mode === 'absurde'} 
            onClick={() => setMode('absurde')}
          >
            🤪 Phrases Absurdes
          </ModeButton>
        </ModeSelector>

        <SentenceDisplay className={accessibilitySettings.accessibleFont ? 'accessible-text' : ''}>
          {currentSentence || "Clique sur 'Nouvelle Phrase' pour commencer !"}
        </SentenceDisplay>

        <ButtonGroup>
          <Button primary onClick={startDictation} disabled={isPlaying}>
            🎯 Nouvelle Phrase
          </Button>
          <Button onClick={() => speakText(currentSentence)} disabled={isPlaying || !currentSentence}>
            🔊 Écouter
          </Button>
          <Button onClick={speakWithSong} disabled={isPlaying || !currentSentence}>
            🎵 Mode Chant
          </Button>
          <Button onClick={nextSentence} disabled={!currentSentence}>
            ✅ Phrase Suivante
          </Button>
        </ButtonGroup>

        <div style={{ marginTop: '30px', padding: '20px', background: '#f0f8ff', borderRadius: '10px' }}>
          <h3>💡 Comment jouer ?</h3>
          <p>1. Choisis ton mode : phrases sérieuses ou absurdes</p>
          <p>2. Écoute la phrase en mode normal ou chanté</p>
          <p>3. Essaie de la répéter ou de l'écrire</p>
          <p>4. Passe à la phrase suivante pour gagner des points !</p>
        </div>
      </Card>
    </Container>
  );
};

export default DicteeMagique;