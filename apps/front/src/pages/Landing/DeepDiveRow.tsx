import { useTranslation } from '@transcendence/i18n';
import { MsnIcon } from '@transcendence/ui';
import type { JSX } from 'react';
import styles from './DeepDiveRow.module.scss';
import { ImagePlaceholder } from './ImagePlaceholder';
import type { DeepDive } from './landing.data';

interface DeepDiveRowProps extends DeepDive {
  reverse: boolean;
}

export function DeepDiveRow({
  accent,
  bodyKey,
  eyebrowKey,
  image,
  reverse,
  titleKey,
}: DeepDiveRowProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={`${styles.row} ${reverse ? styles.reverse : ''}`}>
      <div className={styles.text}>
        <div className={styles.eyebrow} style={{ color: accent }}>
          {t(eyebrowKey)}
        </div>
        <h3 className={styles.title}>{t(titleKey)}</h3>
        <p className={styles.body}>{t(bodyKey)}</p>
        <a href="#" className={styles.more} style={{ color: accent }}>
          {t('landing.deepDives.learnMore')} <MsnIcon name="arrowR" size="11px" />
        </a>
      </div>
      <div className={styles.art}>
        <ImagePlaceholder label={image} height={300} accent={accent} />
      </div>
    </div>
  );
}
