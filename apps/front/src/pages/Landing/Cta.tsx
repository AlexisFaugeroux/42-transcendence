import { Button } from '@transcendence/ui';
import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import { MsnIcon } from '@ui/components/MsnIcon/MsnIcon';
import styles from './Cta.module.scss';

export function Cta(): JSX.Element {
  return (
    <section className={styles.cta}>
      <div className={styles.inner}>
        <h2 className={styles.title}>
          Press record. <span className={styles.accent}>Make some noise.</span>
        </h2>
        <p className={styles.sub}>Free while in beta. No credit card. Your sessions stay yours.</p>
        <div className={styles.actions}>
          <Link to="/register">
            <Button type="primary" size="large">
              Sign up free <MsnIcon name="arrowR" size="12px" />
            </Button>
          </Link>
          <Link to="/login">
            <Button size="large">Log in</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
