import './main.scss';
import '@transcendence/ui/styles/colors_and_type.css';
import { AuthProvider } from '@transcendence/auth';
import { I18nProvider } from '@transcendence/i18n';
import { MsnThemeProvider } from '@transcendence/ui';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import { WebSocketProvider } from './websocket/WebSocketProvider.tsx';
const root = document.getElementById('root');

if (!root) throw new Error('Cannot find root');
createRoot(root).render(
  <StrictMode>
    <MsnThemeProvider>
      <I18nProvider>
        <AuthProvider>
          <WebSocketProvider>
            <App />
          </WebSocketProvider>
        </AuthProvider>
      </I18nProvider>
    </MsnThemeProvider>
  </StrictMode>,
);
