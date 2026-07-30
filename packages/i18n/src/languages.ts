// Labels are written in their own language so a visitor who cannot read the
// current UI can still find theirs.
export const LANGUAGE_OPTIONS = [
  { label: "English", value: "en" },
  { label: "Français", value: "fr" },
  { label: "Español", value: "es" },
] as const;

export type Language = (typeof LANGUAGE_OPTIONS)[number]["value"];

export const SUPPORTED_LANGUAGES: Language[] = LANGUAGE_OPTIONS.map(
  (option) => option.value,
);

export const FALLBACK_LANGUAGE: Language = "en";

export function toLanguage(value: string | undefined): Language {
  return (
    LANGUAGE_OPTIONS.find((option) => option.value === value)?.value ??
    FALLBACK_LANGUAGE
  );
}
