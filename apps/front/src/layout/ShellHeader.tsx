import { useAuthUser } from '@transcendence/auth';
import { LanguageSelect, useTranslation } from '@transcendence/i18n';
import { MsnIcon, MsnWordmark } from '@transcendence/ui';
import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import { HeaderIconButton } from '../components/HeaderIconButton/HeaderIconButton';
import { StatusAvatar } from '../components/StatusAvatar/StatusAvatar';
import styles from './ShellHeader.module.scss';

export function ShellHeader(): JSX.Element {
  const me = useAuthUser();
  const { t } = useTranslation();

  return (
    <header className={styles.header}>
      <Link to="/home" className={styles.brand}>
        <MsnIcon name="msn" size="20px" color="var(--color-orange)" />
        <MsnWordmark size={15} accent="var(--color-orange)" />
      </Link>

      <div className={styles.right}>
        <LanguageSelect />
        <HeaderIconButton label={t('header.notifications')}>
          <MsnIcon name="bell" size="16px" />
        </HeaderIconButton>
        <Link to="/settings" className={styles.me}>
          <StatusAvatar name={me.artistName} size={28} status="online" />
          <span>@{me.handle}</span>
        </Link>
      </div>
    </header>
  );
}
