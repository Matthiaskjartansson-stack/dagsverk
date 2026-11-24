import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// Served from the custom domain dagsverk.is (public/CNAME), so assets live at the root.
export default defineConfig({
  plugins: [react()],
  base: '/',
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
