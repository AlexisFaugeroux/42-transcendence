import './main.scss';
import '@transcendence/ui/styles/colors_and_type.css';
import { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { MsnThemeProvider } from '@transcendence/ui';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from '@auth/src/AuthContext';
import App from './App.tsx';

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');
const queryClient = new QueryClient();

createRoot(root).render(
  <StrictMode>
    <MsnThemeProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </AuthProvider>
    </MsnThemeProvider>
  </StrictMode>,
);
