import { Button } from '@transcendence/ui';
import { type JSX, type Key, useMemo, useState } from 'react';
import { MsnIcon } from '@ui/components/MsnIcon/MsnIcon';
import { AppHeader } from '../../components/AppHeader/AppHeader';
import { DeleteSampleModal, type DeleteTarget } from './DeleteSampleModal';
import { EmptyState } from './EmptyState';
import { SampleGrid } from './SampleGrid';
import { parseDur, SAMPLES, STORAGE_LIMIT_GB } from './samples.data';
import styles from './Samples.module.scss';
import { SampleTable } from './SampleTable';
import { SelectionBar } from './SelectionBar';
import { StorageBar } from './StorageBar';
import { type SortKey, Toolbar, type ViewMode } from './Toolbar';
import { UploadModal } from './UploadModal';

export function Samples(): JSX.Element {
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const [family, setFamily] = useState('all');
  const [kind, setKind] = useState('all');
  const [favOnly, setFavOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>('recent');
  const [view, setView] = useState<ViewMode>('list');
  const [confirmDelete, setConfirmDelete] = useState<DeleteTarget>(null);
  const [uploadOpen, setUploadOpen] = useState(false);

  const usedMB = Math.round(SAMPLES.reduce((acc, s) => acc + s.size, 0));

  const filtered = useMemo(() => {
    let rows = SAMPLES.slice();
    const q = query.trim().toLowerCase();
    if (q) {
      rows = rows.filter(
        (r) =>
          r.name.toLowerCase().includes(q) || r.pack.toLowerCase().includes(q) || r.tags.some((t) => t.includes(q)),
      );
    }
    if (family !== 'all') rows = rows.filter((r) => r.family === family);
    if (kind !== 'all') rows = rows.filter((r) => r.kind === kind);
    if (favOnly) rows = rows.filter((r) => r.fav);

    rows.sort((a, b) => {
      switch (sort) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'duration':
          return parseDur(a.dur) - parseDur(b.dur);
        case 'size':
          return b.size - a.size;
        case 'bpm':
          return (a.bpm ?? 999) - (b.bpm ?? 999);
        default:
          return SAMPLES.indexOf(a) - SAMPLES.indexOf(b); // 'recent'
      }
    });
    return rows;
  }, [query, family, kind, favOnly, sort]);

  const togglePlay = (id: number): void => {
    setPlayingId((prev) => (prev === id ? null : id));
  };

  const clearFilters = (): void => {
    setQuery('');
    setFamily('all');
    setKind('all');
    setFavOnly(false);
  };

  const confirmDeletion = (): void => {
    // TODO (backend): delete the file(s) here.
    setConfirmDelete(null);
    setSelectedKeys([]);
  };

  return (
    <div className={styles.page}>
      <AppHeader active="library" />
      <div className={styles.container}>
        <div className={styles.titleRow}>
          <div>
            <div className={styles.eyebrow}>Library</div>
            <h1 className={styles.title}>Samples</h1>
            <p className={styles.subtitle}>
              {SAMPLES.length} sounds · {usedMB} MB used of {STORAGE_LIMIT_GB} GB
            </p>
          </div>
          <div className={styles.actions}>
            <Button size="large">
              <MsnIcon name="folder" size="13px" /> New folder
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={() => {
                setUploadOpen(true);
              }}
            >
              <MsnIcon name="plus" size="13px" /> Add sample
            </Button>
          </div>
        </div>

        <StorageBar />

        <Toolbar
          query={query}
          setQuery={setQuery}
          family={family}
          setFamily={setFamily}
          kind={kind}
          setKind={setKind}
          favOnly={favOnly}
          setFavOnly={setFavOnly}
          sort={sort}
          setSort={setSort}
          view={view}
          setView={setView}
          shownCount={filtered.length}
          totalCount={SAMPLES.length}
        />

        {selectedKeys.length > 0 && (
          <SelectionBar
            count={selectedKeys.length}
            onClear={() => {
              setSelectedKeys([]);
            }}
            onDelete={() => {
              setConfirmDelete('selection');
            }}
          />
        )}

        {filtered.length === 0 ? (
          <EmptyState onClear={clearFilters} />
        ) : view === 'list' ? (
          <SampleTable
            rows={filtered}
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
            playingId={playingId}
            onPlay={togglePlay}
            onDelete={(sample) => {
              setConfirmDelete(sample);
            }}
          />
        ) : (
          <SampleGrid
            rows={filtered}
            playingId={playingId}
            onPlay={togglePlay}
            onDelete={(sample) => {
              setConfirmDelete(sample);
            }}
          />
        )}
      </div>

      <DeleteSampleModal
        target={confirmDelete}
        selectedCount={selectedKeys.length}
        onCancel={() => {
          setConfirmDelete(null);
        }}
        onConfirm={confirmDeletion}
      />
      <UploadModal
        open={uploadOpen}
        onClose={() => {
          setUploadOpen(false);
        }}
        usedMB={usedMB}
      />
    </div>
  );
}
