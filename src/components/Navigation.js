import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAccessibility } from './AccessibilityProvider';

const NavContainer = styled.nav`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 15px 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  flex-wrap: wrap;
`;

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-decoration: none;
  margin-right: 30px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  flex-wrap: wrap;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 20px;
  transition: all 0.3s ease;
  font-weight: 500;
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.2)' : 'transparent'};

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const AccessibilityButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
  padding: 8px 15px;
  border-radius: 15px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    color: #667eea;
  }
`;

const Navigation = () => {
  const location = useLocation();
  const { accessibilitySettings, setAccessibilitySettings } = useAccessibility();
  const [showAccessibilityMenu, setShowAccessibilityMenu] = useState(false);

  const toggleAccessibility = () => {
    setShowAccessibilityMenu(!showAccessibilityMenu);
  };

  const toggleFont = () => {
    setAccessibilitySettings(prev => ({
      ...prev,
      accessibleFont: !prev.accessibleFont
    }));
  };

  const toggleHighlight = () => {
    setAccessibilitySettings(prev => ({
      ...prev,
      highlightText: !prev.highlightText
    }));
  };

  return (
    <NavContainer>
      <NavContent>
        <Logo to="/">🌟 Dys Helper</Logo>
        <NavLinks>
          <NavLink to="/" active={location.pathname === '/'}>
            Accueil
          </NavLink>
          <NavLink to="/dictee" active={location.pathname === '/dictee'}>
            Dictée Magique
          </NavLink>
          <NavLink to="/poesie" active={location.pathname === '/poesie'}>
            Poésie Musicale
          </NavLink>
          <NavLink to="/exercices" active={location.pathname === '/exercices'}>
            Exercices
          </NavLink>
          <NavLink to="/blog" active={location.pathname === '/blog'}>
            Blog Parents
          </NavLink>
          <AccessibilityButton onClick={toggleAccessibility}>
            ♿ Accessibilité
          </AccessibilityButton>
        </NavLinks>
      </NavContent>
      
      {showAccessibilityMenu && (
        <div style={{ 
          background: 'white', 
          padding: '15px', 
          margin: '10px 20px', 
          borderRadius: '10px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
        }}>
          <button onClick={toggleFont} style={{ margin: '5px', padding: '8px 15px' }}>
            {accessibilitySettings.accessibleFont ? 'Police normale' : 'Police dyslexie'}
          </button>
          <button onClick={toggleHighlight} style={{ margin: '5px', padding: '8px 15px' }}>
            {accessibilitySettings.highlightText ? 'Sans surbrillance' : 'Avec surbrillance'}
          </button>
        </div>
      )}
    </NavContainer>
  );
};

export default Navigation;