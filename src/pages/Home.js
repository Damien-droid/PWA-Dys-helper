import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAccessibility } from '../components/AccessibilityProvider';

const HomeContainer = styled.div`
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Hero = styled.div`
  text-align: center;
  margin-bottom: 50px;
  color: white;
`;

const Title = styled.h1`
  font-size: 3em;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Subtitle = styled.p`
  font-size: 1.3em;
  margin-bottom: 30px;
  opacity: 0.9;
`;

const ModulesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin: 40px 0;
`;

const ModuleCard = styled(Link)`
  background: white;
  border-radius: 20px;
  padding: 30px;
  text-decoration: none;
  color: #333;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: block;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const ModuleIcon = styled.div`
  font-size: 4em;
  margin-bottom: 20px;
  text-align: center;
`;

const ModuleTitle = styled.h3`
  font-size: 1.5em;
  margin-bottom: 15px;
  color: #667eea;
  text-align: center;
`;

const ModuleDescription = styled.p`
  font-size: 1.1em;
  line-height: 1.6;
  color: #666;
  text-align: center;
`;

const FeaturesSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  margin: 40px 0;
  text-align: center;
`;

const FeaturesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
`;

const FeatureItem = styled.div`
  padding: 20px;
  background: #f8fafc;
  border-radius: 15px;
  border-left: 4px solid #667eea;
`;

const Home = () => {
  const { accessibilitySettings } = useAccessibility();

  return (
    <HomeContainer>
      <Hero>
        <Title className={accessibilitySettings.accessibleFont ? 'accessible-text' : ''}>
          Bienvenue dans Dys Helper ! 🌟
        </Title>
        <Subtitle className={accessibilitySettings.accessibleFont ? 'accessible-text' : ''}>
          Votre assistant éducatif personnalisé pour un apprentissage adapté et amusant
        </Subtitle>
      </Hero>

      <ModulesGrid>
        <ModuleCard to="/dictee">
          <ModuleIcon>✨</ModuleIcon>
          <ModuleTitle>Dictée Magique</ModuleTitle>
          <ModuleDescription>
            Découvre des phrases sérieuses et amusantes avec l'aide de la voix magique !
          </ModuleDescription>
        </ModuleCard>

        <ModuleCard to="/poesie">
          <ModuleIcon>🎵</ModuleIcon>
          <ModuleTitle>Poésie Musicale</ModuleTitle>
          <ModuleDescription>
            Apprends la poésie en chanson et laisse ta créativité s'exprimer !
          </ModuleDescription>
        </ModuleCard>

        <ModuleCard to="/exercices">
          <ModuleIcon>🎮</ModuleIcon>
          <ModuleTitle>Exercices Interactifs</ModuleTitle>
          <ModuleDescription>
            Joue et apprends avec des exercices adaptés à ton rythme !
          </ModuleDescription>
        </ModuleCard>

        <ModuleCard to="/blog">
          <ModuleIcon>👨‍👩‍👧‍👦</ModuleIcon>
          <ModuleTitle>Espace Parents</ModuleTitle>
          <ModuleDescription>
            Suivez les progrès et partagez avec d'autres familles !
          </ModuleDescription>
        </ModuleCard>
      </ModulesGrid>

      <FeaturesSection>
        <h2 className="title">Fonctionnalités d'Accessibilité</h2>
        <FeaturesList>
          <FeatureItem>
            <h4>🔤 Police Adaptée</h4>
            <p>Police spécialement conçue pour faciliter la lecture</p>
          </FeatureItem>
          <FeatureItem>
            <h4>🎤 Synthèse Vocale</h4>
            <p>Tous les textes peuvent être lus à voix haute</p>
          </FeatureItem>
          <FeatureItem>
            <h4>✨ Surbrillance</h4>
            <p>Mise en évidence du texte pour une meilleure concentration</p>
          </FeatureItem>
          <FeatureItem>
            <h4>📏 Espacement</h4>
            <p>Espacement optimisé entre les lettres et les mots</p>
          </FeatureItem>
        </FeaturesList>
      </FeaturesSection>
    </HomeContainer>
  );
};

export default Home;