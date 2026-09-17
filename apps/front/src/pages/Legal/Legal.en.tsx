import type { JSX } from 'react';
import styles from './Legal.module.scss';

export function LegalEn(): JSX.Element {
  return (
    <>
      <h1 className={styles.title}>Legal Notice</h1>

      <section className={styles.section}>
        <h2 className={styles.heading}>Publisher</h2>
        <p className={styles.body}>
          MakeSomeNoise is an educational project built as part of the 42 school curriculum
          (ft_transcendence), with no commercial purpose. Published by the team members (afaugero,
          anaudibe, jbayonne, mpelage). Contact: makesomenoise_team@gmail.com.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Publication director</h2>
        <p className={styles.body}>To be completed.</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Hosting</h2>
        <p className={styles.body}>
          The site is hosted on the project infrastructure (makesomenoise.com).
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Intellectual property</h2>
        <p className={styles.body}>
          The source code, design and original content of the site are the property of their
          authors. Content created by users (sessions, samples, exports) remains the property of
          those users (see the Terms of Use).
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Third-party technologies</h2>
        <p className={styles.body}>
          The audio tools (studio) are built on the open-source technology{' '}
          <a
            className={styles.link}
            href="https://github.com/andremichelle/openDAW"
            target="_blank"
            rel="noreferrer"
          >
            openDAW
          </a>
          , via the{' '}
          <a
            className={styles.link}
            href="https://github.com/andremichelle/openDAW-headless"
            target="_blank"
            rel="noreferrer"
          >
            openDAW-headless
          </a>{' '}
          SDK, used in accordance with its license.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Disclaimer</h2>
        <p className={styles.body}>
          This site is built for educational purposes as part of the 42 program. It has no
          commercial purpose.
        </p>
      </section>
    </>
  );
}
