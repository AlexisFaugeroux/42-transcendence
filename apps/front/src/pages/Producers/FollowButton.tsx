import { useAuthUser } from '@transcendence/auth';
import { useTranslation } from '@transcendence/i18n';
import { MsnIcon } from '@transcendence/ui';
import type { JSX } from 'react';
import { useFollow, useUnfollow } from '../../hooks/useProducers';
import type { PublicProducerProfile } from '../../types/producer';
import styles from './ProducerProfile.module.scss';

interface FollowButtonProps {
  producer: PublicProducerProfile;
}

export function FollowButton({ producer }: FollowButtonProps): JSX.Element | null {
  const { t } = useTranslation();
  const me = useAuthUser();
  const follow = useFollow();
  const unfollow = useUnfollow();

  if (me.handle === producer.handle) return null;

  const pending = follow.isPending || unfollow.isPending;
  const following = producer.isFollowing;

  return (
    <button
      type="button"
      className={following ? styles.followingBtn : styles.followBtn}
      disabled={pending}
      onClick={() => {
        if (following) unfollow.mutate(producer.handle);
        else follow.mutate(producer.handle);
      }}
    >
      <MsnIcon name={following ? 'users' : 'plus'} size="12px" />
      {following ? t('producers.unfollow') : t('producers.follow')}
    </button>
  );
}
