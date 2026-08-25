import { formatDate } from '@transcendence/date';
import { useTranslation } from '@transcendence/i18n';
import { Button, Dropdown, type MenuProps, MsnIcon } from '@transcendence/ui';
import type { CSSProperties, JSX } from 'react';
import styles from './SessionCard.module.scss';
import { type Session, TYPE_COLOR, TYPE_ICON, TYPE_LABEL } from './sessions.data';

interface SessionCardProps {
  session: Session;
  archived: boolean;
  onRename: (session: Session) => void;
  onArchive: (session: Session) => void;
  onDelete: (session: Session) => void;
}

export function SessionCard({
  archived,
  onArchive,
  onDelete,
  onRename,
  session,
}: SessionCardProps): JSX.Element {
  const { t } = useTranslation();
  const color = TYPE_COLOR[session.type];

  const loadProject = (): void => {
    const query = new URLSearchParams({
      bpm: String(session.bpm),
      name: session.name,
      projectId: session.id,
    });

    for (const sampleId of session.samples) {
      query.append('sampleId', sampleId);
    }
    window.location.href = `${import.meta.env.VITE_STUDIO_URL}/studio/studio?${query.toString()}`;
  };

  const menuItems: MenuProps['items'] = [
    {
      icon: <MsnIcon name="play" size="12px" />,
      key: 'open',
      label: t('sessions.card.openInEditor'),
      onClick: loadProject,
    },
    {
      icon: <MsnIcon name="settings" size="12px" />,
      key: 'rename',
      label: t('sessions.card.rename'),
      onClick: () => {
        onRename(session);
      },
    },
    {
      icon: <MsnIcon name="download" size="12px" />,
      key: 'export',
      label: t('sessions.card.exportBounce'),
    },
    {
      icon: <MsnIcon name="folder" size="12px" />,
      key: 'archive',
      label: archived ? t('sessions.card.unarchive') : t('sessions.card.archive'),
      onClick: () => {
        onArchive(session);
      },
    },
    { type: 'divider' },
    {
      danger: true,
      icon: <MsnIcon name="bell" size="12px" />,
      key: 'delete',
      label: t('common.delete'),
      onClick: () => {
        onDelete(session);
      },
    },
  ];

  return (
    <div className={styles.card} data-archived={archived}>
      <div className={styles.cover} style={{ '--type-color': color } as CSSProperties}>
        {archived ? (
          <span className={styles.ribbon}>{t('sessions.card.archivedRibbon')}</span>
        ) : null}
        <span className={styles.badge}>
          <MsnIcon name={TYPE_ICON[session.type]} size="11px" /> {t(TYPE_LABEL[session.type])}
        </span>
        <div className={styles.logo}>
          <MsnIcon name={TYPE_ICON[session.type]} size="38px" />
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{session.name}</h3>
          <Dropdown menu={{ items: menuItems }} trigger={['click']} placement="bottomRight">
            <button className={styles.menuButton} aria-label={t('sessions.card.actions')}>
              ⋯
            </button>
          </Dropdown>
        </div>

        <div className={styles.meta}>
          <span>
            {session.bpm ? t('sessions.card.bpm', { bpm: session.bpm }) : t('sessions.card.noBpm')}
          </span>
          <span className={styles.dot}>·</span>
          <span>{session.key ?? '—'}</span>
          <span className={styles.dot}>·</span>
        </div>

        <div className={styles.footer}>
          <span className={styles.edited}>
            {t('sessions.card.edited', { when: formatDate(session.updatedAt) })}
          </span>
          <Button
            size="small"
            type={archived ? 'default' : 'primary'}
            onClick={
              archived
                ? () => {
                    onArchive(session);
                  }
                : loadProject
            }
          >
            {archived ? t('sessions.card.restore') : t('sessions.card.open')}{' '}
            <MsnIcon name="arrowR" size="11px" />
          </Button>
        </div>
      </div>
    </div>
  );
}
