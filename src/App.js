import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import DicteeMagique from './pages/DicteeMagique';
import PoesieMusicale from './pages/PoesieMusicale';
import Exercices from './pages/Exercices';
import BlogParents from './pages/BlogParents';
import AccessibilityProvider from './components/AccessibilityProvider';
import './styles/App.css';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: ${props => props.accessibleFont ? 'OpenDyslexic, Comic Neue, sans-serif' : 'Comic Neue, sans-serif'};
`;

function App() {
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    fontSize: 'normal',
    letterSpacing: 'normal',
    lineHeight: 'normal',
    highlightText: false,
    ttsEnabled: true,
    accessibleFont: true
  });

  return (
    <AccessibilityProvider value={{ accessibilitySettings, setAccessibilitySettings }}>
      <Router>
        <AppContainer accessibleFont={accessibilitySettings.accessibleFont}>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dictee" element={<DicteeMagique />} />
            <Route path="/poesie" element={<PoesieMusicale />} />
            <Route path="/exercices" element={<Exercices />} />
            <Route path="/blog" element={<BlogParents />} />
          </Routes>
        </AppContainer>
      </Router>
    </AccessibilityProvider>
  );
}

export default App;