import { useMutation } from '@tanstack/react-query';
import { useUser } from '@transcendence/auth';
import type { LoginBody } from '@transcendence/auth';
import { Button, Form, Input, MsnIcon, MsnWordmark, theme } from '@transcendence/ui';
import { type JSX } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { safeRedirect } from './helpers.ts';
import styles from './Login.module.scss';

export default function Login(): JSX.Element {
  const { login } = useUser();
  const [form] = Form.useForm<LoginBody>();
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const { isPending, mutate: loginMutation } = useMutation({
    mutationFn: login,
    onError: () => {
      form.setFields([
        { errors: ['Invalid email or password.'], name: 'email' },
        { errors: ['Invalid email or password.'], name: 'password' },
      ]);
    },
    onSuccess: () => {
      const target = safeRedirect(params.get('redirect'));
      if (target.startsWith('/studio')) {
        window.location.href = target;
      } else {
        void navigate(target, { replace: true });
      }
    },
  });

  const onFinish = (values: LoginBody) => {
    loginMutation(values);
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
                <Input size="large" placeholder="you@example.com" autoFocus autoComplete="off" />
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
                <Button className={styles.primaryButton} htmlType="submit" block size="large" loading={isPending}>
                  {isPending ? 'SIGNING IN…' : 'LOG IN →'}
                </Button>
              </Form.Item>
            </Form>
          </div>

          <div className={styles.footer}>
            New here?{' '}
            <a className={styles.link} href="/register">
              Create an account →
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
