import { useTranslation } from '@transcendence/i18n';
import { Input, MsnIcon, Segmented, Select } from '@transcendence/ui';
import type { JSX } from 'react';
import { SESS_GENRES, SESS_TYPES, type SessSort, SORT_LABEL, TYPE_ICON, TYPE_LABEL } from './sessions.data';
import styles from './SessToolbar.module.scss';

export type { SessSort } from './sessions.data';

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

const SORT_ORDER: SessSort[] = ['edited', 'name', 'bpm'];

export function SessToolbar(props: SessToolbarProps): JSX.Element {
  const { genre, query, setGenre, setQuery, setSort, setType, shown, sort, total, type } = props;
  const { t } = useTranslation();

  return (
    <div className={styles.toolbar}>
      <Input
        className={styles.search}
        allowClear
        prefix={<MsnIcon name="search" size="13px" />}
        placeholder={t('sessions.toolbar.searchPlaceholder')}
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
          { label: t('sessions.toolbar.all'), value: 'all' },
          ...SESS_TYPES.map((sessionType) => ({
            icon: <MsnIcon name={TYPE_ICON[sessionType]} size="11px" />,
            label: t(TYPE_LABEL[sessionType]),
            value: sessionType,
          })),
        ]}
      />

      <Select
        value={genre}
        onChange={setGenre}
        options={[
          { label: t('sessions.toolbar.allGenres'), value: 'all' },
          ...SESS_GENRES.map((g) => ({ label: g, value: g })),
        ]}
        style={{ width: 150 }}
      />

      <span className={styles.count}>
        {shown}/{total}
      </span>

      <Select
        value={sort}
        onChange={setSort}
        options={SORT_ORDER.map((key) => ({ label: t(SORT_LABEL[key]), value: key }))}
        style={{ width: 150 }}
      />
    </div>
  );
}
