import { Input, Segmented, Select } from '@transcendence/ui';
import type { JSX } from 'react';
import { MsnIcon } from '@ui/components/MsnIcon/MsnIcon';
import { SESS_GENRES, SESS_TYPES, TYPE_ICON } from './sessions.data';
import styles from './SessToolbar.module.scss';

export type SessSort = 'edited' | 'name' | 'bpm';

interface SessToolbarProps {
  query: string;
  setQuery: (v: string) => void;
  type: string;
  setType: (v: string) => void;
  genre: string;
  setGenre: (v: string) => void;
  sort: SessSort;
  setSort: (v: SessSort) => void;
  shown: number;
  total: number;
}

export function SessToolbar(props: SessToolbarProps): JSX.Element {
  const { genre, query, setGenre, setQuery, setSort, setType, shown, sort, total, type } = props;

  return (
    <div className={styles.toolbar}>
      <Input
        className={styles.search}
        allowClear
        prefix={<MsnIcon name="search" size="13px" />}
        placeholder="Search by title…"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />

      <Segmented
        value={type}
        onChange={(v) => {
          setType(v);
        }}
        options={[
          { label: 'All', value: 'all' },
          ...SESS_TYPES.map((t) => ({ icon: <MsnIcon name={TYPE_ICON[t]} size="11px" />, label: t, value: t })),
        ]}
      />

      <Select
        value={genre}
        onChange={setGenre}
        options={[{ label: 'All genres', value: 'all' }, ...SESS_GENRES.map((g) => ({ label: g, value: g }))]}
        style={{ width: 150 }}
      />

      <span className={styles.count}>
        {shown}/{total}
      </span>

      <Select
        value={sort}
        onChange={setSort}
        options={[
          { label: 'Last edited', value: 'edited' },
          { label: 'Name (A→Z)', value: 'name' },
          { label: 'BPM', value: 'bpm' },
        ]}
        style={{ width: 150 }}
      />
    </div>
  );
}
