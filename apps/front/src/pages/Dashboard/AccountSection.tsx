import { Button } from '@transcendence/ui';
import type { JSX } from 'react';
import styles from './AccountSection.module.scss';
import { Card, Hr, Row, SectionHeader } from './primitives';

interface AccountSectionProps {
  email: string;
  joined: string;
}

export function AccountSection({ email, joined }: AccountSectionProps): JSX.Element {
  return (
    <div>
      <SectionHeader title="Account" subtitle="Login credentials and security." />

      <Card>
        <Row label="Email">
          <div className={styles.line}>
            <span className={styles.value}>{email}</span>
            <Button size="small">Change email</Button>
          </div>
        </Row>
        <Hr />

        <Row label="Password" hint="Last changed 2 weeks ago">
          <div className={styles.line}>
            <span className={styles.dots}>••••••••••••</span>
            <Button size="small">Change password</Button>
          </div>
        </Row>
        <Hr />

        <Row label="Member since">
          <span className={styles.mono}>{joined}</span>
        </Row>
      </Card>
    </div>
  );
}
