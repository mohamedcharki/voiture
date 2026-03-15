# ⚡ QUICK START - Démarrage Rapide LUXCAR React

## 🚀 En 3 Étapes (5 minutes)

### 1️⃣ Installation
```bash
npm install
```

### 2️⃣ Démarrage
```bash
npm run dev
```

### 3️⃣ Utiliser
Ouvrez `http://localhost:5173` dans votre navigateur

---

## 📂 Fichiers Clés

| Fichier | Utilité |
|---------|---------|
| `src/App.jsx` | Composant principal |
| `src/main.jsx` | Point d'entrée React |
| `src/components/` | Tous les composants |
| `package.json` | Dépendances npm |
| `index.html` | Template HTML |

---

## 💻 Commandes

```bash
# Développement
npm run dev

# Build production
npm run build

# Prévisualisation
npm run preview

# Port différent
npm run dev -- --port 3000
```

---

## ✏️ Modifier le Contenu

### Numéro de Téléphone
**Fichiers**: `Navigation.jsx`, `ContactSection.jsx`, `WhatsAppButton.jsx`
```javascript
// Avant
href="tel:+212600000000"

// Après
href="tel:+212612345678"
```

### Email
**Fichiers**: `ContactSection.jsx`
```javascript
// Avant
contact@luxcar.ma

// Après
votremail@votresociete.ma
```

### Voitures
**Fichier**: `FleetSection.jsx`
```javascript
const cars = [
  { 
    id: 1, 
    name: 'Nouvelle Voiture', 
    price: 250, 
    category: 'premium' 
  },
  // ...
];
```

### Services
**Fichier**: `ServicesSection.jsx`
```javascript
const services = [
  { 
    icon: 'fas fa-SERVICE', 
    title: 'Mon Service', 
    desc: 'Description' 
  },
  // ...
];
```

---

## 🎨 Personnaliser les Couleurs

**Fichier**: `tailwind.config.js`
```javascript
theme: {
  extend: {
    colors: {
      'mon-rouge': '#ff0000',
    }
  }
}
```

**Utilisation**:
```html
<button className="bg-mon-rouge">Mon Bouton</button>
```

---

## 🔗 Liens Importants

| Ressource | URL |
|-----------|-----|
| React Docs | https://react.dev |
| Tailwind CSS | https://tailwindcss.com |
| Vite | https://vitejs.dev |
| Lucide Icons | https://lucide.dev |
| FontAwesome | https://fontawesome.com |

---

## 🐛 Problèmes Courants

### ❌ Port déjà utilisé
```bash
npm run dev -- --port 3000
```

### ❌ Erreur "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### ❌ Tailwind CSS ne charge pas
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

## 📱 Tester Responsive

1. Appuyez sur `F12` dans votre navigateur
2. Cliquez sur l'icône mobile (ou `Ctrl+Shift+M`)
3. Testez à différentes tailles d'écran

---

## 🚀 Déployer

### Vercel (Recommandé)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Uploadez le dossier 'dist'
```

---

## 🎯 Checklist Avant Production

- [ ] Tous les liens testés
- [ ] Formulaires testés
- [ ] Responsive design ok
- [ ] Coordonnées mises à jour
- [ ] `npm run build` sans erreur
- [ ] Aucun console.log() oublié
- [ ] Images optimisées
- [ ] Performance testée

---

## 📚 Documentation Complète

- **README.md** - Documentation générale
- **INSTALLATION.md** - Guide d'installation
- **STRUCTURE.md** - Structure complète

---

## 👨‍💻 Support Rapide

**VS Code Extensions Utiles:**
- ES7+ React snippets
- Tailwind CSS IntelliSense
- Prettier

**Raccourcis Utiles:**
- `Ctrl+S` - Sauvegarder
- `Ctrl+/` - Commenter
- `F5` - Rafraîchir navigateur

---

## 🎉 Prêt?

```bash
cd luxcar-rental
npm install
npm run dev
```

**C'est tout! Bon développement! 🚀**
