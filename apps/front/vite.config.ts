import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:8080',
      '/audio': 'http://localhost:8081',
      '/avatars': 'http://localhost:8081',
    },
    strictPort: true,
  },
});
