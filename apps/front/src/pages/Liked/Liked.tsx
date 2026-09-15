import { useTranslation } from '@transcendence/i18n';
import { Pagination, Spin } from '@transcendence/ui';
import { type JSX, useState } from 'react';
import { Link } from 'react-router-dom';
import { SamplePlayerProvider } from '../../contexts/SamplePlayerProvider';
import { useLikedTracks } from '../../hooks/useTracks';
import { TrackList } from '../Tracks/TrackList';
import styles from './Liked.module.scss';

const PAGE_SIZE = 20;

export function Liked(): JSX.Element {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useLikedTracks(page, PAGE_SIZE);

  const list = data?.items ?? [];
  const total = data?.total ?? 0;

  return (
    <SamplePlayerProvider>
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.titleRow}>
            <div>
              <div className={styles.eyebrow}>{t('liked.eyebrow')}</div>
              <h1 className={styles.title}>{t('liked.title')}</h1>
              <p className={styles.subtitle}>
                {isLoading ? '...' : t('liked.count', { count: total })}...
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className={styles.state}>
              <Spin />
            </div>
          ) : error ? (
            <div className={styles.state}>{t('liked.loadError')}</div>
          ) : total === 0 ? (
            <div className={styles.state}>
              <p>{t('liked.empty')}</p>
              <Link to="/producers">{t('liked.browseProducers')}</Link>
            </div>
          ) : (
            <>
              <TrackList tracks={list} readOnly />

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
    </SamplePlayerProvider>
  );
}
