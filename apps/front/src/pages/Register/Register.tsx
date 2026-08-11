import { useMutation } from '@tanstack/react-query';
import type { ApiErrorReponse } from '@transcendence/auth';
import { Trans, useTranslation } from '@transcendence/i18n';
import { Button, CheckOutlined, Form, Input, MsnIcon, MsnWordmark, notification, theme } from '@transcendence/ui';
import type { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerRequest } from '../../api/auth/auth';
import type { RegisterBody } from '../../api/auth/types';
import { PasswordStrength } from './PasswordStrength';
import styles from './Register.module.scss';

export default function Register(): JSX.Element {
  const [form] = Form.useForm<RegisterBody>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [notificationApi, notificationContext] = notification.useNotification();

  const openNotification = () => {
    const key = `open${Date.now()}`;

    notificationApi.open({
      description: t('auth.register.successDescription'),
      duration: 3,
      icon: <CheckOutlined color={theme.green} />,
      key,
      onClose: () => void navigate('/login'),
      title: t('auth.register.successTitle'),
    });
  };

  const { isPending, mutate: registerMutation } = useMutation({
    mutationFn: registerRequest,
    onError: (error: ApiErrorReponse) => {
      if (error.status === 409) {
        form.setFields([
          { errors: [t('auth.register.alreadyTaken')], name: 'email' },
          { errors: [t('auth.register.alreadyTaken')], name: 'artistName' },
          { errors: [t('auth.register.alreadyTaken')], name: 'handle' },
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
          <div className={styles.eyebrow}>{t('auth.register.eyebrow')}</div>
          <h1 className={styles.title}>{t('auth.register.title')}</h1>
          <p className={styles.subtitle}>{t('auth.register.subtitle')}</p>

          <div className={styles.card}>
            <Form className={styles.form} form={form} layout="vertical" requiredMark={false} onFinish={onFinish}>
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
                label={t('auth.fields.firstname')}
                name="firstname"
                rules={[{ message: t('auth.validation.firstnameRequired'), required: true }]}
              >
                <Input size="large" placeholder="Lex" autoComplete="off" />
              </Form.Item>

              <Form.Item
                label={t('auth.fields.lastname')}
                name="lastname"
                rules={[{ message: t('auth.validation.lastnameRequired'), required: true }]}
              >
                <Input size="large" placeholder="Moreau" autoComplete="off" />
              </Form.Item>

              <Form.Item
                label={t('auth.fields.artistName')}
                name="artistName"
                extra={t('auth.register.artistNameHint')}
                rules={[
                  { message: t('auth.validation.artistNameRequired'), required: true },
                  { message: t('auth.validation.minChars', { count: 3 }), min: 3 },
                ]}
              >
                <Input size="large" placeholder="Lex Moreau" autoComplete="off" />
              </Form.Item>

              <Form.Item
                label={t('auth.fields.handle')}
                name="handle"
                extra={t('auth.register.handleHint')}
                rules={[
                  { message: t('auth.validation.handleRequired'), required: true },
                  { message: t('auth.validation.minChars', { count: 3 }), min: 3 },
                  { message: t('auth.validation.handlePattern'), pattern: /^[\w.]+$/ },
                ]}
              >
                <Input size="large" prefix="@" placeholder="lexmoreau" autoComplete="off" />
              </Form.Item>

              <Form.Item
                label={t('auth.fields.password')}
                name="password"
                style={{ marginBottom: 8 }}
                rules={[
                  { message: t('auth.validation.passwordChoose'), required: true },
                  { message: t('auth.validation.minChars', { count: 10 }), min: 10 },
                ]}
              >
                <Input.Password size="large" placeholder={t('auth.register.passwordPlaceholder')} />
              </Form.Item>

              {/* Lives just under the password field; renders nothing while empty. */}
              <PasswordStrength value={password} />

              <p className={styles.terms}>
                <Trans
                  i18nKey="auth.register.termsNotice"
                  components={{
                    privacy: <a className={styles.termsLink} onClick={() => void navigate('/privacy')} />,
                    terms: <a className={styles.termsLink} onClick={() => void navigate('/terms')} />,
                  }}
                />
              </p>

              <Form.Item>
                <Button className={styles.primaryButton} htmlType="submit" block size="large" loading={isPending}>
                  {isPending ? t('auth.register.submitting') : t('auth.register.submit')}
                </Button>
              </Form.Item>
            </Form>
          </div>

          <div className={styles.footer}>
            {t('auth.register.haveAccount')}{' '}
            <a className={styles.link} onClick={() => void navigate('/login')}>
              {t('auth.register.loginLink')}
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
