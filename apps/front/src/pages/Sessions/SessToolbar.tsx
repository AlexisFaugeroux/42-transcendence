import { useTranslation } from '@transcendence/i18n';
import { Input, MsnIcon, Select } from '@transcendence/ui';
import type { JSX } from 'react';
import { type SessSort, SORT_LABEL } from './sessions.data';
import styles from './SessToolbar.module.scss';

export type { SessSort } from './sessions.data';

interface SessToolbarProps {
  query: string;
  setQuery: (v: string) => void;
  sort: SessSort;
  setSort: (v: SessSort) => void;
  shown: number;
  total: number;
}

const SORT_ORDER: SessSort[] = ['edited', 'name', 'bpm'];

export function SessToolbar(props: SessToolbarProps): JSX.Element {
  const { query, setQuery, setSort, shown, sort, total } = props;
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
