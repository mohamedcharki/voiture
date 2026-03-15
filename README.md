# 🚗 LUXCAR - Location de Voitures Premium au Maroc

Une application web moderne et réactive pour la location de voitures premium au Maroc, construite avec **React 18**, **Vite**, et **Tailwind CSS**.

## 🎯 Démarrage Rapide

### 1️⃣ Installation
```bash
npm install
```

### 2️⃣ Lancer le serveur de développement
```bash
npm run dev
```

L'application s'ouvrira automatiquement à `http://localhost:5173`

### 3️⃣ Build pour la production
```bash
npm run build
```

### 4️⃣ Prévisualisation du build
```bash
npm run preview
```

---

## 📁 Structure du Projet

```
luxcar-rental/
├── src/
│   ├── components/
│   │   ├── Navigation.jsx          # Barre de navigation
│   │   ├── HeroSection.jsx         # Section héros
│   │   ├── FleetSection.jsx        # Section flotte de voitures
│   │   ├── CarCard.jsx             # Carte de voiture
│   │   ├── DestinationsSection.jsx # Destinations marocaines
│   │   ├── StatsSection.jsx        # Statistiques
│   │   ├── ServicesSection.jsx     # Services offerts
│   │   ├── ReviewsSection.jsx      # Avis clients
│   │   ├── AboutSection.jsx        # À propos
│   │   ├── ContactSection.jsx      # Contact
│   │   ├── Footer.jsx              # Pied de page
│   │   ├── WhatsAppButton.jsx      # Bouton WhatsApp
│   │   └── ReservationModal.jsx    # Modal de réservation
│   ├── App.jsx                      # Composant principal
│   ├── main.jsx                     # Point d'entrée
│   └── index.css                    # Styles globaux
├── public/
├── index.html                       # Template HTML
├── package.json                     # Dépendances et scripts
├── vite.config.js                   # Configuration Vite
├── tailwind.config.js               # Configuration Tailwind
├── postcss.config.js                # Configuration PostCSS
├── .gitignore                       # Fichiers à ignorer
└── README.md                        # Ce fichier
```

---

## 🎨 Composants React

### Navigation
- Menu sticky responsive
- Lien téléphone
- Bouton de réservation
- Menu mobile avec hamburger

### Hero Section
- Formulaire de recherche intégré
- Boutons d'appel à l'action
- Background de voiture réaliste en SVG

### Fleet Section
- Grille de voitures (3 colonnes)
- Filtres dynamiques (Tous, Économique, Confort, Premium)
- Cartes interactives avec animations

### CarCard
- Illustration SVG de la voiture
- Spécifications (carburant, transmission, passagers)
- Bouton de réservation

### Destinations
- 6 destinations marocaines
- Cartes avec gradients de couleurs
- Boutons interactifs

### Services
- 6 services avec icônes FontAwesome
- Hover effects
- Icônes colorées

### Stats
- Compteurs animés
- +500 voitures, +50K clients, 9 villes, 9 ans

### Reviews
- 3 avis clients
- Système d'évaluation par étoiles
- Avatars personnalisés

### Contact
- Formulaire de contact fonctionnel
- Informations de contact (téléphone, email, adresse)
- Horaires d'ouverture
- Placeholder pour la carte

### Modal de Réservation
- Formulaire complet
- Validation des données
- Fermeture avec bouton X

---

## 🚗 Voitures Disponibles

| Modèle | Prix | Catégorie | Carburant | Transmission |
|--------|------|-----------|-----------|--------------|
| Dacia Sandero | 120 DH | Économique | Essence | Manuelle |
| Dacia Duster | 200 DH | Confort | Essence | Automatique |
| Toyota Corolla | 180 DH | Confort | Essence | Automatique |
| Audi A4 | 330 DH | Premium | Essence | Automatique |
| BMW 3 Series | 350 DH | Premium | Essence | Automatique |
| Mercedes C-Class | 380 DH | Premium | Essence | Automatique |

---

## 🌍 Destinations

