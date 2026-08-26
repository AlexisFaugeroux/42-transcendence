import { useUser } from '@transcendence/auth';
import { useTranslation } from '@transcendence/i18n';
import { Button, MsnIcon, Flex } from '@transcendence/ui';
import { type JSX } from 'react';
import styles from './NotFound.module.scss';

export function NotFound(): JSX.Element {
  const { user, loading } = useUser();
  const { t } = useTranslation();
  const homeHref = user ? '/home' : '/';

  return (
    <Flex justify="center" align="center" vertical className={styles.container}>
      <h1>404</h1>
      <p className={styles.subText}>{t('notFound.body')} 👀</p>
      <Button
        type="primary"
        size="large"
        href={loading ? undefined : homeHref}
        disabled={loading}
      >
        {t('notFound.goHome')}
        <MsnIcon name="home" size="12px" />
      </Button>
    </Flex>
  );
}
