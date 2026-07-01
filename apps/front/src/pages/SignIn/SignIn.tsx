import { Button, Form, Input } from '@transcendence/ui';
import { theme } from '@transcendence/ui/theme';
import { type JSX, useState } from 'react';
import { MsnIcon } from '@transcendence/ui/components/MsnIcon/MsnIcon.js';
import { MsnWordmark } from '@transcendence/ui/components/MsnWordmark/MsnWordmark.js';
import styles from './SignIn.module.scss';

interface SignInValues {
  email: string;
  password: string;
}

export default function SignIn(): JSX.Element {
  const [form] = Form.useForm<SignInValues>();
  const [loading, setLoading] = useState(false);

  // antd calls onFinish only after all the validation rules pass.
  const onFinish = (values: SignInValues): void => {
    setLoading(true);

    // TODO: replace this fake delay with the real backend request later.
    window.setTimeout(() => {
      setLoading(false);
      console.log('Sign-in submitted:', values);

      // --- Want to preview the error state? Uncomment the next line: ---
      // form.setFields([{ name: 'password', errors: ["That password doesn't match our records."] }]);
    }, 1200);
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <MsnIcon name="msn" size="22px" color={theme.orange} />
        <MsnWordmark size={20} accent={theme.orange} />
      </header>

      <main className={styles.main}>
        <div className={styles.cardWrap}>
          <div className={styles.eyebrow}>Welcome back</div>
          <h1 className={styles.title}>Log in to MakeSomeNoise</h1>
          <p className={styles.subtitle}>Pick up your session, your friends, your beats.</p>

          <div className={styles.card}>
            <Form form={form} layout="vertical" requiredMark={false} onFinish={onFinish}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { message: 'Please enter your email.', required: true },
                  { message: "That doesn't look like a valid email.", type: 'email' },
                ]}
              >
                <Input size="large" placeholder="you@example.com" autoFocus />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ message: 'Please enter your password.', required: true }]}
              >
                <Input.Password size="large" placeholder="Your password" />
              </Form.Item>

              <div className={styles.forgotRow}>
                <a className={styles.link} href="#">
                  Forgot password?
                </a>
              </div>

              <Form.Item>
                <Button className={styles.primaryButton} htmlType="submit" block size="large" loading={loading}>
                  {loading ? 'SIGNING IN…' : 'LOG IN →'}
                </Button>
              </Form.Item>
            </Form>
          </div>

          <div className={styles.footer}>
            New here?{' '}
            <a className={styles.link} href="/signup">
              Create an account →
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
