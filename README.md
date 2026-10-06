# Portfolio – Narimene Laghzaoui

Portfolio néon en **React + Vite** (composants via `react-native-web`), déployé sur Vercel.

## Personnaliser
Tout se modifie dans **`src/data.js`** : textes, liens GitHub / LinkedIn / YouTube, ID de la vidéo 3D, compétences, projets.

## Lancer
```bash
npm install
npm run dev        # serveur local sur http://localhost:5173
```

## Mettre en ligne
Pousse le dépôt sur GitHub puis importe-le dans Vercel : le preset **Vite** est détecté automatiquement
(build `npm run build`, dossier de sortie `dist/`).

## Structure
- `src/App.jsx` – les sections (accueil, présentation, compétences, vidéo, projets, contact)
- `src/PixelCat.jsx` – la mascotte robot qui suit le scroll (clic = retour en haut)
- `src/VideoPlayer.jsx` – lecteur YouTube (iframe)
- `src/theme.js` – couleurs et polices
