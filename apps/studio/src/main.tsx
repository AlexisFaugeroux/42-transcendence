import './main.scss';
import '@transcendence/ui/styles/colors_and_type.css';
import { MsnThemeProvider } from '@transcendence/ui';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

createRoot(root).render(
  <StrictMode>
    <MsnThemeProvider>
      <App />
    </MsnThemeProvider>
  </StrictMode>,
);
