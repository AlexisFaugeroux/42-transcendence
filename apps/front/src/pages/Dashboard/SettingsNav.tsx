import { MsnIcon } from '@transcendence/ui';
import type { MsnIconLabel } from '@transcendence/ui';
import { type JSX, useEffect, useState } from 'react';
import styles from './SettingsNav.module.scss';

interface NavSection {
  id: string;
  label: string;
  icon: MsnIconLabel;
}

const SECTIONS: NavSection[] = [
  { icon: 'user', id: 'profile', label: 'Profile' },
  { icon: 'settings', id: 'account', label: 'Account' },
  { icon: 'bell', id: 'danger', label: 'Danger zone' },
];

export function SettingsNav(): JSX.Element {
  const [activeId, setActiveId] = useState('profile');

  // Watch the three <section> elements and highlight whichever is most in view.
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
      <div className={styles.label}>Settings</div>
      <nav className={styles.nav}>
        {SECTIONS.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`${styles.item} ${activeId === section.id ? styles.active : ''}`}
          >
            <MsnIcon name={section.icon} size="13px" /> {section.label}
          </a>
        ))}
      </nav>
    </>
  );
}
