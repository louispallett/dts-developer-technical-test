import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import macrosPlugin from 'vite-plugin-babel-macros';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [macrosPlugin(), react()],
  server: {
    port: 3001,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000/',
    //     changeOrigin: true,
    //     secure: false,
    //     ws: true,
    //   },
    // }    
  },
});