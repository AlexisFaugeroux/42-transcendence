import { useTranslation } from '@transcendence/i18n';
import { Input, MsnIcon, Select } from '@transcendence/ui';
import type { JSX } from 'react';
import { VISIBILITIES } from '../../types/sample';
import { VISIBILITY_LABEL } from '../Samples/constants';
import {
  TRACK_SORT_LABEL,
  TRACK_SORT_ORDER,
  type TrackSortKey,
  type VisibilityFilter,
} from './constants';
import styles from './Toolbar.module.scss';

interface ToolbarProps {
  query: string;
  setQuery: (value: string) => void;
  visibility: VisibilityFilter;
  setVisibility: (value: VisibilityFilter) => void;
  sort: TrackSortKey;
  setSort: (value: TrackSortKey) => void;
  shownCount: number;
  totalCount: number;
}

export function Toolbar({
  query,
  setQuery,
  setSort,
  setVisibility,
  shownCount,
  sort,
  totalCount,
  visibility,
}: ToolbarProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={styles.toolbar}>
      <Input
        className={styles.search}
        allowClear
        prefix={<MsnIcon name="search" size="13px" />}
        placeholder={t('tracks.toolbar.searchPlaceholder')}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />

      <Select
        value={visibility}
        onChange={setVisibility}
        options={[
          { label: t('tracks.toolbar.allVisibilities'), value: 'all' },
          ...VISIBILITIES.map((value) => ({
            label: t(VISIBILITY_LABEL[value]),
            value,
          })),
        ]}
        style={{ width: 160 }}
      />

      <span className={styles.count}>
        {shownCount}/{totalCount}
      </span>

      <Select
        value={sort}
        onChange={setSort}
        options={TRACK_SORT_ORDER.map((key) => ({
          label: t(TRACK_SORT_LABEL[key]),
          value: key,
        }))}
        style={{ width: 160 }}
      />
    </div>
  );
}
