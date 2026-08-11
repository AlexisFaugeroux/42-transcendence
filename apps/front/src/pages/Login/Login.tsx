import { useMutation } from '@tanstack/react-query';
import { useUser } from '@transcendence/auth';
import type { LoginBody } from '@transcendence/auth';
import { useTranslation } from '@transcendence/i18n';
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
  const { t } = useTranslation();

  const { isPending, mutate: loginMutation } = useMutation({
    mutationFn: login,
    onError: () => {
      form.setFields([
        { errors: [t('auth.login.invalidCredentials')], name: 'email' },
        { errors: [t('auth.login.invalidCredentials')], name: 'password' },
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
          <div className={styles.eyebrow}>{t('auth.login.eyebrow')}</div>
          <h1 className={styles.title}>{t('auth.login.title')}</h1>
          <p className={styles.subtitle}>{t('auth.login.subtitle')}</p>

          <div className={styles.card}>
            <Form form={form} layout="vertical" requiredMark={false} onFinish={onFinish}>
              <Form.Item
                label={t('auth.fields.email')}
                name="email"
                rules={[
                  { message: t('auth.validation.emailRequired'), required: true },
                  { message: t('auth.validation.emailInvalid'), type: 'email' },
                ]}
              >
                <Input size="large" placeholder="you@example.com" autoFocus autoComplete="off" />
              </Form.Item>

              <Form.Item
                label={t('auth.fields.password')}
                name="password"
                rules={[{ message: t('auth.validation.passwordRequired'), required: true }]}
              >
                <Input.Password size="large" placeholder={t('auth.login.passwordPlaceholder')} />
              </Form.Item>

              <div className={styles.forgotRow}>
                <a className={styles.link} href="#">
                  {t('auth.login.forgotPassword')}
                </a>
              </div>

              <Form.Item>
                <Button className={styles.primaryButton} htmlType="submit" block size="large" loading={isPending}>
                  {isPending ? t('auth.login.submitting') : t('auth.login.submit')}
                </Button>
              </Form.Item>
            </Form>
          </div>

          <div className={styles.footer}>
            {t('auth.login.newHere')}{' '}
            <a className={styles.link} href="/register">
              {t('auth.login.createAccount')}
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
