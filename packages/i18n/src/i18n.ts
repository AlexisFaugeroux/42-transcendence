import { setDateLocale } from "@transcendence/date";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import { FALLBACK_LANGUAGE, SUPPORTED_LANGUAGES } from "./languages";
import en from "./locales/en.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";

export const LOCALE_STORAGE_KEY = "msn.locale";

// `satisfies typeof en` makes en.json the reference: a key present in English
// but missing from fr/es stops the build instead of leaking a raw key on screen.
const resources = {
  en: { translation: en },
  es: { translation: es satisfies typeof en },
  fr: { translation: fr satisfies typeof en },
};

void i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    detection: {
      caches: ["localStorage"],
      lookupLocalStorage: LOCALE_STORAGE_KEY,
      order: ["localStorage", "navigator"],
    },
    fallbackLng: FALLBACK_LANGUAGE,
    // React escapes interpolated values already.
    interpolation: { escapeValue: false },
    // fr-CA, es-419 → the base language we ship.
    load: "languageOnly",
    resources,
    supportedLngs: SUPPORTED_LANGUAGES,
  });

function applyLanguage(language: string) {
  document.documentElement.lang = language;
  setDateLocale(language);
}

i18next.on("languageChanged", applyLanguage);
// The listener never sees the language the detector just picked, so apply it once.
applyLanguage(i18next.resolvedLanguage ?? FALLBACK_LANGUAGE);

export { i18next };
