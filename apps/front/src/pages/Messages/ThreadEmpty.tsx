import { useTranslation } from '@transcendence/i18n';
import { Button, MsnIcon } from '@transcendence/ui';
import type { JSX } from 'react';
import { useState } from 'react';
import { NewConversationModal } from './NewConversationModal';
import styles from './ThreadEmpty.module.scss';

export function ThreadEmpty(): JSX.Element {
  const { t } = useTranslation();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <section className={styles.empty}>
      <div className={styles.inner}>
        <div className={styles.frame}>
          <MsnIcon name="chat" size="30px" />
        </div>
        <h2 className={styles.title}>{t('chat.threadEmpty.title')}</h2>
        <p className={styles.text}>{t('chat.threadEmpty.text')}</p>
        {/* Same seam as ListEmpty: T8 (#182) will focus its search field here. */}
        <Button
          className={styles.cta}
          onClick={() => {
            setModalOpen(true);
          }}
        >
          <MsnIcon name="plus" size="12px" /> {t('chat.threadEmpty.cta')}
        </Button>
        <NewConversationModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />
      </div>
    </section>
  );
}
