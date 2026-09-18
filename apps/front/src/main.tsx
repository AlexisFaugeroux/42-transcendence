import './disableProductionConsole';
import './main.scss';
import '@transcendence/ui/styles/colors_and_type.css';
import { AuthProvider } from '@transcendence/auth';
import { I18nProvider } from '@transcendence/i18n';
import { MsnThemeProvider } from '@transcendence/ui';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
const root = document.getElementById('root');

if (!root) throw new Error('Cannot find root');
createRoot(root).render(
  <StrictMode>
    <MsnThemeProvider>
      <I18nProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </I18nProvider>
    </MsnThemeProvider>
  </StrictMode>,
);
