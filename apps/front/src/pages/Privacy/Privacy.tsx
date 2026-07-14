import type { JSX } from 'react';
import { SiteFooter } from '../Landing/SiteFooter';
import { TopNav } from '../Landing/TopNav';
import styles from './Privacy.module.scss';

// Static privacy policy page. Placeholder content adapted to MakeSomeNoise —
// the "to be completed" fields are for the team to fill in (see issue #142).
export function Privacy(): JSX.Element {
  return (
    <div className={styles.page}>
      <TopNav />
      <main className={styles.content}>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.updated}>Last updated: to be completed</p>

        <p className={styles.intro}>
          MakeSomeNoise is an educational project built as part of the 42 school curriculum. This policy explains what
          personal data we collect and how it is used.
        </p>

        <section className={styles.section}>
          <h2 className={styles.heading}>1. Data controller</h2>
          <p className={styles.body}>
            Your data is processed by the MakeSomeNoise project team. Contact: to be completed.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>2. Data we collect</h2>
          <ul className={styles.list}>
            <li>
              Account: email address, password (stored hashed, never in plain text), first name, last name, artist name.
            </li>
            <li>Profile: avatar and external links you provide.</li>
            <li>Content: sessions, samples, exports and projects you create on the platform.</li>
            <li>Technical data: the session cookie required for authentication.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>3. Purposes</h2>
          <p className={styles.body}>
            This data is used solely to create and manage your account, provide the creative tools (studio, recorder,
            mixer), and power the social features (following, collaborative sessions, chat).
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>4. Legal basis</h2>
          <p className={styles.body}>
            Processing is based on the performance of the service you request by creating an account.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>5. Data retention</h2>
          <p className={styles.body}>
            Your data is kept as long as your account is active. It is deleted when you delete your account (from the
            Settings page) or on request.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>6. Cookies</h2>
          <p className={styles.body}>
            We only use an authentication session cookie, which is essential for the site to work. No advertising or
            third-party tracking cookies.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>7. Data sharing</h2>
          <p className={styles.body}>
            No data is sold or transferred to third parties. Data is hosted on our own infrastructure (to be completed).
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.heading}>8. Your rights (GDPR)</h2>
          <p className={styles.body}>
            You have the right to access, rectify, delete and port your data. Account deletion is available directly
            from the Settings page; for any other request, contact us at: to be completed.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

export default Privacy;
