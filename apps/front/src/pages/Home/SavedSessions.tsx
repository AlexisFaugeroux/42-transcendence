import { useTranslation } from '@transcendence/i18n';
import { Carousel, CloseOutlined, Flex, MsnIcon, Spin, theme } from '@transcendence/ui';
import { type ComponentRef, type JSX, useRef } from 'react';
import { useSavedSessions } from '../../hooks/useSavedSessions';
import type { Session } from '../Sessions/sessions.data';
import styles from './SavedSessions.module.scss';
import { SavedSessionTile } from './SavedSessionTile';

export function SavedSessions(): JSX.Element | null {
  const carousel = useRef<ComponentRef<typeof Carousel>>(null);
  const { t } = useTranslation();
  const { data, isError, isLoading } = useSavedSessions();

  const loadProject = (session: Session) => {
    const query = new URLSearchParams({
      bpm: String(session.bpm),
      name: session.name,
      projectId: session.id,
    });

    for (const sampleId of session.samples) {
      query.append('sampleId', sampleId);
    }
    window.location.href = `${import.meta.env.VITE_STUDIO_URL}/?${query.toString()}`;
  };

  return (
    <section>
      <div className={styles.head}>
        <div className={styles.headLeft}>
          <h3 className={styles.title}>{t('home.saved.title')}</h3>
          <span className={styles.count}>
            {t('home.saved.count', { count: isLoading ? 'loading...' : data?.length })}
          </span>
        </div>
        <div className={styles.controls}>
          <button
            className={styles.iconBtn}
            aria-label={t('home.saved.scrollLeft')}
            onClick={() => carousel.current?.prev()}
          >
            <MsnIcon name="arrowL" size="14px" />
          </button>
          <button
            className={styles.iconBtn}
            aria-label={t('home.saved.scrollRight')}
            onClick={() => carousel.current?.next()}
          >
            <MsnIcon name="arrowR" size="14px" />
          </button>
          <a href="http://localhost:5173/sessions" className={styles.viewAll}>
            {t('home.saved.viewAll')}
          </a>
        </div>
      </div>

      {isError ? (
        <Flex align="center" justify="center">
          <CloseOutlined color={theme.red} />
          <span>Error while loading saved sessions</span>
        </Flex>
      ) : isLoading ? (
        <Flex align="center" justify="center">
          <Spin />
        </Flex>
      ) : (
        <Carousel
          ref={carousel}
          className={styles.carousel}
          dots={false}
          infinite={false}
          slidesToShow={4}
          slidesToScroll={1}
          responsive={[
            { breakpoint: 1400, settings: { slidesToShow: 3 } },
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } },
          ]}
        >
          {data?.map((session) => (
            <SavedSessionTile key={session.id} session={session} onOpen={loadProject} />
          ))}
        </Carousel>
      )}
    </section>
  );
}
