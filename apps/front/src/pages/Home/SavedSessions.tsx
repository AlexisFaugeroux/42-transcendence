import { Carousel, MsnIcon } from '@transcendence/ui';
import { type ComponentRef, type JSX, useRef } from 'react';
import { SAVED_SESSIONS } from './home.data';
import styles from './SavedSessions.module.scss';
import { SavedSessionTile } from './SavedSessionTile';

export function SavedSessions(): JSX.Element {
  const carousel = useRef<ComponentRef<typeof Carousel>>(null);

  return (
    <section>
      <div className={styles.head}>
        <div className={styles.headLeft}>
          <h3 className={styles.title}>Continue a saved session</h3>
          <span className={styles.count}>{SAVED_SESSIONS.length} sessions</span>
        </div>
        <div className={styles.controls}>
          <button className={styles.iconBtn} aria-label="Scroll left" onClick={() => carousel.current?.prev()}>
            <MsnIcon name="arrowL" size="14px" />
          </button>
          <button className={styles.iconBtn} aria-label="Scroll right" onClick={() => carousel.current?.next()}>
            <MsnIcon name="arrowR" size="14px" />
          </button>
          <a href="#" className={styles.viewAll}>
            View all
          </a>
        </div>
      </div>

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
        {SAVED_SESSIONS.map((session) => (
          <SavedSessionTile key={session.id} session={session} />
        ))}
      </Carousel>
    </section>
  );
}
