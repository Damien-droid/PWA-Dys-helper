import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Composants
import AccessibilityPopup from './components/AccessibilityPopup';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import DicteeMagique from './pages/DicteeMagique';
import PoesieMusicale from './pages/PoesieMusicale';
import Exercices from './pages/Exercices';
import EspaceParents from './pages/EspaceParents';
import Blog from './pages/Blog';

function App() {
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    dyslexiaFont: false,
    wideSpacing: false,
    highContrast: false,
    largeText: false,
    ttsEnabled: false,
    highlightReading: false
  });

  // Chargement des paramètres d'accessibilité depuis localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('dyshelper-accessibility');
    if (savedSettings) {
      setAccessibilitySettings(JSON.parse(savedSettings));
    }
  }, []);

  // Sauvegarde des paramètres d'accessibilité
  useEffect(() => {
    localStorage.setItem('dyshelper-accessibility', JSON.stringify(accessibilitySettings));
    
    // Application des classes CSS selon les paramètres
    const body = document.body;
    body.classList.toggle('dyslexia-font', accessibilitySettings.dyslexiaFont);
    body.classList.toggle('wide-spacing', accessibilitySettings.wideSpacing);
    body.classList.toggle('high-contrast', accessibilitySettings.highContrast);
    body.classList.toggle('large-text', accessibilitySettings.largeText);
  }, [accessibilitySettings]);

  return (
    <Router>
      <div className="App">
        <AccessibilityPopup 
          settings={accessibilitySettings}
          onSettingsChange={setAccessibilitySettings}
        />
        
        <Navigation />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dictee-magique" element={<DicteeMagique />} />
            <Route path="/poesie-musicale" element={<PoesieMusicale />} />
            <Route path="/exercices" element={<Exercices />} />
            <Route path="/espace-parents" element={<EspaceParents />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;