import { defineConfig } from 'vite';

export default defineConfig({
  base: '/NutriCalc/',
  plugins: [],
  esbuild: {
    jsx: 'automatic'
  },
  server: {
    host: '0.0.0.0',
    port: 3002,
    open: false
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});