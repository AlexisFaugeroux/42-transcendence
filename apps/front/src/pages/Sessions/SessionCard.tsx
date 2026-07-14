import { Button, Dropdown, type MenuProps, Tag } from '@transcendence/ui';
import type { CSSProperties, JSX } from 'react';
import { MsnIcon } from '@ui/components/MsnIcon/MsnIcon';
import styles from './SessionCard.module.scss';
import { formatSize, type Session, TYPE_COLOR, TYPE_ICON } from './sessions.data';

interface SessionCardProps {
  session: Session;
  archived: boolean;
  onRename: (session: Session) => void;
  onDelete: (session: Session) => void;
}

export function SessionCard({ archived, onDelete, onRename, session }: SessionCardProps): JSX.Element {
  const color = TYPE_COLOR[session.type];

  const menuItems: MenuProps['items'] = [
    { icon: <MsnIcon name="play" size="12px" />, key: 'open', label: 'Open in editor' },
    {
      icon: <MsnIcon name="settings" size="12px" />,
      key: 'rename',
      label: 'Rename',
      onClick: () => {
        onRename(session);
      },
    },
    { icon: <MsnIcon name="download" size="12px" />, key: 'export', label: 'Export bounce' },
    { icon: <MsnIcon name="folder" size="12px" />, key: 'archive', label: archived ? 'Unarchive' : 'Archive' },
    { type: 'divider' },
    {
      danger: true,
      icon: <MsnIcon name="bell" size="12px" />,
      key: 'delete',
      label: 'Delete',
      onClick: () => {
        onDelete(session);
      },
    },
  ];

  return (
    <div className={styles.card} data-archived={archived}>
      <div className={styles.cover} style={{ '--type-color': color } as CSSProperties}>
        {archived ? <span className={styles.ribbon}>archived</span> : null}
        <span className={styles.badge}>
          <MsnIcon name={TYPE_ICON[session.type]} size="11px" /> {session.type}
        </span>
        <div className={styles.logo}>
          <MsnIcon name={TYPE_ICON[session.type]} size="38px" />
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{session.title}</h3>
          <Dropdown menu={{ items: menuItems }} trigger={['click']} placement="bottomRight">
            <button className={styles.menuButton} aria-label="Session actions">
              ⋯
            </button>
          </Dropdown>
        </div>

        <div className={styles.meta}>
          <span>{session.bpm ? `${session.bpm} BPM` : '— BPM'}</span>
          <span className={styles.dot}>·</span>
          <span>{session.key ?? '—'}</span>
          <span className={styles.dot}>·</span>
          <span>{formatSize(session.size)}</span>
        </div>

        <div className={styles.tags}>
          {session.tags.map((t) => (
            <Tag key={t}>#{t}</Tag>
          ))}
        </div>

        <div className={styles.footer}>
          <span className={styles.edited}>Edited {session.edited}</span>
          <Button size="small" type={archived ? 'default' : 'primary'}>
            {archived ? 'Restore' : 'Open'} <MsnIcon name="arrowR" size="11px" />
          </Button>
        </div>
      </div>
    </div>
  );
}
