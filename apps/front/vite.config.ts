import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:8080',
      '/api/ws': {
        target: 'ws://localhost:8080',
        ws: true,
      },
      '/avatars': 'http://localhost:8081',
      '/documentation': 'http://localhost:8080',
      '/samples': 'http://localhost:8081',
      // Media files under /tracks/… — not the SPA page GET /tracks (Accept: text/html).
      '/tracks': {
        bypass(req) {
          if (req.headers.accept?.includes('text/html')) {
            return '/index.html';
          }
        },
        target: 'http://localhost:8081',
      },
    },
    strictPort: true,
  },
});
