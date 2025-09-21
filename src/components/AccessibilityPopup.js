import React, { useState } from 'react';
import './AccessibilityPopup.css';

const AccessibilityPopup = ({ settings, onSettingsChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSettingChange = (setting) => {
    onSettingsChange({
      ...settings,
      [setting]: !settings[setting]
    });
  };

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <>
      {/* Bouton d'accessibilité flottant */}
      <button
        className="accessibility-button"
        onClick={() => setIsOpen(true)}
        aria-label="Ouvrir les options d'accessibilité"
        title="Options d'accessibilité"
      >
        ♿
      </button>

      {/* Popup d'accessibilité */}
      {isOpen && (
        <div className="accessibility-overlay">
          <div className="accessibility-popup">
            <div className="accessibility-header">
              <h2>⚙️ Options d'Accessibilité</h2>
              <button
                className="close-button"
                onClick={() => setIsOpen(false)}
                aria-label="Fermer"
              >
                ✕
              </button>
            </div>

            <div className="accessibility-content">
              <div className="setting-group">
                <h3>👀 Affichage</h3>
                
                <label className="setting-item">
                  <input
                    type="checkbox"
                    checked={settings.dyslexiaFont}
                    onChange={() => handleSettingChange('dyslexiaFont')}
                  />
                  <span className="checkmark"></span>
                  <div className="setting-text">
                    <strong>Police pour dyslexiques</strong>
                    <small>Utilise une police spécialement conçue pour faciliter la lecture</small>
                  </div>
                </label>

                <label className="setting-item">
                  <input
                    type="checkbox"
                    checked={settings.wideSpacing}
                    onChange={() => handleSettingChange('wideSpacing')}
                  />
                  <span className="checkmark"></span>
                  <div className="setting-text">
                    <strong>Espacement des lettres</strong>
                    <small>Augmente l'espace entre les lettres pour faciliter la lecture</small>
                  </div>
                </label>

                <label className="setting-item">
                  <input
                    type="checkbox"
                    checked={settings.largeText}
                    onChange={() => handleSettingChange('largeText')}
                  />
                  <span className="checkmark"></span>
                  <div className="setting-text">
                    <strong>Texte plus grand</strong>
                    <small>Augmente la taille du texte</small>
                  </div>
                </label>

                <label className="setting-item">
                  <input
                    type="checkbox"
                    checked={settings.highContrast}
                    onChange={() => handleSettingChange('highContrast')}
                  />
                  <span className="checkmark"></span>
                  <div className="setting-text">
                    <strong>Contraste élevé</strong>
                    <small>Thème sombre pour réduire la fatigue visuelle</small>
                  </div>
                </label>
              </div>

              <div className="setting-group">
                <h3>🔊 Audio</h3>
                
                <label className="setting-item">
                  <input
                    type="checkbox"
                    checked={settings.ttsEnabled}
                    onChange={() => handleSettingChange('ttsEnabled')}
                  />
                  <span className="checkmark"></span>
                  <div className="setting-text">
                    <strong>Lecture audio</strong>
                    <small>Active la synthèse vocale pour lire le texte</small>
                  </div>
                </label>

                <label className="setting-item">
                  <input
                    type="checkbox"
                    checked={settings.highlightReading}
                    onChange={() => handleSettingChange('highlightReading')}
                  />
                  <span className="checkmark"></span>
                  <div className="setting-text">
                    <strong>Surlignage pendant la lecture</strong>
                    <small>Met en évidence les mots lus</small>
                  </div>
                </label>
              </div>

              <div className="test-section">
                <h3>🧪 Test</h3>
                <p className="test-text">
                  Ceci est un exemple de texte pour tester les paramètres d'accessibilité.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => speak("Ceci est un exemple de texte pour tester les paramètres d'accessibilité.")}
                >
                  🔊 Écouter ce texte
                </button>
              </div>
            </div>

            <div className="accessibility-footer">
              <button
                className="btn btn-success"
                onClick={() => setIsOpen(false)}
              >
                ✅ Appliquer les paramètres
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccessibilityPopup;