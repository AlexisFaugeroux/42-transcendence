import { useTranslation } from '@transcendence/i18n';
import { MsnIcon, Pagination, Spin } from '@transcendence/ui';
import { type JSX, useEffect, useState } from 'react';
import { useProducers } from '../../hooks/useProducers';
import { ProducerCard } from './ProducerCard';
import styles from './Producers.module.scss';

const PAGE_SIZE = 20;

export function Producers(): JSX.Element {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [debouncedQ, setDebouncedQ] = useState('');

  useEffect(() => {
    const id = window.setTimeout(() => {
      setDebouncedQ(query.trim());
      setPage(1);
    }, 300);

    return () => {
      window.clearTimeout(id);
    };
  }, [query]);

  useEffect(() => {
    setPage(1);
  }, [debouncedQ]);

  const { data, error, isLoading } = useProducers(page, PAGE_SIZE, debouncedQ);

  const list = data?.items ?? [];
  const total = data?.total ?? 0;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.titleRow}>
          <div>
            <div className={styles.eyebrow}>{t('producers.eyebrow')}</div>
            <h1 className={styles.title}>{t('producers.title')}</h1>
            <p className={styles.subtitle}>
              {isLoading ? '...' : t('producers.count', { count: total })}
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
        ) : total === 0 && !debouncedQ ? (
          <div className={styles.state}>{t('producers.empty')}</div>
        ) : list.length === 0 ? (
          <div className={styles.state}>{t('producers.emptySearch')}</div>
        ) : (
          <>
            <div className={styles.grid}>
              {list.map((producer) => (
                <ProducerCard key={producer.id} producer={producer} />
              ))}
            </div>

            {total > 0 ? (
              <div className={styles.pager}>
                <Pagination
                  current={page}
                  pageSize={PAGE_SIZE}
                  total={total}
                  showSizeChanger={false}
                  onChange={(next) => {
                    setPage(next);
                  }}
                />
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
