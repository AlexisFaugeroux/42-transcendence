import { Select } from '@transcendence/ui';
import type { CSSProperties, JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { LANGUAGE_OPTIONS, toLanguage } from './languages';
import type { Language } from './languages';

interface LanguageSelectProps {
  // The studio header is far denser than the front ones: `compact` renders "EN"
  // instead of "English".
  compact?: boolean;
  size?: 'large' | 'middle' | 'small';
  width?: CSSProperties['width'];
}

export function LanguageSelect({
  compact = false,
  size = 'small',
  width,
}: LanguageSelectProps): JSX.Element {
  const { i18n, t } = useTranslation();

  const options = LANGUAGE_OPTIONS.map((option) => ({
    label: compact ? option.value.toUpperCase() : option.label,
    value: option.value,
  }));

  const onChange = (value: Language) => {
    void i18n.changeLanguage(value);
  };

  return (
    <Select<Language>
      aria-label={t('common.language')}
      onChange={onChange}
      options={options}
      size={size}
      style={{ width: width ?? (compact ? 64 : 104) }}
      title={t('common.language')}
      value={toLanguage(i18n.resolvedLanguage)}
      variant="borderless"
    />
  );
}
