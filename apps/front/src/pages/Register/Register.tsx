import { useMutation } from '@tanstack/react-query';
import type { ApiErrorReponse } from '@transcendence/auth';
import { Button, CheckOutlined, Form, Input, notification } from '@transcendence/ui';
import type { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { MsnIcon } from '@ui/components/MsnIcon/MsnIcon';
import { MsnWordmark } from '@ui/components/MsnWordmark/MsnWordmark';
import { theme } from '@ui/theme/theme';
import { registerRequest } from '../../api/auth';
import type { RegisterBody } from '../../api/types';
import { PasswordStrength } from './PasswordStrength';
import styles from './Register.module.scss';

export default function Register(): JSX.Element {
  const [form] = Form.useForm<RegisterBody>();
  const navigate = useNavigate();
  const [notificationApi, notificationContext] = notification.useNotification();

  const openNotification = () => {
    const key = `open${Date.now()}`;

    notificationApi.open({
      description: "You'll be redirected to the login page in a few seconds",
      duration: 3,
      icon: <CheckOutlined color={theme.green} />,
      key,
      onClose: () => void navigate('/login'),
      title: "You've succesffuly registered !",
    });
  };

  const { isPending, mutate: registerMutation } = useMutation({
    mutationFn: registerRequest,
    onError: (error: ApiErrorReponse) => {
      if (error.status === 409) {
        form.setFields([
          { errors: ['Email, artist name or handle already taken.'], name: 'email' },
          { errors: ['Email, artist name or handle already taken.'], name: 'artistName' },
          { errors: ['Email, artist name or handle already taken.'], name: 'handle' },
        ]);
      }
    },
    onSuccess: () => {
      openNotification();
    },
  });

  // Form.useWatch gives us the live value of one field, so the strength meter
  // re-renders on every keystroke without us managing a separate useState.
  const password = Form.useWatch('password', form) || '';

  // antd calls onFinish only after all the validation rules pass.
  const onFinish = (values: RegisterBody) => {
    registerMutation(values);
  };

  return (
    <div className={styles.page}>
      {notificationContext}
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
                <Input size="large" placeholder="you@example.com" autoFocus autoComplete="off" />
              </Form.Item>

              <Form.Item
                label="First name"
                name="firstname"
                rules={[{ message: 'Please enter your first name.', required: true }]}
              >
                <Input size="large" placeholder="Lex" autoComplete="off" />
              </Form.Item>

              <Form.Item
                label="Last name"
                name="lastname"
                rules={[{ message: 'Please enter your last name.', required: true }]}
              >
                <Input size="large" placeholder="Moreau" autoComplete="off" />
              </Form.Item>

              <Form.Item
                label="Artist name"
                name="artistName"
                extra="Your public producer name. Shown on your profile and tracks."
                rules={[
                  { message: 'Please choose an artist name.', required: true },
                  { message: 'At least 3 characters.', min: 3 },
                ]}
              >
                <Input size="large" placeholder="Lex Moreau" autoComplete="off" />
              </Form.Item>

              <Form.Item
                label="Handle"
                name="handle"
                extra="Used in your profile URL: makesomenoise.fm/@…"
                rules={[
                  { message: 'Please choose a handle.', required: true },
                  { message: 'At least 3 characters.', min: 3 },
                  { message: 'Only letters, numbers, dot and underscore.', pattern: /^[\w.]+$/ },
                ]}
              >
                <Input size="large" prefix="@" placeholder="lexmoreau" autoComplete="off" />
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
                <Button className={styles.primaryButton} htmlType="submit" block size="large" loading={isPending}>
                  {isPending ? 'Creating account…' : 'Create account'}
                </Button>
              </Form.Item>
            </Form>
          </div>

          <div className={styles.footer}>
            Already have an account?{' '}
            <a className={styles.link} onClick={() => void navigate('/login')}>
              Log in →
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
