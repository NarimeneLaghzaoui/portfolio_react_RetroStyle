import React from 'react';

// Lecteur YouTube intégré via <iframe>.
export default function VideoPlayer({ youtubeId }) {
  const src = `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1&playsinline=1`;

  return (
    <iframe
      src={src}
      title="Vidéo YouTube"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{ width: '100%', height: '100%', border: 0 }}
    />
  );
}