- 🏙️ **Casablanca** - Ville moderne avec attractions
- 🏜️ **Marrakech** - La ville ocre et ses souks
- 👑 **Rabat** - Capitale avec jardins
- 🌊 **Tanger** - Porte du Maroc avec plages
- 🏖️ **Agadir** - Station balnéaire dorée
- 🏛️ **Fès** - Médina ancienne

---

## 🛠️ Technologies Utilisées

- **React 18.2** - Framework JavaScript
- **Vite 5.0** - Bundler ultra-rapide
- **Tailwind CSS 3.3** - Framework CSS utilitaire
- **Lucide React** - Icônes
- **FontAwesome CDN** - Icônes supplémentaires

---

## 📋 Dépendances

### Production
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "lucide-react": "^0.263.1"
}
```

### Development
```json
{
  "@vitejs/plugin-react": "^4.2.0",
  "vite": "^5.0.0",
  "tailwindcss": "^3.3.0",
  "postcss": "^8.4.0",
  "autoprefixer": "^10.4.0"
}
```

---

## ✨ Fonctionnalités

✅ **Responsive Design** - 100% mobile-friendly
✅ **Filtrage Dynamique** - Filtrer par catégorie
✅ **Animations Fluides** - Transitions et effets
✅ **Formulaires Fonctionnels** - Réservation et contact
✅ **Navigation Sticky** - Menu toujours visible
✅ **Modal Interactive** - Réservation en popup
✅ **Compteurs Animés** - Statistiques animées
✅ **Design Premium** - Interface luxe et moderne

---

## 🎯 Pages et Sections

1. **Accueil (Hero)** - Formulaire de recherche + CTA
2. **Flotte** - Véhicules avec filtres + détails
3. **Destinations** - Villes marocaines
4. **Statistiques** - Compteurs animés
5. **Services** - Services proposés
6. **Avis** - Témoignages clients
7. **À Propos** - Informations LUXCAR
8. **Contact** - Formulaire + info contact
9. **Footer** - Liens et réseaux sociaux

---

## 🚀 Déploiement

### Sur Vercel
```bash
npm install -g vercel
vercel
```

### Sur Netlify
```bash
npm run build
# Uploadez le dossier dist
```

### Sur GitHub Pages
```bash
npm install --save-dev gh-pages
# Ajouter "homepage": "https://yourusername.github.io/luxcar"
# dans package.json
npm run build
npm run deploy
```

---

## 📞 Contacts Intégrés

- **Téléphone**: +212 6 00 00 00 00
- **WhatsApp**: wa.me/212600000000
- **Email**: contact@luxcar.ma
- **Adresse**: Avenue Mohammed V, Casablanca

---

## 🎓 Notes pour les Développeurs

- ✅ Code bien organisé et commenté
- ✅ Composants réutilisables
- ✅ État centralisé avec useState
- ✅ Props drilling minimal
- ✅ CSS Tailwind intégré
- ✅ Prête pour Redux si nécessaire
- ✅ Prête pour une API backend

---

## 🔐 Sécurité

- Input validation sur les formulaires
- Pas d'exposition d'API keys
- Sanitization des données utilisateur
- HTTPS recommandé pour la production

---

## 📊 Performance

- Vite pour build ultra-rapide
- Tailwind CSS pour CSS optimisé
- Images SVG pour légèreté
- Code splitting automatique

---

## 🐛 Troubleshooting

### Port 5173 déjà utilisé
```bash
npm run dev -- --port 3000
```

### Erreur Tailwind CSS
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Erreur modules
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📝 Licence

Projet open source pour usage personnel et commercial.

---

## 👨‍💻 Auteur

**LUXCAR Development Team**

---

## ✅ Checklist Avant Déploiement

- [ ] Installer Node.js v16+
- [ ] `npm install`
- [ ] `npm run dev` fonctionne
- [ ] Vérifier tous les liens
- [ ] Tester formulaires
- [ ] Vérifier responsive design
- [ ] Tester sur mobile
- [ ] `npm run build` sans erreurs
- [ ] Fichier dist créé avec succès
- [ ] Déployer sur plateforme

---

## 🎉 Prêt à Démarrer!

```bash
# Clone / Téléchargement
cd luxcar-rental

# Installation
npm install

# Développement
npm run dev

# Build
npm run build
```

**Bon développement! 🚀**

