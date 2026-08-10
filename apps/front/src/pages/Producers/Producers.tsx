import { useTranslation } from '@transcendence/i18n';
import { MsnIcon, Spin } from '@transcendence/ui';
import { type JSX, useMemo, useState } from 'react';
import { AppHeader } from '../../components/AppHeader/AppHeader';
import { useProducers } from '../../hooks/useProducers';
import { ProducerCard } from './ProducerCard';
import styles from './Producers.module.scss';

export function Producers(): JSX.Element {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const { data, error, isLoading } = useProducers();

  const filtered = useMemo(() => {
    const list = data ?? [];
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter((p) => p.artistName.toLowerCase().includes(q) || p.handle.toLowerCase().includes(q));
  }, [data, query]);

  return (
    <div className={styles.page}>
      <AppHeader active="producers" />

      <div className={styles.container}>
        <div className={styles.titleRow}>
          <div>
            <div className={styles.eyebrow}>{t('producers.eyebrow')}</div>
            <h1 className={styles.title}>{t('producers.title')}</h1>
            <p className={styles.subtitle}>
              {isLoading ? '...' : t('producers.count', { count: filtered.length })}
            </p>
          </div>

          <div className={styles.search}>
            <MsnIcon name="search" size="13px" color="var(--fg3)" />
            <input
              className={styles.searchInput}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              placeholder={t('producers.searchPlaceholder')}
            />
          </div>
        </div>

        {isLoading ? (
          <div className={styles.state}>
            <Spin />
          </div>
        ) : error ? (
          <div className={styles.state}>{t('producers.loadError')}</div>
        ) : filtered.length === 0 ? (
          <div className={styles.state}>{t('producers.empty')}</div>
        ) : (
          <div className={styles.grid}>
            {filtered.map((producer) => (
              <ProducerCard key={producer.id} producer={producer} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
