import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@auth': path.resolve(__dirname, '../../packages/auth'),
      '@ui': path.resolve(__dirname, '../../packages/ui'),
    },
  },
  server: {
    port: 5173,
    proxy: { '/api': 'http://localhost:8080' },
    strictPort: true,
  },
});
