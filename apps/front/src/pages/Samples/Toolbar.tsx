import { Button, Input, MsnIcon, Segmented, Select } from '@transcendence/ui';
import type { JSX } from 'react';
import type { Family, Kind } from '../../types/audioFile';
import { FAMILY_OPTIONS, KIND_OPTIONS } from './helpers';
import styles from './Toolbar.module.scss';
import type { SortKey } from './types';

export type ViewMode = 'list' | 'grid';

interface ToolbarProps {
  query: string;
  setQuery: (v: string) => void;
  families: Family[];
  setFamilies: (v: Family[]) => void;
  kinds: Kind[];
  setKinds: (v: Kind[]) => void;
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
    families,
    favOnly,
    kinds,
    query,
    setFamilies,
    setFavOnly,
    setKinds,
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
        placeholder="Search by name…"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />

      <Select
        mode="multiple"
        allowClear
        maxTagCount="responsive"
        placeholder="All families"
        value={families}
        onChange={setFamilies}
        options={FAMILY_OPTIONS}
        style={{ width: 200 }}
      />

      <Select
        mode="multiple"
        allowClear
        maxTagCount="responsive"
        placeholder="All types"
        value={kinds}
        onChange={setKinds}
        options={KIND_OPTIONS}
        style={{ width: 180 }}
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
