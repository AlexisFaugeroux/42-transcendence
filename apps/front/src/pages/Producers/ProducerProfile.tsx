import { useTranslation } from '@transcendence/i18n';
import { MsnIcon, Spin } from '@transcendence/ui';
import type { JSX } from 'react';
import { useParams } from 'react-router-dom';
import { formatDate } from '@transcendence/date';
import { StatusAvatar } from '../../components/StatusAvatar/StatusAvatar';
import { useProducer } from '../../hooks/useProducers';
import { FollowButton } from './FollowButton';
import styles from './ProducerProfile.module.scss';
import { ProfileTabs } from './ProfileTabs';

export function ProducerProfile(): JSX.Element {
  const { t } = useTranslation();
  const { handle = '' } = useParams<{ handle: string }>();
  const { data: producer, error, isLoading } = useProducer(handle);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {isLoading ? (
          <div className={styles.state}>
            <Spin />
          </div>
        ) : error || !producer ? (
          <p className={styles.state}>{t('producers.notFound')}</p>
        ) : (
          <>
            <div className={styles.header}>
              <StatusAvatar name={producer.artistName} size={96} />
              <div className={styles.headerMain}>
                <div className={styles.nameRow}>
                  <div>
                    <h1 className={styles.profileName}>{producer.artistName}</h1>
                    <div className={styles.profileHandle}>@{producer.handle}</div>
                  </div>
                  <div className={styles.actions}>
                    <FollowButton producer={producer} />
                  </div>
                </div>

                {producer.bio ? <p className={styles.bio}>{producer.bio}</p> : null}

                <div className={styles.metaRow}>
                  {producer.location ? (
                    <span>
                      <MsnIcon name="home" size="12px" /> {producer.location}
                    </span>
                  ) : null}
                  <span>
                    <MsnIcon name="user" size="12px" />{' '}
                    {t('producers.joined', { date: formatDate(producer.joined, 'MMM YYYY') })}
                  </span>
                </div>

                <div className={styles.stats}>
                  <div>
                    <strong>{producer.followersCount}</strong> {t('producers.followers')}
                  </div>
                  <div>
                    <strong>{producer.followingCount}</strong> {t('producers.following')}
                  </div>
                  <div>
                    <strong>{producer.likesReceived}</strong> {t('producers.likes')}
                  </div>
                </div>

                {producer.links.length > 0 ? (
                  <div className={styles.links}>
                    {producer.links.map((link) => (
                      <a
                        key={`${link.kind}-${link.url}`}
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.linkChip}
                      >
                        {link.kind}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>

            <ProfileTabs
              handle={producer.handle}
              followersCount={producer.followersCount}
              followingCount={producer.followingCount}
            />
          </>
        )}
      </div>
    </div>
  );
}
