import { LanguageSelect, useTranslation } from '@transcendence/i18n';
import { IconBtn, MsnIcon, MsnWordmark, Separator, theme } from '@transcendence/ui';
import type { JSX } from 'react';
import { StudioIcon } from '../components/StudioIcon/StudioIcon';
import styles from './Header.module.scss';
import { Meter } from './Meter/Meter';
import { Metrics } from './Metrics/Metrics';
import { Transport } from './Transport/Transport';

export function Header(): JSX.Element {
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      {/* TODO: must link to sessions page from front app */}
      <a className={styles.sessionsLink} href="">
        <MsnIcon name="msn" size="18px" color={theme.orange} />
        <MsnWordmark size={13} accent="var(--color-orange)" />
      </a>
      <Separator />

      <div className={styles.titleBloc}>
        {/* TODO: Make project name and project state dynamic */}
        <span className={styles.projectPill}>{t('studio.header.project')}</span>
        <span className={styles.projectTitle}>Pipi caca prout</span>
        <span className={styles.projectState}>● {t('studio.header.saved')}</span>
      </div>
      <Separator />

      {/* TODO: implement undo/redo mechanic */}
      <div>
        <IconBtn
          title={t('studio.header.undo')}
          onClick={() => {
            console.log('un-prout');
          }}
        >
          <StudioIcon name="undo" size={14} />
        </IconBtn>
        <IconBtn
          title={t('studio.header.redo')}
          onClick={() => {
            console.log('re-prout');
          }}
        >
          <StudioIcon name="redo" size={14} />
        </IconBtn>
      </div>
      <Separator />

      <Transport />
      <Separator />

      <Metrics />
      <Separator />

      <Meter />
      <Separator />

      <LanguageSelect compact />
    </header>
  );
}
