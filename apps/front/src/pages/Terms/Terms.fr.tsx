import type { JSX } from 'react';
import styles from './Terms.module.scss';

export function TermsFr(): JSX.Element {
  return (
    <>
      <h1 className={styles.title}>Conditions générales d&apos;utilisation</h1>
      <p className={styles.updated}>Dernière mise à jour : à compléter</p>

      <section className={styles.section}>
        <h2 className={styles.heading}>1. Objet</h2>
        <p className={styles.body}>
          Les présentes conditions régissent l&apos;utilisation de la plateforme MakeSomeNoise, dont
          les outils audio reposent sur la technologie open source{' '}
          <a
            className={styles.link}
            href="https://github.com/andremichelle/openDAW"
            target="_blank"
            rel="noreferrer"
          >
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
          . En créant un compte, vous les acceptez.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>2. Compte</h2>
        <p className={styles.body}>
          Vous devez fournir des informations exactes lors de votre inscription. Vous êtes
          responsable de la confidentialité de vos identifiants et de l&apos;activité de votre
          compte.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>3. Usage acceptable</h2>
        <p className={styles.body}>
          Vous vous engagez à ne pas : publier de contenu illicite, haineux ou portant atteinte aux
          droits d&apos;autrui ; téléverser des samples ou de l&apos;audio dont vous ne détenez pas
          les droits ; perturber le service (abus technique, tentatives d&apos;intrusion).
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>4. Contenus et propriété</h2>
        <p className={styles.body}>
          Vous conservez la propriété des créations musicales, sessions, samples et exports que vous
          produisez. Vous accordez à MakeSomeNoise une licence limitée, uniquement pour héberger et
          afficher ces contenus dans le cadre du service. Vous êtes seul responsable des contenus
          que vous téléversez.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>5. Fonctionnalités collaboratives</h2>
        <p className={styles.body}>
          Certaines fonctionnalités (sessions en temps réel, partage) exposent vos contenus selon la
          visibilité que vous choisissez (privée, partagée, publique). Vous gardez le contrôle de
          ces réglages.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>6. Suspension et résiliation</h2>
        <p className={styles.body}>
          Nous pouvons suspendre un compte en cas de manquement aux présentes conditions. Vous
          pouvez supprimer votre compte à tout moment depuis la page Paramètres.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>7. Disponibilité et responsabilité</h2>
        <p className={styles.body}>
          Le service est fourni « en l&apos;état », dans le cadre d&apos;un projet pédagogique 42,
          sans garantie de disponibilité continue. Notre responsabilité ne peut être engagée en cas
          de perte de données ou d&apos;indisponibilité du service.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>8. Modifications</h2>
        <p className={styles.body}>
          Ces conditions peuvent être modifiées ; la version en vigueur est celle publiée sur cette
          page.
        </p>
      </section>
    </>
  );
}
