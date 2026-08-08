import { type UseMutateFunction, useMutation } from '@tanstack/react-query';
import type { AuthUser } from '@transcendence/auth';
import { type TranslationKey, useTranslation } from '@transcendence/i18n';
import {
  Button,
  CheckOutlined,
  CloseCircleOutlined,
  Form,
  Input,
  notification,
  theme,
} from '@transcendence/ui';
import { type Dispatch, type JSX, type SetStateAction, useState } from 'react';
import { updateUserPassword } from '../../api/user';
import { PasswordStrength } from '../Register/PasswordStrength';
import styles from './AccountSection.module.scss';
import { FieldText } from './Field';
import { Card, Hr, Row, SectionHeader } from './primitives';

interface AccountSectionProps {
  form: AuthUser;
  saved: AuthUser;
  setForm: Dispatch<SetStateAction<AuthUser>>;
  setField: <K extends keyof AuthUser>(key: K, value: AuthUser[K]) => void;
  saveProfile: UseMutateFunction<AuthUser, Error, AuthUser>;
}

export function AccountSection({
  form,
  saved,
  saveProfile,
  setField,
  setForm,
}: AccountSectionProps): JSX.Element {
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [passwordForm] = Form.useForm<{ oldPassword: string; newPassword: string }>();
  const { t } = useTranslation();
  const [notificationApi, notificationContext] = notification.useNotification();

  // Live value for the strength meter, same pattern as Register.tsx.
  const newPassword = Form.useWatch('newPassword', passwordForm) || '';

  // A key per field rather than an interpolated noun: "Your {{field}} has been
  // updated" cannot be translated correctly for arbitrary nouns.
  const openSuccessNotification = (titleKey: TranslationKey) => {
    const key = `open${Date.now()}`;

    notificationApi.open({
      duration: 3,
      icon: <CheckOutlined color={theme.green} />,
      key,
      title: t(titleKey),
    });
  };

  const openErrorNotification = (error: Error, titleKey: TranslationKey) => {
    const key = `open${Date.now()}`;

    notificationApi.open({
      description: error.message,
      duration: 3,
      icon: <CloseCircleOutlined color={theme.red} />,
      key,
      title: t(titleKey),
    });
  };

  const { mutate: updateUserPasswordMutation } = useMutation({
    mutationFn: updateUserPassword,
    onError: (error) => {
      openErrorNotification(error, 'settings.account.passwordUpdateFailed');
    },
    onSuccess: () => {
      passwordForm.resetFields();
      setIsEditingPassword(false);
      openSuccessNotification('settings.account.passwordUpdated');
    },
  });

  const startEditingEmail = (): void => {
    setForm(saved);
    setIsEditingEmail(true);
  };

  const cancelEmail = (): void => {
    setForm(saved);
    setIsEditingEmail(false);
  };

  const saveEmail = (): void => {
    saveProfile(form, {
      onSuccess: () => {
        setIsEditingEmail(false);
        openSuccessNotification('settings.account.emailUpdated');
      },
    });
  };

  const startEditingPassword = (): void => {
    passwordForm.resetFields();
    setIsEditingPassword(true);
  };

  const cancelPassword = (): void => {
    passwordForm.resetFields();
    setIsEditingPassword(false);
  };

  // antd calls onFinish only after all validation rules pass.
  const savePassword = (values: { oldPassword: string; newPassword: string }): void => {
    updateUserPasswordMutation(values);
    passwordForm.resetFields();
    setIsEditingPassword(false);
  };

  return (
    <div>
      {notificationContext}
      <SectionHeader
        title={t('settings.account.title')}
        subtitle={t('settings.account.subtitle')}
      />

      <Card>
        <Row label={t('auth.fields.email')}>
          <div className={styles.line}>
            <FieldText
              editing={isEditingEmail}
              value={form.email}
              onChange={(v) => {
                setField('email', v);
              }}
            />
            {isEditingEmail ? (
              <>
                <Button size="small" onClick={saveEmail}>
                  {t('common.save')}
                </Button>
                <Button size="small" danger onClick={cancelEmail}>
                  {t('common.cancel')}
                </Button>
              </>
            ) : (
              <Button size="small" onClick={startEditingEmail}>
                {t('settings.account.changeEmail')}
              </Button>
            )}
          </div>
        </Row>
        <Hr />

        <Row label={t('auth.fields.password')}>
          {isEditingPassword ? (
            <Form
              form={passwordForm}
              layout="vertical"
              requiredMark={false}
              onFinish={savePassword}
              style={{ width: '100%' }}
            >
              <Form.Item
                label={t('settings.account.oldPassword')}
                name="oldPassword"
                style={{ marginBottom: 12 }}
                rules={[{ message: t('settings.account.oldPasswordRequired'), required: true }]}
              >
                <Input.Password
                  placeholder={t('settings.account.currentPasswordPlaceholder')}
                  autoComplete="current-password"
                />
              </Form.Item>

              <Form.Item
                label={t('settings.account.newPassword')}
                name="newPassword"
                style={{ marginBottom: 8 }}
                rules={[
                  { message: t('auth.validation.passwordChoose'), required: true },
                  { message: t('auth.validation.minChars', { count: 10 }), min: 10 },
                ]}
              >
                <Input.Password
                  placeholder={t('auth.register.passwordPlaceholder')}
                  autoComplete="new-password"
                />
              </Form.Item>

              {/* Same strength meter as the signup page; renders nothing while empty. */}
              <PasswordStrength value={newPassword} />

              <div className={styles.line}>
                <Button size="small" htmlType="submit">
                  {t('common.save')}
                </Button>
                <Button size="small" danger htmlType="button" onClick={cancelPassword}>
                  {t('common.cancel')}
                </Button>
              </div>
            </Form>
          ) : (
            <div className={styles.line}>
              <FieldText editing={false} value="••••••••••••" />
              <Button size="small" onClick={startEditingPassword}>
                {t('settings.account.changePassword')}
              </Button>
            </div>
          )}
        </Row>
        <Hr />

        <Row label={t('settings.account.memberSince')}>
          {/* TODO: use Dayjs for date formatting*/}
          <span className={styles.mono}>{saved.joined.toString()}</span>
        </Row>
      </Card>
    </div>
  );
}
