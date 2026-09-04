import type { ParseKeys } from 'i18next';
import type en from './locales/en.json';

// A valid dotted key of en.json. Static data files store one of these instead of
// a string, so a stale key is a compile error rather than text rendered raw.
export type TranslationKey = ParseKeys;

export { I18nProvider } from './I18nProvider';
export { LanguageSelect } from './LanguageSelect';
export { i18next, LOCALE_STORAGE_KEY } from './i18n';
export { FALLBACK_LANGUAGE, LANGUAGE_OPTIONS, SUPPORTED_LANGUAGES, toLanguage } from './languages';
export type { Language } from './languages';
export { Trans, useTranslation } from 'react-i18next';

// Declared here rather than in a standalone i18next.d.ts: a .d.ts that nothing
// imports is never pulled into an app's program, so the types would do nothing.
declare module 'i18next' {
  interface CustomTypeOptions {
    resources: { translation: typeof en };
  }
}
