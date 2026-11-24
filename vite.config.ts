import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// GitHub Pages serves the site from /<repo-name>/
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_PAGES ? '/dagsverk/' : '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        greidan: resolve(__dirname, 'tillaga/greidan/index.html'),
        manda: resolve(__dirname, 'tillaga/manda/index.html'),
        femina: resolve(__dirname, 'tillaga/femina/index.html'),
      },
    },
  },
});
