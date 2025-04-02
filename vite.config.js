import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/tools-collection/',
  build: {
    assetsDir: 'assets',
    emptyOutDir: true,
    cssCodeSplit: false,
  },
});
