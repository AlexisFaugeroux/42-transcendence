import { type TranslationKey, useTranslation } from '@transcendence/i18n';
import { MsnIcon } from '@transcendence/ui';
import type { MsnIconLabel } from '@transcendence/ui';
import { type JSX, useEffect, useState } from 'react';
import styles from './SettingsNav.module.scss';

interface NavSection {
  id: string;
  labelKey: TranslationKey;
  icon: MsnIconLabel;
}

const SECTIONS: NavSection[] = [
  { icon: 'user', id: 'profile', labelKey: 'settings.nav.profile' },
  { icon: 'settings', id: 'account', labelKey: 'settings.nav.account' },
  { icon: 'folder', id: 'apiKeys', labelKey: 'settings.nav.apiKeys' },
  { icon: 'bell', id: 'danger', labelKey: 'settings.nav.danger' },
];

export function SettingsNav(): JSX.Element {
  const [activeId, setActiveId] = useState('profile');
  const { t } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0.1, 0.3, 0.6] },
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className={styles.label}>{t('settings.nav.label')}</div>
      <nav className={styles.nav}>
        {SECTIONS.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`${styles.item} ${activeId === section.id ? styles.active : ''}`}
          >
            <MsnIcon name={section.icon} size="13px" /> {t(section.labelKey)}
          </a>
        ))}
      </nav>
    </>
  );
}
