import { useAuthUser } from '@transcendence/auth';
import { useTranslation } from '@transcendence/i18n';
import { MsnIcon, Spin } from '@transcendence/ui';
import { type JSX, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppHeader } from '../../components/AppHeader/AppHeader';
import { useFollowing } from '../../hooks/useProducers';
import { ProducerCard } from '../Producers/ProducerCard';
import styles from '../Producers/Producers.module.scss';

export function Following(): JSX.Element {
  const me = useAuthUser();
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const { data, error, isLoading } = useFollowing(me.handle);

  const list = useMemo(() => data ?? [], [data]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter((p) => p.artistName.toLowerCase().includes(q) || p.handle.toLowerCase().includes(q));
  }, [list, query]);

  return (
    <div className={styles.page}>
      <AppHeader active="following" />

      <div className={styles.container}>
        <div className={styles.titleRow}>
          <div>
            <div className={styles.eyebrow}>{t('following.eyebrow')}</div>
            <h1 className={styles.title}>{t('following.title')}</h1>
            <p className={styles.subtitle}>{isLoading ? '...' : t('following.count', { count: filtered.length })}</p>
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
        ) : list.length === 0 ? (
          <div className={styles.state}>
            <p>{t('following.empty')}</p>
            <Link to="/producers">{t('following.browseProducers')}</Link>
          </div>
        ) : filtered.length === 0 ? (
          <div className={styles.state}>{t('following.emptySearch')}</div>
        ) : (
          <div className={styles.grid}>
            {filtered.map((producer) => (
              <ProducerCard key={producer.id} producer={producer} showUnfollow />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
