import { useTranslation } from '@transcendence/i18n';
import { MsnIcon } from '@transcendence/ui';
import type { JSX } from 'react';
import { useUnfollow } from '../../hooks/useProducers';
import styles from './ProducerProfile.module.scss';

interface UnfollowButtonProps {
  handle: string;
}

export function UnfollowButton({ handle }: UnfollowButtonProps): JSX.Element {
  const { t } = useTranslation();
  const unfollow = useUnfollow();
  return (
    <button
      type="button"
      className={styles.followingBtn}
      disabled={unfollow.isPending}
      onClick={() => unfollow.mutate(handle)}
    >
      <MsnIcon name="users" size="12px" />
      {t('producers.unfollow')}
    </button>
  );
}
