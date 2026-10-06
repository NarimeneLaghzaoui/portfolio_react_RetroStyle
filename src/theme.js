import { Platform } from 'react-native';

export const COLORS = {
  bg: '#140F1C',
  bg2: '#1E1528',
  panel: '#1C2230',
  pink: '#F06BAE',
  pinkSoft: '#F7B6CF',
  cyan: '#6FE3F0',
  text: '#F3E9F1',
  muted: '#A898B4',
  grid: 'rgba(240,107,174,0.07)',
};

export const FONTS = {
  pixel: Platform.select({ web: "'Press Start 2P', monospace", ios: 'Menlo', default: 'monospace' }),
  display: Platform.select({ web: "'Orbitron', sans-serif", ios: 'Avenir Next', default: 'sans-serif-medium' }),
  body: Platform.select({ web: "'Space Grotesk', system-ui, sans-serif", default: undefined }),
};

// Sur le web, on charge les polices Google ; sur mobile, les polices système prennent le relais.
export function loadWebFonts() {
  if (Platform.OS !== 'web' || typeof document === 'undefined') return;
  if (document.getElementById('portfolio-fonts')) return;
  const link = document.createElement('link');
  link.id = 'portfolio-fonts';
  link.rel = 'stylesheet';
  link.href =
    'https://fonts.googleapis.com/css2?family=Orbitron:wght@500;800&family=Press+Start+2P&family=Space+Grotesk:wght@400;500&display=swap';
  document.head.appendChild(link);
}

export const glow = (color) =>
  Platform.select({
    web: { boxShadow: `0 0 18px ${color}66, inset 0 0 12px ${color}22` },
    default: { shadowColor: color, shadowOpacity: 0.6, shadowRadius: 12, shadowOffset: { width: 0, height: 0 }, elevation: 6 },
  });

export const textGlow = (color) => ({
  textShadowColor: color,
  textShadowRadius: 12,
  textShadowOffset: { width: 0, height: 0 },
});
