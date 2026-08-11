import { useTranslation } from '@transcendence/i18n';
import { MsnIcon, Tag } from '@transcendence/ui';
import type { JSX } from 'react';
import type { SessionType } from './home.data';
import styles from './SessionCard.module.scss';
import { useState } from 'react';
import { NewSessionModal } from '../Sessions/NewSessionModal';

export function SessionCard({ blurbKey, color, icon, metaKeys, titleKey }: SessionType): JSX.Element {
  const [newOpen, setNewOpen] = useState(false);

  const { t } = useTranslation();
  
  return (
    <div>
      <NewSessionModal
        open={newOpen}
        onClose={() => {
          setNewOpen(false);
        }}
      />
    <button
      className={styles.card}
      onClick={() => {setNewOpen(true)}}
    >
      <div className={styles.top}>
        <div className={styles.iconBox} style={{ color }}>
          <MsnIcon name={icon} size="22px" />
        </div>
        <MsnIcon name="arrowR" size="18px" color="hsl(0, 0%, 38%)" />
      </div>
      <div>
        <div className={styles.title}>{t(titleKey)}</div>
        <p className={styles.blurb}>{t(blurbKey)}</p>
      </div>
      <div className={styles.tags}>
        {metaKeys.map((metaKey) => (
          <Tag key={metaKey} color={color}>
            {t(metaKey)}
          </Tag>
        ))}
      </div>
    </button>
    </div>
  );
}
