// ✏️ Modifie tout ce qui est ici : c'est le seul fichier à toucher pour personnaliser le portfolio.

export const PROFILE = {
  firstName: 'Narimene',
  lastName: 'Laghzaoui',
  role: 'Développeuse & créatrice 3D',
  status: "Je code le jour, je modélise en 3D la nuit. (Je dors parfois.)",
  about:
    "Passionnée par le développement et la création 3D, je conçois des interfaces soignées et des univers visuels que je partage sur ma chaîne YouTube. J'aime transformer une idée en quelque chose qu'on peut voir, toucher et utiliser.",
};

export const LINKS = {
  github: 'https://github.com/NarimeneLaghzaoui',
  linkedin: 'https://www.youtube.com/@NarimeneLaghzaoui',
  youtube: 'https://www.youtube.com/@NarimeneLaghzaoui',
};

// ID de la vidéo YouTube : dans https://www.youtube.com/watch?v=dQw4w9WgXcQ → "dQw4w9WgXcQ"
export const VIDEO = {
  youtubeId: '4oqY1GuFqRQ',
  title: 'Projet 3D',
  description:
    'Un aperçu de mon dernier projet 3D : modélisation, texturing et rendu, de la première esquisse à la scène finale.',
  tools: ['Blender', 'Substance Painter', 'Unity'],
};

export const SKILLS = [
  { group: 'Développement', items: [['React Native', 85], ['JavaScript', 85], ['HTML / CSS', 90], ['Git', 75]] },
  { group: '3D & Création', items: [['Blender', 80], ['Texturing', 70], ['Montage vidéo', 75]] },
  { group: 'Soft skills', items: [['Créativité', 95], ['Autonomie', 85], ['Travail en équipe', 85]] },
];

export const PROJECTS = [
  { title: 'Portfolio néon', tag: 'React Native', text: 'Ce site : Expo, animations au scroll et mascotte pixel art.' },
  { title: 'Scène 3D YouTube', tag: 'Blender', text: 'Projet 3D complet présenté en vidéo sur ma chaîne.' },
  { title: 'Ton projet ici', tag: 'À compléter', text: 'Ajoute tes projets dans src/data.js.' },
];
