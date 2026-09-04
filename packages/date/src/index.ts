import dayjs from 'dayjs';
import type { ConfigType } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import localizedFormat from 'dayjs/plugin/localizedFormat';

// Locales are side-effect imports: loading them registers the locale with dayjs
// but does not activate it. `en` ships built in.
import 'dayjs/locale/es';
import 'dayjs/locale/fr';

dayjs.extend(utc);
dayjs.extend(timezone);
// Gives us the locale-aware format tokens (L, LT, LLL…) that setDateLocale switches.
dayjs.extend(localizedFormat);

export const APP_TIMEZONE = 'Europe/Paris';
dayjs.tz.setDefault(APP_TIMEZONE);

// The timezone is a deliberate property of this package and is NOT tied to the
// UI language: a French user browsing in English still sees Paris time.
export const DATE_LOCALES = ['en', 'es', 'fr'];
const FALLBACK_LOCALE = 'en';

// Accepts anything i18next reports ("fr", "fr-BE", undefined) and keeps dayjs on
// a locale it actually has, so an unknown tag degrades to English rather than
// silently leaving the previous language in place.
export function setDateLocale(locale?: string) {
  const base = locale?.split('-')[0] ?? FALLBACK_LOCALE;
  dayjs.locale(DATE_LOCALES.includes(base) ? base : FALLBACK_LOCALE);
}

export function toAppTime(date?: ConfigType) {
  return dayjs(date).tz(APP_TIMEZONE);
}

export function formatDate(date?: ConfigType, template = 'L LT') {
  return toAppTime(date).format(template);
}

// ISO 8601 avec l'offset Europe/Paris (ex: "2026-07-19T11:45:00+02:00").
export function formatISO(date?: ConfigType) {
  return toAppTime(date).format();
}

export { dayjs };
export type { ConfigType, Dayjs } from 'dayjs';
