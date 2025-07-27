import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/NutriCalc/' : '/',
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
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['clsx', 'class-variance-authority']
        }
      }
    }
  },
  preview: {
    port: 3003,
    host: '0.0.0.0'
  }
});