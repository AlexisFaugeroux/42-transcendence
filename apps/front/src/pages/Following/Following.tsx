import { useAuthUser } from '@transcendence/auth';
import { useTranslation } from '@transcendence/i18n';
import { MsnIcon, Pagination, Spin } from '@transcendence/ui';
import { type JSX, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFollowing } from '../../hooks/useProducers';
import { PAGE_SIZE } from '../constants';
import { ProducerCard } from '../Producers/ProducerCard';
import styles from '../Producers/Producers.module.scss';

export function Following(): JSX.Element {
  const me = useAuthUser();
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [debouncedQ, setDebouncedQ] = useState('');

  useEffect(() => {
    const id = window.setTimeout(() => {
      setDebouncedQ(query.trim());
    }, 300);

    return () => {
      window.clearTimeout(id);
    };
  }, [query]);

  useEffect(() => {
    setPage(1);
  }, [debouncedQ]);

  const { data, error, isLoading } = useFollowing(me.handle, true, page, PAGE_SIZE, debouncedQ);

  const list = data?.items ?? [];
  const total = data?.total ?? 0;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.titleRow}>
          <div>
            <div className={styles.eyebrow}>{t('following.eyebrow')}</div>
            <h1 className={styles.title}>{t('following.title')}</h1>
            <p className={styles.subtitle}>
              {isLoading ? '...' : t('following.count', { count: total })}
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
              placeholder={t('following.searchPlaceholder')}
            />
          </div>
        </div>

        {isLoading ? (
          <div className={styles.state}>
            <Spin />
          </div>
        ) : error ? (
          <div className={styles.state}>{t('following.loadError')}</div>
        ) : total === 0 && !debouncedQ ? (
          <div className={styles.state}>
            <p>{t('following.empty')}</p>
            <Link to="/producers">{t('following.browseProducers')}</Link>
          </div>
        ) : list.length === 0 ? (
          <div className={styles.state}>{t('following.emptySearch')}</div>
        ) : (
          <>
            <div className={styles.grid}>
              {list.map((producer) => (
                <ProducerCard key={producer.id} producer={producer} showUnfollow />
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
