import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  base: '/studio/',
  plugins: [react()],
  resolve: {
    alias: {
      '@auth': path.resolve(__dirname, '../../packages/auth'),
      '@ui': path.resolve(__dirname, '../../packages/ui'),
    },
  },
  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
    port: 5174,
    proxy: { '/api': 'http://localhost:8080' },
    strictPort: true,
  },
});
