import type { JSX } from 'react';
import styles from './Privacy.module.scss';

export function PrivacyFr(): JSX.Element {
  return (
    <>
      <h1 className={styles.title}>Politique de confidentialité</h1>
      <p className={styles.updated}>Dernière mise à jour : à compléter</p>

      <p className={styles.intro}>
        MakeSomeNoise est un projet pédagogique réalisé dans le cadre du cursus de l&apos;école 42.
        Cette politique explique quelles données personnelles nous collectons et comment elles sont
        utilisées.
      </p>

      <section className={styles.section}>
        <h2 className={styles.heading}>1. Responsable du traitement</h2>
        <p className={styles.body}>
          Vos données sont traitées par l&apos;équipe du projet MakeSomeNoise. Contact : à
          compléter.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>2. Données collectées</h2>
        <ul className={styles.list}>
          <li>
            Compte : adresse e-mail, mot de passe (stocké haché, jamais en clair), prénom, nom, nom
            d&apos;artiste.
          </li>
          <li>Profil : avatar et liens externes que vous renseignez.</li>
          <li>
            Contenus : sessions, samples, exports et projets que vous créez sur la plateforme.
          </li>
          <li>Données techniques : le cookie de session nécessaire à l&apos;authentification.</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>3. Finalités</h2>
        <p className={styles.body}>
          Ces données servent uniquement à créer et gérer votre compte, fournir les outils de
          création (studio, enregistreur, mixeur) et faire fonctionner les fonctionnalités sociales
          (abonnements, sessions collaboratives, chat).
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>4. Base légale</h2>
        <p className={styles.body}>
          Le traitement repose sur l&apos;exécution du service que vous demandez en créant un
          compte.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>5. Durée de conservation</h2>
        <p className={styles.body}>
          Vos données sont conservées tant que votre compte est actif. Elles sont supprimées lorsque
          vous supprimez votre compte (depuis la page Paramètres) ou sur demande.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>6. Cookies</h2>
        <p className={styles.body}>
          Nous n&apos;utilisons qu&apos;un cookie de session d&apos;authentification, indispensable
          au fonctionnement du site. Aucun cookie publicitaire ni de suivi tiers.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>7. Partage des données</h2>
        <p className={styles.body}>
          Aucune donnée n&apos;est vendue ni transmise à des tiers. Les données sont hébergées sur
          notre propre infrastructure (à compléter).
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.heading}>8. Vos droits (RGPD)</h2>
        <p className={styles.body}>
          Vous disposez d&apos;un droit d&apos;accès, de rectification, de suppression et de
          portabilité de vos données. La suppression du compte est disponible directement depuis la
          page Paramètres ; pour toute autre demande, contactez-nous à :
          makesomenoise_team@gmail.com.
        </p>
      </section>
    </>
  );
}
