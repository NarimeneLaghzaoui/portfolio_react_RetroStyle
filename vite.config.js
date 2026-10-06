import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// react-native-web permet de garder les composants React Native (View, Text, Animated…) sur le web.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { 'react-native': 'react-native-web' },
    extensions: ['.web.js', '.web.jsx', '.js', '.jsx', '.json'],
  },
  define: { __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production') },
});
