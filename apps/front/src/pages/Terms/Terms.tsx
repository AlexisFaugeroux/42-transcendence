import type { JSX } from 'react';
import { SiteFooter } from '../Landing/SiteFooter';
import { TopNav } from '../Landing/TopNav';
import styles from './Terms.module.scss';

// Static terms of use page. Placeholder content adapted to MakeSomeNoise —
// the "to be completed" fields are for the team to fill in (see issue #144).
export function Terms(): JSX.Element {
  return (
    <div className={styles.page}>
      <TopNav />
      <main className={styles.content}>
        <h1 className={styles.title}>Terms of Use</h1>
        <p className={styles.updated}>Last updated: to be completed</p>

        <section className={styles.section}>
          <h2 className={styles.heading}>1. Purpose</h2>
          <p className={styles.body}>
            These terms govern the use of the MakeSomeNoise platform, whose audio tools are built on the open-source
            technology{' '}
            <a className={styles.link} href="https://github.com/andremichelle/openDAW" target="_blank" rel="noreferrer">
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
            SDK. By creating an account, you accept them.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>2. Account</h2>
          <p className={styles.body}>
            You must provide accurate information when signing up. You are responsible for keeping your credentials
            confidential and for the activity on your account.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>3. Acceptable use</h2>
          <p className={styles.body}>
            You agree not to: publish illegal or hateful content, or content that infringes the rights of others; upload
            samples or audio you do not hold the rights to; or disrupt the service (technical abuse, intrusion
            attempts).
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>4. User content and ownership</h2>
          <p className={styles.body}>
            You retain ownership of the musical creations, sessions, samples and exports you produce. You grant
            MakeSomeNoise a limited license, solely to host and display this content as part of the service. You are
            solely responsible for the content you upload.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>5. Collaborative features</h2>
          <p className={styles.body}>
            Some features (real-time sessions, sharing) expose your content according to the visibility you choose
            (private, shared, public). You remain in control of these settings.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>6. Suspension and termination</h2>
          <p className={styles.body}>
            We may suspend an account in the event of a breach of these terms. You can delete your account at any time
            from the Settings page.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>7. Availability and liability</h2>
          <p className={styles.body}>
            The service is provided &quot;as is&quot;, as part of an educational 42 project, with no guarantee of
            continuous availability. We cannot be held liable for data loss or service unavailability.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>8. Changes</h2>
          <p className={styles.body}>
            These terms may be amended; the version in force is the one published on this page.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

export default Terms;
