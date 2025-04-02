import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  build: {
    outDir: 'dist', // 将构建输出目
    assetsDir: 'assets',
    emptyOutDir: true,
    cssCodeSplit: false,
  },
});
