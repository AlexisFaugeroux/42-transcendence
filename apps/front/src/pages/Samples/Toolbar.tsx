import { useTranslation } from '@transcendence/i18n';
import { Input, MsnIcon, Segmented, Select } from '@transcendence/ui';
import type { JSX } from 'react';
import type { Family, Kind } from '../../types/sample';
import { SORT_LABEL } from './constants';
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
  sort: SortKey;
  setSort: (v: SortKey) => void;
  view: ViewMode;
  setView: (v: ViewMode) => void;
  shownCount: number;
  totalCount: number;
}

const SORT_ORDER: SortKey[] = ['recent', 'name', 'duration', 'size', 'bpm'];

export function Toolbar(props: ToolbarProps): JSX.Element {
  const {
    families,
    kinds,
    query,
    setFamilies,
    setKinds,
    setQuery,
    setSort,
    setView,
    shownCount,
    sort,
    totalCount,
    view,
  } = props;
  const { t } = useTranslation();

  return (
    <div className={styles.toolbar}>
      <Input
        className={styles.search}
        allowClear
        prefix={<MsnIcon name="search" size="13px" />}
        placeholder={t('samples.toolbar.searchPlaceholder')}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />

      <Select
        mode="multiple"
        allowClear
        maxTagCount="responsive"
        placeholder={t('samples.toolbar.allFamilies')}
        value={families}
        onChange={setFamilies}
        options={FAMILY_OPTIONS}
        style={{ width: 200 }}
      />

      <Select
        mode="multiple"
        allowClear
        maxTagCount="responsive"
        placeholder={t('samples.toolbar.allTypes')}
        value={kinds}
        onChange={setKinds}
        options={KIND_OPTIONS}
        style={{ width: 180 }}
      />

      <span className={styles.count}>
        {shownCount}/{totalCount}
      </span>

      <Select
        value={sort}
        onChange={setSort}
        options={SORT_ORDER.map((key) => ({ label: t(SORT_LABEL[key]), value: key }))}
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
