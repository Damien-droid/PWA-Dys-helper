# Dys Helper - Assistant Éducatif PWA

Une application web progressive (PWA) éducative conçue spécialement pour les enfants dyslexiques et leurs familles.

## 🌟 Fonctionnalités

### Pour les Enfants
- **Dictée Magique** : Phrases sérieuses et absurdes avec synthèse vocale et mode chant
- **Poésie Musicale** : Découverte et création de poèmes avec accompagnement musical
- **Exercices Interactifs** : Jeux éducatifs adaptés (lettres manquantes, syllabes, rimes)
- **Système de Gamification** : Points, niveaux et badges pour motiver l'apprentissage

### Pour les Parents
- **Tableau de Bord** : Suivi détaillé des progrès de l'enfant
- **Communauté** : Partage d'expériences avec d'autres familles
- **Ressources** : Guides et conseils pour accompagner l'apprentissage

### Accessibilité
- **Police Adaptée** : Police OpenDyslexic pour faciliter la lecture
- **Synthèse Vocale** : Lecture audio de tous les textes
- **Espacement Optimisé** : Espacement des lettres et lignes adapté
- **Surbrillance** : Mise en évidence du texte pour améliorer la concentration

## 🚀 Installation et Lancement

### Prérequis
- Node.js (version 14 ou supérieure)
- npm ou yarn

### Installation
```bash
# Cloner le repository
git clone https://github.com/Damien-droid/PWA-Dys-helper.git
cd PWA-Dys-helper

# Installer les dépendances
npm install

# Lancer en mode développement
npm start
```

L'application sera accessible sur `http://localhost:3000`

### Build pour Production
```bash
npm run build
```

## 🛠️ Technologies Utilisées

- **React 18** : Framework frontend
- **React Router** : Navigation
- **Styled Components** : Styling
- **Firebase** : Backend et authentification (à configurer)
- **Web Speech API** : Synthèse vocale
- **Service Worker** : Fonctionnalités PWA

## 📱 Fonctionnalités PWA

- ✅ Installation sur appareils mobiles et desktop
- ✅ Fonctionnement hors ligne
- ✅ Notifications push (à implémenter)
- ✅ Mise à jour automatique

## 🎯 Structure du Projet

```
src/
├── components/     # Composants réutilisables
├── pages/         # Pages principales
├── services/      # Services (Firebase, etc.)
├── styles/        # Fichiers CSS
├── utils/         # Utilitaires
└── assets/        # Images et ressources
```

## 🔧 Configuration Firebase

1. Créer un projet Firebase sur https://console.firebase.google.com
2. Activer Firestore Database et Authentication
3. Copier la configuration dans `src/services/firebase.js`

## 👥 Contribution

Les contributions sont les bienvenues ! Merci de :
1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🤝 Support

Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue sur GitHub.

---

**Fait avec ❤️ pour aider les enfants dyslexiques dans leur apprentissage**
