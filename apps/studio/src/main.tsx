import './disableProductionConsole';
import './main.scss';
import '@transcendence/ui/styles/colors_and_type.css';
import { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@transcendence/auth';
import { I18nProvider } from '@transcendence/i18n';
import { MsnThemeProvider } from '@transcendence/ui';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');
const queryClient = new QueryClient();

createRoot(root).render(
  <StrictMode>
    <MsnThemeProvider>
      <I18nProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </AuthProvider>
      </I18nProvider>
    </MsnThemeProvider>
  </StrictMode>,
);
