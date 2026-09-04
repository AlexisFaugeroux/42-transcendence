import { ConfigProvider } from '@transcendence/ui';
import enUS from 'antd/locale/en_US';
import esES from 'antd/locale/es_ES';
import frFR from 'antd/locale/fr_FR';
import type { JSX, ReactNode } from 'react';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { i18next } from './i18n';
import { toLanguage } from './languages';
import type { Language } from './languages';

// antd owns strings our JSON never sees: Table "No data", Pagination, DatePicker.
const ANTD_LOCALES: Record<Language, typeof enUS> = {
  en: enUS,
  es: esES,
  fr: frFR,
};

interface I18nProviderProps {
  children: ReactNode;
}

// Nested antd ConfigProviders merge, so setting `locale` here inherits the theme
// from MsnThemeProvider above it and packages/ui needs no change.
function AntdLocaleProvider({ children }: I18nProviderProps): JSX.Element {
  const { i18n } = useTranslation();

  return (
    <ConfigProvider locale={ANTD_LOCALES[toLanguage(i18n.resolvedLanguage)]}>
      {children}
    </ConfigProvider>
  );
}

export function I18nProvider({ children }: I18nProviderProps): JSX.Element {
  return (
    <I18nextProvider i18n={i18next}>
      <AntdLocaleProvider>{children}</AntdLocaleProvider>
    </I18nextProvider>
  );
}
