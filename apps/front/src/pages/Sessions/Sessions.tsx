import { type TranslationKey, useTranslation } from '@transcendence/i18n';
import {
  Button,
  CheckCircleOutlined,
  CloseCircleOutlined,
  MsnIcon,
  notification,
} from '@transcendence/ui';
import { type JSX, useMemo, useState } from 'react';
import { useDeleteSession, useSavedSessions, useUpdateSession } from '../../hooks/useSavedSessions';
import { DeleteSessionModal } from './DeleteSessionModal';
import { NewSessionModal } from './NewSessionModal';
import { RenameSessionModal } from './RenameSessionModal';
import { SessionGrid } from './SessionGrid';
import { type Session, type SessSort } from './sessions.data';
import styles from './Sessions.module.scss';
import { SessionsEmpty, SessionsNoMatches } from './SessionsEmpty';
import { SessToolbar } from './SessToolbar';

type Bucket = 'owned' | 'archived';

const TABS: { value: Bucket; labelKey: TranslationKey }[] = [
  { labelKey: 'sessions.tabs.owned', value: 'owned' },
  { labelKey: 'sessions.tabs.archived', value: 'archived' },
];

export function Sessions(): JSX.Element {
  const { t } = useTranslation();
  const [bucket, setBucket] = useState<Bucket>('owned');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SessSort>('edited');
  const [newOpen, setNewOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<Session | null>(null);
  const [renameTarget, setRenameTarget] = useState<Session | null>(null);
  const [notificationApi, notificationContext] = notification.useNotification();
  const { data, error, isError } = useSavedSessions();
  const deleteSession = useDeleteSession();
  const updateSession = useUpdateSession();

  if (isError) throw error;

  const notifyError = (message: string, description: string): void => {
    notificationApi.error({ description, icon: <CloseCircleOutlined />, message });
  };

  const notifySuccess = (message: string, description: string): void => {
    notificationApi.success({ description, icon: <CheckCircleOutlined />, message });
  };

  const confirmDeletion = (): void => {
    if (!confirmDelete) return;

    const name = confirmDelete.name;
    deleteSession.mutate(confirmDelete.id, {
      onError: (err) => {
        notifyError(t('sessions.delete.errorTitle'), err.message);
      },
      onSuccess: () => {
        notifySuccess(
          t('sessions.delete.successTitle'),
          t('sessions.delete.successDescription', { name }),
        );
        setConfirmDelete(null);
      },
    });
  };

  const confirmRename = (name: string): void => {
    if (!renameTarget) return;

    updateSession.mutate(
      { fields: { name }, id: renameTarget.id },
      {
        onError: (err) => {
          notifyError(t('sessions.rename.errorTitle'), err.message);
        },
        onSuccess: () => {
          notifySuccess(
            t('sessions.rename.successTitle'),
            t('sessions.rename.successDescription', { name }),
          );
          setRenameTarget(null);
        },
      },
    );
  };

  const handleArchive = (session: Session): void => {
    const nextArchived = !session.archived;
    updateSession.mutate(
      { fields: { archived: nextArchived }, id: session.id },
      {
        onError: (err) => {
          notifyError(t('sessions.archive.errorTitle'), err.message);
        },
        onSuccess: () => {
          notifySuccess(
            nextArchived
              ? t('sessions.archive.successTitle')
              : t('sessions.archive.unarchiveSuccessTitle'),
            nextArchived
              ? t('sessions.archive.successDescription', { name: session.name })
              : t('sessions.archive.unarchiveSuccessDescription', { name: session.name }),
          );
        },
      },
    );
  };

  const counts = {
    archived: (data ?? []).filter((s) => s.archived).length,
    owned: (data ?? []).filter((s) => !s.archived).length,
  };

  const filtered = useMemo(() => {
    let list = (data ?? []).filter((s) => (bucket === 'archived' ? s.archived : !s.archived));
    const q = query.trim().toLowerCase();
    if (q) list = list.filter((r) => r.name.toLowerCase().includes(q));

    list.sort((a, b) => {
      switch (sort) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'bpm':
          return a.bpm - b.bpm;
        default:
          return b.updatedAt.localeCompare(a.updatedAt); // 'edited' (newest first)
      }
    });
    return list;
  }, [bucket, data, query, sort]);

  const clearFilters = (): void => {
    setQuery('');
  };

  const openNew = (): void => {
    setNewOpen(true);
  };
  const handleRename = (s: Session): void => {
    setRenameTarget(s);
  };
  const handleDelete = (s: Session): void => {
    setConfirmDelete(s);
  };

  return (
    <div className={styles.page}>
      {notificationContext}
      <div className={styles.container}>
        <div className={styles.titleRow}>
          <div>
            <div className={styles.eyebrow}>{t('nav.workspace')}</div>
            <h1 className={styles.title}>{t('sessions.title')}</h1>
            <p className={styles.subtitle}>
              {t('sessions.counts', { active: counts.owned, archived: counts.archived })}
            </p>
          </div>
          <Button type="primary" size="large" onClick={openNew}>
            <MsnIcon name="plus" size="13px" /> {t('sessions.newSession')}
          </Button>
        </div>

        <div className={styles.tabs}>
          {TABS.map((tab) => (
            <button
              key={tab.value}
              className={`${styles.tab} ${bucket === tab.value ? styles.tabActive : ''}`}
              onClick={() => {
                setBucket(tab.value);
              }}
            >
              {t(tab.labelKey)}
              <span className={styles.tabCount}>{counts[tab.value]}</span>
            </button>
          ))}
        </div>

        <SessToolbar
          query={query}
          setQuery={setQuery}
          sort={sort}
          setSort={setSort}
          shown={filtered.length}
          total={counts[bucket]}
        />

        {filtered.length === 0 ? (
          counts[bucket] === 0 ? (
            <SessionsEmpty bucket={bucket} onNew={openNew} />
          ) : (
            <SessionsNoMatches onClear={clearFilters} />
          )
        ) : (
          <SessionGrid
            rows={filtered}
            archived={bucket === 'archived'}
            onRename={handleRename}
            onArchive={handleArchive}
            onDelete={handleDelete}
          />
        )}
      </div>

      <NewSessionModal
        open={newOpen}
        onClose={() => {
          setNewOpen(false);
        }}
      />
      <DeleteSessionModal
        session={confirmDelete}
        confirmLoading={deleteSession.isPending}
        onCancel={() => {
          setConfirmDelete(null);
        }}
        onConfirm={confirmDeletion}
      />
      <RenameSessionModal
        session={renameTarget}
        confirmLoading={updateSession.isPending}
        onCancel={() => {
          setRenameTarget(null);
        }}
        onConfirm={confirmRename}
      />
    </div>
  );
}
