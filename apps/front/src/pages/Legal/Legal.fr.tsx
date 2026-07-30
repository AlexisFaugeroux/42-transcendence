import type { JSX } from 'react';
import styles from './Legal.module.scss';

export function LegalFr(): JSX.Element {
  return (
    <>
      <h1 className={styles.title}>Mentions légales</h1>

      <section className={styles.section}>
        <h2 className={styles.heading}>Éditeur</h2>
        <p className={styles.body}>
          MakeSomeNoise est un projet pédagogique réalisé dans le cadre du cursus de l&apos;école 42 (ft_transcendence),
          sans finalité commerciale. Publié par les membres de l&apos;équipe (à compléter). Contact : à compléter.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Directeur de la publication</h2>
        <p className={styles.body}>À compléter.</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Hébergement</h2>
        <p className={styles.body}>
          Le site est hébergé sur l&apos;infrastructure du projet (nom et adresse de l&apos;hébergeur à compléter).
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Propriété intellectuelle</h2>
        <p className={styles.body}>
          Le code source, le design et les contenus originaux du site sont la propriété de leurs auteurs. Les contenus
          créés par les utilisateurs (sessions, samples, exports) restent la propriété de ces utilisateurs (voir les
          conditions générales d&apos;utilisation).
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Technologies tierces</h2>
        <p className={styles.body}>
          Les outils audio (studio) reposent sur la technologie open source{' '}
          <a className={styles.link} href="https://github.com/andremichelle/openDAW" target="_blank" rel="noreferrer">
            openDAW
          </a>
          , via le SDK{' '}
          <a
            className={styles.link}
            href="https://github.com/andremichelle/openDAW-headless"
            target="_blank"
            rel="noreferrer"
          >
            openDAW-headless
          </a>
          , utilisé conformément à sa licence.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>Avertissement</h2>
        <p className={styles.body}>
          Ce site est réalisé à des fins pédagogiques dans le cadre du cursus 42. Il n&apos;a aucune finalité
          commerciale.
        </p>
      </section>
    </>
  );
}
