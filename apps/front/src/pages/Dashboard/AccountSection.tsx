import { type UseMutateFunction, useMutation } from '@tanstack/react-query';
import { Button, CheckOutlined, CloseCircleOutlined, Form, Input, notification } from '@transcendence/ui';
import { type Dispatch, type JSX, type SetStateAction, useState } from 'react';
import type { AuthUser } from '@auth/src';
import { theme } from '@ui/theme/theme';
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

export function AccountSection({ form, saved, saveProfile, setField, setForm }: AccountSectionProps): JSX.Element {
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [passwordForm] = Form.useForm<{ oldPassword: string; newPassword: string }>();
  const [notificationApi, notificationContext] = notification.useNotification();

  // Live value for the strength meter, same pattern as Register.tsx.
  const newPassword = Form.useWatch('newPassword', passwordForm) || '';

  const openSuccessNotification = (field: string) => {
    const key = `open${Date.now()}`;

    notificationApi.open({
      duration: 3,
      icon: <CheckOutlined color={theme.green} />,
      key,
      title: `Your ${field} has been updated`,
    });
  };

  const openErrorNotification = (error: Error, field: string) => {
    const key = `open${Date.now()}`;

    notificationApi.open({
      description: error.message,
      duration: 3,
      icon: <CloseCircleOutlined color={theme.red} />,
      key,
      title: `Your ${field} could not be updated`,
    });
  };

  const { mutate: updateUserPasswordMutation } = useMutation({
    mutationFn: updateUserPassword,
    onError: (error) => {
      openErrorNotification(error, 'password');
    },
    onSuccess: () => {
      passwordForm.resetFields();
      setIsEditingPassword(false);
      openSuccessNotification('password');
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
        openSuccessNotification('email');
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
      <SectionHeader title="Account" subtitle="Login credentials and security." />

      <Card>
        <Row label="Email">
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
                  Save
                </Button>
                <Button size="small" danger onClick={cancelEmail}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button size="small" onClick={startEditingEmail}>
                Change email
              </Button>
            )}
          </div>
        </Row>
        <Hr />

        <Row label="Password">
          {isEditingPassword ? (
            <Form
              form={passwordForm}
              layout="vertical"
              requiredMark={false}
              onFinish={savePassword}
              style={{ width: '100%' }}
            >
              <Form.Item
                label="Old password"
                name="oldPassword"
                style={{ marginBottom: 12 }}
                rules={[{ message: 'Please enter your current password.', required: true }]}
              >
                <Input.Password placeholder="Current password" autoComplete="current-password" />
              </Form.Item>

              <Form.Item
                label="New password"
                name="newPassword"
                style={{ marginBottom: 8 }}
                rules={[
                  { message: 'Please choose a password.', required: true },
                  { message: 'At least 10 characters.', min: 10 },
                ]}
              >
                <Input.Password placeholder="At least 10 characters" autoComplete="new-password" />
              </Form.Item>

              {/* Same strength meter as the signup page; renders nothing while empty. */}
              <PasswordStrength value={newPassword} />

              <div className={styles.line}>
                <Button size="small" htmlType="submit">
                  Save
                </Button>
                <Button size="small" danger htmlType="button" onClick={cancelPassword}>
                  Cancel
                </Button>
              </div>
            </Form>
          ) : (
            <div className={styles.line}>
              <FieldText editing={false} value="••••••••••••" />
              <Button size="small" onClick={startEditingPassword}>
                Change password
              </Button>
            </div>
          )}
        </Row>
        <Hr />

        <Row label="Member since">
          {/* TODO: use Dayjs for date formatting*/}
          <span className={styles.mono}>{saved.joined.toString()}</span>
        </Row>
      </Card>
    </div>
  );
}
