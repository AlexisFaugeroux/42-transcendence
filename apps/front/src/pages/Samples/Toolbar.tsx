import { Button, Input, Segmented, Select } from '@transcendence/ui';
import type { JSX } from 'react';
import { MsnIcon } from '@ui/components/MsnIcon/MsnIcon';
import { SAMPLE_FAMILIES, SAMPLE_KINDS } from './samples.data';
import styles from './Toolbar.module.scss';

export type SortKey = 'recent' | 'name' | 'duration' | 'size' | 'bpm';
export type ViewMode = 'list' | 'grid';

interface ToolbarProps {
  query: string;
  setQuery: (v: string) => void;
  family: string;
  setFamily: (v: string) => void;
  kind: string;
  setKind: (v: string) => void;
  favOnly: boolean;
  setFavOnly: (v: boolean) => void;
  sort: SortKey;
  setSort: (v: SortKey) => void;
  view: ViewMode;
  setView: (v: ViewMode) => void;
  shownCount: number;
  totalCount: number;
}

export function Toolbar(props: ToolbarProps): JSX.Element {
  const {
    family,
    favOnly,
    kind,
    query,
    setFamily,
    setFavOnly,
    setKind,
    setQuery,
    setSort,
    setView,
    shownCount,
    sort,
    totalCount,
    view,
  } = props;

  return (
    <div className={styles.toolbar}>
      <Input
        className={styles.search}
        allowClear
        prefix={<MsnIcon name="search" size="13px" />}
        placeholder="Search by name, pack, tag…"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />

      <Select
        value={family}
        onChange={setFamily}
        options={[{ label: 'All families', value: 'all' }, ...SAMPLE_FAMILIES.map((f) => ({ label: f, value: f }))]}
        style={{ width: 150 }}
      />

      <Select
        value={kind}
        onChange={setKind}
        options={[{ label: 'All types', value: 'all' }, ...SAMPLE_KINDS.map((k) => ({ label: k, value: k }))]}
        style={{ width: 140 }}
      />

      <Button
        type={favOnly ? 'primary' : 'default'}
        onClick={() => {
          setFavOnly(!favOnly);
        }}
      >
        <MsnIcon name="heart" size="11px" /> Favorites
      </Button>

      <span className={styles.count}>
        {shownCount}/{totalCount}
      </span>

      <Select
        value={sort}
        onChange={setSort}
        options={[
          { label: 'Recently added', value: 'recent' },
          { label: 'Name (A→Z)', value: 'name' },
          { label: 'Duration', value: 'duration' },
          { label: 'Size', value: 'size' },
          { label: 'BPM', value: 'bpm' },
        ]}
        style={{ width: 160 }}
      />

      <Segmented
        value={view}
        onChange={(value) => {
          setView(value as ViewMode);
        }}
        options={[
          { icon: <MsnIcon name="list" size="13px" />, value: 'list' },
          { icon: <MsnIcon name="grid" size="13px" />, value: 'grid' },
        ]}
      />
    </div>
  );
}
