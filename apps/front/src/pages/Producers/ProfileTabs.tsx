import { useTranslation } from '@transcendence/i18n';
import { Pagination, Spin } from '@transcendence/ui';
import { type JSX, useState } from 'react';
import { useFollowers, useFollowing } from '../../hooks/useProducers';
import type { PublicProducer } from '../../types/producer';
import { ProducerCard } from './ProducerCard';
import styles from './ProducerProfile.module.scss';

type Tab = 'tracks' | 'liked' | 'followers' | 'following';

interface ProfileTabsProps {
  handle: string;
  followersCount: number;
  followingCount: number;
}

const PAGE_SIZE = 20;

// TODO: mock (tracks / likes)
const MOCK_TRACKS: { id: string; title: string }[] = [];
const MOCK_LIKED: { id: string; title: string }[] = [];

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
  people: PublicProducer[] | undefined;
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

export function ProfileTabs({
  followersCount,
  followingCount,
  handle,
}: ProfileTabsProps): JSX.Element {
  const { t } = useTranslation();
  const [tab, setTab] = useState<Tab>('tracks');
  const [followersPage, setFollowersPage] = useState(1);
  const [followingPage, setFollowingPage] = useState(1);

  const followers = useFollowers(handle, tab === 'followers', followersPage, PAGE_SIZE);
  const following = useFollowing(handle, tab === 'following', followingPage, PAGE_SIZE);

  const tabs: { id: Tab; label: string; count: number | string }[] = [
    { count: MOCK_TRACKS.length, id: 'tracks', label: t('producers.tabs.tracks') },
    { count: MOCK_LIKED.length, id: 'liked', label: t('producers.tabs.liked') },
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
        {tab === 'tracks' &&
          (MOCK_TRACKS.length === 0 ? (
            <p className={styles.empty}>{t('producers.emptyTracks')}</p>
          ) : (
            <ul className={styles.mockList}>
              {MOCK_TRACKS.map((track) => (
                <li key={track.id}>{track.title}</li>
              ))}
            </ul>
          ))}

        {tab === 'liked' &&
          (MOCK_LIKED.length === 0 ? (
            <p className={styles.empty}>{t('producers.emptyLiked')}</p>
          ) : (
            <ul className={styles.mockList}>
              {MOCK_LIKED.map((track) => (
                <li key={track.id}>{track.title}</li>
              ))}
            </ul>
          ))}

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
