import { Button, MsnIcon } from '@transcendence/ui';
import { type JSX, useMemo, useState } from 'react';
import { AppHeader } from '../../components/AppHeader/AppHeader';
import { DeleteSessionModal } from './DeleteSessionModal';
import { NewSessionModal } from './NewSessionModal';
import { RenameSessionModal } from './RenameSessionModal';
import { SessionGrid } from './SessionGrid';
import { type Session, SESSIONS } from './sessions.data';
import styles from './Sessions.module.scss';
import { SessionsEmpty, SessionsNoMatches } from './SessionsEmpty';
import { type SessSort, SessToolbar } from './SessToolbar';

type Bucket = 'owned' | 'archived';

export function Sessions(): JSX.Element {
  const [bucket, setBucket] = useState<Bucket>('owned');
  const [query, setQuery] = useState('');
  const [type, setType] = useState('all');
  const [genre, setGenre] = useState('all');
  const [sort, setSort] = useState<SessSort>('edited');
  const [newOpen, setNewOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<Session | null>(null);
  const [renameTarget, setRenameTarget] = useState<Session | null>(null);

  const counts = {
    archived: SESSIONS.filter((s) => s.archived).length,
    owned: SESSIONS.filter((s) => !s.archived).length,
  };

  const TABS: { value: Bucket; label: string }[] = [
    { label: 'Owned by me', value: 'owned' },
    { label: 'Archived', value: 'archived' },
  ];

  const filtered = useMemo(() => {
    let list = SESSIONS.filter((s) => (bucket === 'archived' ? s.archived : !s.archived));
    const q = query.trim().toLowerCase();
    if (q) list = list.filter((r) => r.title.toLowerCase().includes(q));
    if (type !== 'all') list = list.filter((r) => r.type === type);
    if (genre !== 'all') list = list.filter((r) => r.tags.includes(genre));

    list.sort((a, b) => {
      switch (sort) {
        case 'name':
          return a.title.localeCompare(b.title);
        case 'bpm':
          return (a.bpm ?? 999) - (b.bpm ?? 999);
        default:
          return b.editedAt.localeCompare(a.editedAt); // 'edited' (newest first)
      }
    });
    return list;
  }, [bucket, query, type, genre, sort]);

  const clearFilters = (): void => {
    setQuery('');
    setType('all');
    setGenre('all');
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
      <AppHeader active="sessions" />

      <div className={styles.container}>
        <div className={styles.titleRow}>
          <div>
            <div className={styles.eyebrow}>Workspace</div>
            <h1 className={styles.title}>My sessions</h1>
            <p className={styles.subtitle}>
              {counts.owned} active · {counts.archived} archived
            </p>
          </div>
          <Button type="primary" size="large" onClick={openNew}>
            <MsnIcon name="plus" size="13px" /> New session
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
              {tab.label}
              <span className={styles.tabCount}>{counts[tab.value]}</span>
            </button>
          ))}
        </div>

        <SessToolbar
          query={query}
          setQuery={setQuery}
          type={type}
          setType={setType}
          genre={genre}
          setGenre={setGenre}
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
        onCancel={() => {
          setConfirmDelete(null);
        }}
        onConfirm={() => {
          setConfirmDelete(null);
        }}
      />
      <RenameSessionModal
        session={renameTarget}
        onCancel={() => {
          setRenameTarget(null);
        }}
        onConfirm={() => {
          setRenameTarget(null);
        }}
      />
    </div>
  );
}
