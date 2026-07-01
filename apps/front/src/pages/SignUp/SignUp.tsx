import { Button, Form, Input } from '@transcendence/ui';
import { type JSX, useState } from 'react';
import { MsnIcon } from '@ui/components/MsnIcon/MsnIcon';
import { MsnWordmark } from '@ui/components/MsnWordmark/MsnWordmark';
import { theme } from '@ui/theme/theme';
import { PasswordStrength } from './PasswordStrength';
import styles from './SignUp.module.scss';

interface SignUpValues {
  email: string;
  username: string;
  alias: string;
  password: string;
}

export default function SignUp(): JSX.Element {
  const [form] = Form.useForm<SignUpValues>();
  const [loading, setLoading] = useState(false);

  // Form.useWatch gives us the live value of one field, so the strength meter
  // re-renders on every keystroke without us managing a separate useState.
  const password = Form.useWatch('password', form) || '';

  // antd calls onFinish only after all the validation rules pass.
  const onFinish = (values: SignUpValues): void => {
    setLoading(true);

    // TODO: replace this fake delay with the real backend request later.
    window.setTimeout(() => {
      setLoading(false);
      console.log('Sign-up submitted:', values);

      // --- Want to preview the error state? Uncomment these lines: ---
      form.setFields([
        { errors: ['An account with that email already exists.'], name: 'email' },
        { errors: ['Handle is taken — try rosa.99 or rosa_p'], name: 'username' },
      ]);
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
          <div className={styles.eyebrow}>Get started</div>
          <h1 className={styles.title}>Create your account</h1>
          <p className={styles.subtitle}>Free during beta. No tracking, no credit card.</p>

          <div className={styles.card}>
            <Form className={styles.form} form={form} layout="vertical" requiredMark={false} onFinish={onFinish}>
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
                label="Username"
                name="username"
                extra="Letters, numbers, dot, underscore"
                rules={[
                  { message: 'Please choose a username.', required: true },
                  { message: 'At least 3 characters.', min: 3 },
                  { message: 'Only letters, numbers, dot and underscore.', pattern: /^[\w.]+$/ },
                ]}
              >
                <Input size="large" prefix="@" placeholder="lex.moreau" />
              </Form.Item>

              <Form.Item
                label="Producer alias"
                name="alias"
                extra="Visible on your profile"
                rules={[{ message: 'Please enter your artist name.', required: true }]}
              >
                <Input size="large" placeholder="Your artist name" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                style={{ marginBottom: 8 }}
                rules={[
                  { message: 'Please choose a password.', required: true },
                  { message: 'At least 10 characters.', min: 10 },
                ]}
              >
                <Input.Password size="large" placeholder="At least 10 characters" />
              </Form.Item>

              {/* Lives just under the password field; renders nothing while empty. */}
              <PasswordStrength value={password} />

              <p className={styles.terms}>
                By creating an account you agree to our{' '}
                <a className={styles.termsLink} href="#">
                  Terms
                </a>{' '}
                and{' '}
                <a className={styles.termsLink} href="#">
                  Privacy policy
                </a>
                .
              </p>

              <Form.Item>
                <Button className={styles.primaryButton} htmlType="submit" block size="large" loading={loading}>
                  {loading ? 'Creating account…' : 'Create account'}
                </Button>
              </Form.Item>
            </Form>
          </div>

          <div className={styles.footer}>
            Already have an account?{' '}
            <a className={styles.link} href="/login">
              Log in →
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
////https://ant.design/components/overview
