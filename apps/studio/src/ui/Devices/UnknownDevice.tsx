import { useTranslation } from '@transcendence/i18n';
import type { JSX } from 'react';

// Fallback when the SDK reports an effect box with no entry in deviceRegistry.
export function UnknownDevice(): JSX.Element {
  const { t } = useTranslation();

  return <div>{t('studio.devices.unknown')}</div>;
}
