import { useTranslation } from '@transcendence/i18n';
import { Pagination, Spin } from '@transcendence/ui';
import { type JSX, useState } from 'react';
import type { GetTracksFilters } from '../../api/track/types';
import { SamplePlayerProvider } from '../../contexts/SamplePlayerProvider';
import { useFollowers, useFollowing } from '../../hooks/useProducers';
import { useProducerLikedTracks, useProducerTracks } from '../../hooks/useTracks';
import type { Producer } from '../../types/producer';
import type { Track } from '../../types/track';
import { TrackList } from '../Tracks/TrackList';
import { ProducerCard } from './ProducerCard';
import styles from './ProducerProfile.module.scss';

type Tab = 'tracks' | 'liked' | 'followers' | 'following';

interface ProfileTabsProps {
  handle: string;
  followersCount: number;
  followingCount: number;
}

const PAGE_SIZE = 20;

/** Profile only shows public tracks (issue #243). */
const PUBLIC_TRACKS_FILTERS: GetTracksFilters = { visibilities: ['PUBLIC'] };

function PeoplePanel({
  empty,
  error,
  isLoading,
  onPageChange,
  page,
  people,
  total,
}: {
  isLoading: boolean;
  error: Error | null;
  people: Producer[] | undefined;
  empty: string;
  total: number;
  page: number;
  onPageChange: (page: number) => void;
}): JSX.Element {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className={styles.state}>
        <Spin />
      </div>
    );
  }
  if (error) return <p className={styles.empty}>{t('producers.listLoadError')}</p>;
  if (!people || people.length === 0) return <p className={styles.empty}>{empty}</p>;

  return (
    <>
      <div className={styles.peopleGrid}>
        {people.map((p) => (
          <ProducerCard key={p.id} producer={p} />
        ))}
      </div>
      {total > 0 ? (
        <div className={styles.pager}>
          <Pagination
            current={page}
            pageSize={PAGE_SIZE}
            total={total}
            showSizeChanger={false}
            onChange={onPageChange}
          />
        </div>
      ) : null}
    </>
  );
}

function TracksPanel({
  error,
  isLoading,
  tracks,
}: {
  isLoading: boolean;
  error: Error | null;
  tracks: Track[] | undefined;
}): JSX.Element {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className={styles.state}>
        <Spin />
      </div>
    );
  }
  if (error) return <p className={styles.empty}>{t('producers.listLoadError')}</p>;
  if (!tracks || tracks.length === 0) {
    return <p className={styles.empty}>{t('producers.emptyTracks')}</p>;
  }

  return (
    <SamplePlayerProvider>
      <TrackList tracks={tracks} readOnly />
    </SamplePlayerProvider>
  );
}

function LikedPanel({
  empty,
  error,
  isLoading,
  onPageChange,
  page,
  total,
  tracks,
}: {
  isLoading: boolean;
  error: Error | null;
  tracks: Track[] | undefined;
  empty: string;
  total: number;
  page: number;
  onPageChange: (page: number) => void;
}): JSX.Element {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className={styles.state}>
        <Spin />
      </div>
    );
  }
  if (error) return <p className={styles.empty}>{t('producers.listLoadError')}</p>;
  if (!tracks || tracks.length === 0) return <p className={styles.empty}>{empty}</p>;

  return (
    <>
      <SamplePlayerProvider>
        <TrackList tracks={tracks} readOnly />
      </SamplePlayerProvider>
      {total > 0 ? (
        <div className={styles.pager}>
          <Pagination
            current={page}
            pageSize={PAGE_SIZE}
            total={total}
            showSizeChanger={false}
            onChange={onPageChange}
          />
        </div>
      ) : null}
    </>
  );
}

export function ProfileTabs({
  followersCount,
  followingCount,
  handle,
}: ProfileTabsProps): JSX.Element {
  const { t } = useTranslation();
  const [tab, setTab] = useState<Tab>('tracks');
  const [likedPage, setLikedPage] = useState(1);
  const [followersPage, setFollowersPage] = useState(1);
  const [followingPage, setFollowingPage] = useState(1);

  const tracksQuery = useProducerTracks(handle, PUBLIC_TRACKS_FILTERS, tab === 'tracks');
  const likedQuery = useProducerLikedTracks(handle, Boolean(handle), likedPage, PAGE_SIZE);
  const followers = useFollowers(handle, tab === 'followers', followersPage, PAGE_SIZE);
  const following = useFollowing(handle, tab === 'following', followingPage, PAGE_SIZE);

  const tracksCount = tracksQuery.data?.length ?? 0;
  const likedCount = likedQuery.data?.total ?? (likedQuery.isPending ? '...' : 0);

  const tabs: { id: Tab; label: string; count: number | string }[] = [
    { count: tracksCount, id: 'tracks', label: t('producers.tabs.tracks') },
    { count: likedCount, id: 'liked', label: t('producers.tabs.liked') },
    { count: followersCount, id: 'followers', label: t('producers.tabs.followers') },
    { count: followingCount, id: 'following', label: t('producers.tabs.following') },
  ];

  return (
    <div className={styles.tabsSection}>
      <div className={styles.tabs}>
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            className={tab === item.id ? `${styles.tab} ${styles.tabActive}` : styles.tab}
            onClick={() => {
              setTab(item.id);
              if (item.id === 'liked') setLikedPage(1);
              if (item.id === 'followers') setFollowersPage(1);
              if (item.id === 'following') setFollowingPage(1);
            }}
          >
            {item.label}
            <span className={styles.tabCount}>{item.count}</span>
          </button>
        ))}
      </div>

      <div className={styles.tabPanel}>
        {tab === 'tracks' ? (
          <TracksPanel
            isLoading={tracksQuery.isLoading}
            error={tracksQuery.error}
            tracks={tracksQuery.data}
          />
        ) : null}

        {tab === 'liked' ? (
          <LikedPanel
            isLoading={likedQuery.isLoading}
            error={likedQuery.error}
            tracks={likedQuery.data?.items}
            total={likedQuery.data?.total ?? 0}
            page={likedPage}
            onPageChange={setLikedPage}
            empty={t('producers.emptyLiked')}
          />
        ) : null}

        {tab === 'followers' && (
          <PeoplePanel
            isLoading={followers.isLoading}
            error={followers.error}
            people={followers.data?.items}
            total={followers.data?.total ?? 0}
            page={followersPage}
            onPageChange={setFollowersPage}
            empty={t('producers.emptyFollowers')}
          />
        )}

        {tab === 'following' && (
          <PeoplePanel
            isLoading={following.isLoading}
            error={following.error}
            people={following.data?.items}
            total={following.data?.total ?? 0}
            page={followingPage}
            onPageChange={setFollowingPage}
            empty={t('producers.emptyFollowing')}
          />
        )}
      </div>
    </div>
  );
}
