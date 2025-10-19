import React, { useState } from 'react';
import styled from 'styled-components';
import { useAccessibility } from '../components/AccessibilityProvider';

const Container = styled.div`
  padding: 40px 20px;
  max-width: 1000px;
  margin: 0 auto;
`;

const Card = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  margin: 20px 0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const ExerciseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin: 30px 0;
`;

const ExerciseCard = styled.div`
  background: ${props => props.active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f8fafc'};
  color: ${props => props.active ? 'white' : '#333'};
  padding: 25px;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  border: 2px solid ${props => props.active ? '#667eea' : 'transparent'};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const GameArea = styled.div`
  background: #f8fafc;
  border-radius: 15px;
  padding: 30px;
  margin: 20px 0;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px 25px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 10px;

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

const ProgressBar = styled.div`
  width: 100%;
  height: 20px;
  background: #e1e5e9;
  border-radius: 10px;
  overflow: hidden;
  margin: 20px 0;
`;

const Progress = styled.div`
  width: ${props => props.percentage}%;
  height: 100%;
  background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
  transition: width 0.3s ease;
`;

const ScoreBoard = styled.div`
  background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  margin: 20px 0;
  font-size: 1.2em;
  font-weight: bold;
`;

const LetterButton = styled.button`
  background: ${props => props.selected ? '#667eea' : 'white'};
  color: ${props => props.selected ? 'white' : '#333'};
  border: 2px solid #667eea;
  padding: 15px 20px;
  margin: 5px;
  border-radius: 10px;
  font-size: 1.5em;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 60px;

  &:hover {
    background: #667eea;
    color: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Exercices = () => {
  const { accessibilitySettings } = useAccessibility();
  const [currentExercise, setCurrentExercise] = useState('');
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [progress, setProgress] = useState(0);
  const [gameState, setGameState] = useState({});

  const exercises = {
    'lettres-manquantes': {
      title: '🔤 Lettres Manquantes',
      description: 'Trouve les lettres qui manquent dans les mots',
      icon: '🧩'
    },
    'syllabes': {
      title: '🔄 Jeu des Syllabes',
      description: 'Recompose les mots en assemblant les syllabes',
      icon: '🎯'
    },
    'rimes': {
      title: '🎵 Trouve les Rimes',
      description: 'Associe les mots qui riment ensemble',
      icon: '🎪'
    },
    'sequence': {
      title: '📝 Séquences de Lettres',
      description: 'Remets les lettres dans le bon ordre',
      icon: '🔀'
    }
  };

  // Exercice Lettres Manquantes
  const lettresManquantesData = [
    { word: 'CH_T', missing: 'A', options: ['A', 'E', 'I', 'O'] },
    { word: 'M_ISON', missing: 'A', options: ['A', 'E', 'I', 'U'] },
    { word: 'FL_UR', missing: 'E', options: ['E', 'A', 'O', 'U'] },
    { word: 'SOL_IL', missing: 'E', options: ['E', 'A', 'I', 'O'] }
  ];

  // Exercice Syllabes
  const syllabesData = [
    { word: 'PAPILLON', syllables: ['PA', 'PIL', 'LON'], shuffled: ['LON', 'PA', 'PIL'] },
    { word: 'TELEPHONE', syllables: ['TE', 'LE', 'PHONE'], shuffled: ['PHONE', 'TE', 'LE'] },
    { word: 'CHOCOLAT', syllables: ['CHO', 'CO', 'LAT'], shuffled: ['LAT', 'CHO', 'CO'] }
  ];

  const speakText = (text) => {
    if ('speechSynthesis' in window && accessibilitySettings.ttsEnabled) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const startExercise = (exerciseType) => {
    setCurrentExercise(exerciseType);
    setProgress(0);
    
    switch (exerciseType) {
      case 'lettres-manquantes':
        setGameState({
          currentWordIndex: 0,
          selectedLetter: '',
          isCorrect: null
        });
        break;
      case 'syllabes':
        setGameState({
          currentWordIndex: 0,
          selectedSyllables: [],
          shuffledSyllables: [...syllabesData[0].shuffled]
        });
        break;
      default:
        setGameState({});
    }
  };

  const checkAnswerLettres = (letter) => {
    const currentWord = lettresManquantesData[gameState.currentWordIndex];
    const isCorrect = letter === currentWord.missing;
    
    setGameState(prev => ({ ...prev, selectedLetter: letter, isCorrect }));
    
    if (isCorrect) {
      setScore(score + 10);
      speakText('Bravo ! C\'est correct !');
      setTimeout(() => {
        const nextIndex = gameState.currentWordIndex + 1;
        if (nextIndex < lettresManquantesData.length) {
          setGameState({
            currentWordIndex: nextIndex,
            selectedLetter: '',
            isCorrect: null
          });
          setProgress((nextIndex / lettresManquantesData.length) * 100);
        } else {
          speakText('Félicitations ! Tu as terminé l\'exercice !');
          setProgress(100);
          setLevel(level + 1);
        }
      }, 1500);
    } else {
      speakText('Essaie encore !');
      setTimeout(() => {
        setGameState(prev => ({ ...prev, selectedLetter: '', isCorrect: null }));
      }, 1000);
    }
  };

  const selectSyllable = (syllable, index) => {
    const newSelected = [...gameState.selectedSyllables, syllable];
    const newShuffled = gameState.shuffledSyllables.filter((_, i) => i !== index);
    
    setGameState(prev => ({
      ...prev,
      selectedSyllables: newSelected,
      shuffledSyllables: newShuffled
    }));

    if (newSelected.length === syllabesData[gameState.currentWordIndex].syllables.length) {
      const correctWord = syllabesData[gameState.currentWordIndex].syllables.join('');
      const userWord = newSelected.join('');
      
      if (correctWord === userWord) {
        setScore(score + 15);
        speakText('Excellent ! Le mot est correct !');
        setTimeout(() => {
          const nextIndex = gameState.currentWordIndex + 1;
          if (nextIndex < syllabesData.length) {
            setGameState({
              currentWordIndex: nextIndex,
              selectedSyllables: [],
              shuffledSyllables: [...syllabesData[nextIndex].shuffled]
            });
            setProgress((nextIndex / syllabesData.length) * 100);
          } else {
            speakText('Fantastique ! Tu as terminé tous les mots !');
            setProgress(100);
            setLevel(level + 1);
          }
        }, 1500);
      } else {
        speakText('Pas tout à fait ! Essaie encore.');
        setTimeout(() => {
          setGameState(prev => ({
            ...prev,
            selectedSyllables: [],
            shuffledSyllables: [...syllabesData[gameState.currentWordIndex].shuffled]
          }));
        }, 1000);
      }
    }
  };

  const renderExercise = () => {
    switch (currentExercise) {
      case 'lettres-manquantes':
        const currentWord = lettresManquantesData[gameState.currentWordIndex];
        return (
          <GameArea>
            <h3>Trouve la lettre manquante :</h3>
            <div style={{ fontSize: '3em', margin: '20px 0', letterSpacing: '0.1em' }}>
              {currentWord?.word}
            </div>
            <div>
              {currentWord?.options.map(letter => (
                <LetterButton
                  key={letter}
                  onClick={() => checkAnswerLettres(letter)}
                  selected={gameState.selectedLetter === letter}
                  disabled={gameState.isCorrect !== null}
                >
                  {letter}
                </LetterButton>
              ))}
            </div>
            {gameState.isCorrect !== null && (
              <div style={{ 
                marginTop: '20px', 
                fontSize: '1.5em', 
                color: gameState.isCorrect ? 'green' : 'red' 
              }}>
                {gameState.isCorrect ? '✅ Correct !' : '❌ Essaie encore !'}
              </div>
            )}
          </GameArea>
        );

      case 'syllabes':
        const currentSyllableWord = syllabesData[gameState.currentWordIndex];
        return (
          <GameArea>
            <h3>Recompose le mot :</h3>
            <div style={{ fontSize: '2em', margin: '20px 0' }}>
              Mot à former : {currentSyllableWord?.word}
            </div>
            
            <div style={{ margin: '20px 0' }}>
              <h4>Ton mot :</h4>
              <div style={{ fontSize: '1.8em', color: '#667eea', minHeight: '50px' }}>
                {gameState.selectedSyllables?.join(' - ') || '...'}
              </div>
            </div>

            <div>
              <h4>Syllabes disponibles :</h4>
              {gameState.shuffledSyllables?.map((syllable, index) => (
                <LetterButton
                  key={`${syllable}-${index}`}
                  onClick={() => selectSyllable(syllable, index)}
                >
                  {syllable}
                </LetterButton>
              ))}
            </div>

            <Button 
              onClick={() => setGameState(prev => ({
                ...prev,
                selectedSyllables: [],
                shuffledSyllables: [...syllabesData[gameState.currentWordIndex].shuffled]
              }))}
            >
              🔄 Recommencer
            </Button>
          </GameArea>
        );

      default:
        return (
          <GameArea>
            <h3>Choisis un exercice ci-dessus pour commencer !</h3>
            <p>Chaque exercice t'aidera à améliorer tes compétences en lecture et écriture.</p>
          </GameArea>
        );
    }
  };

  return (
    <Container>
      <Card>
        <h1 className="title">🎮 Exercices Interactifs</h1>
        <p className="subtitle">Apprends en t'amusant avec des jeux éducatifs !</p>

        <ScoreBoard>
          🏆 Score: {score} | 🎯 Niveau: {level} | ⭐ Progrès: {Math.round(progress)}%
        </ScoreBoard>

        <ProgressBar>
          <Progress percentage={progress} />
        </ProgressBar>

        <ExerciseGrid>
          {Object.entries(exercises).map(([key, exercise]) => (
            <ExerciseCard
              key={key}
              active={currentExercise === key}
              onClick={() => startExercise(key)}
            >
              <div style={{ fontSize: '3em', marginBottom: '15px' }}>{exercise.icon}</div>
              <h3>{exercise.title}</h3>
              <p>{exercise.description}</p>
            </ExerciseCard>
          ))}
        </ExerciseGrid>

        {renderExercise()}

        <div style={{ background: '#e8f4fd', padding: '20px', borderRadius: '10px', marginTop: '30px' }}>
          <h3>🌟 Conseils pour réussir :</h3>
          <ul style={{ textAlign: 'left', paddingLeft: '20px' }}>
            <li>Prends ton temps pour bien réfléchir</li>
            <li>N'hésite pas à utiliser la synthèse vocale</li>
            <li>Si tu te trompes, ce n'est pas grave, réessaie !</li>
            <li>Chaque exercice terminé te fait gagner des points</li>
            <li>Amuse-toi en apprenant !</li>
          </ul>
        </div>
      </Card>
    </Container>
  );
};

export default Exercices;