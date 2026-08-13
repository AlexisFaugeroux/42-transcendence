import { useTranslation } from '@transcendence/i18n';
import { Button, MsnIcon } from '@transcendence/ui';
import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import styles from './ThreadEmpty.module.scss';

export function ThreadEmpty(): JSX.Element {
  const { t } = useTranslation();

  return (
    <section className={styles.empty}>
      <div className={styles.inner}>
        <div className={styles.frame}>
          <MsnIcon name="chat" size="30px" />
        </div>
        <h2 className={styles.title}>{t('chat.threadEmpty.title')}</h2>
        <p className={styles.text}>{t('chat.threadEmpty.text')}</p>
        {/* Same seam as ListEmpty: T8 (#182) will focus its search field here. */}
        <Link to="/producers">
          <Button className={styles.cta}>
            <MsnIcon name="plus" size="12px" /> {t('chat.threadEmpty.cta')}
          </Button>
        </Link>
      </div>
    </section>
  );
}
