import { useMutation } from '@tanstack/react-query';
import { type AuthUser, useAuthUser, useUser } from '@transcendence/auth';
import { useTranslation } from '@transcendence/i18n';
import { CheckOutlined, CloseCircleOutlined, notification, theme } from '@transcendence/ui';
import { type JSX, useState } from 'react';
import { updateUserProfile } from '../../api/user';
import { AccountSection } from './AccountSection';
import { DangerSection } from './DangerSection';
import { type ProfileErrors } from './dashboard.data';
import styles from './Dashboard.module.scss';
import { DirtyBanner } from './DirtyBanner';
import { ProfileSection } from './ProfileSection';
import { SettingsNav } from './SettingsNav';

function validateProfile(form: AuthUser): ProfileErrors {
  const errors: ProfileErrors = {};
  if (!/^[\w.]+$/.test(form.handle)) {
    errors.handle = 'settings.profile.handleError';
  }
  return errors;
}

export function Dashboard(): JSX.Element {
  const user = useAuthUser();
  const { setAuthUser } = useUser();
  const [saved, setSaved] = useState<AuthUser>(() => user);
  const [form, setForm] = useState<AuthUser>(() => user);
  const [isEditing, setIsEditing] = useState(false);
  const { t } = useTranslation();
  const [notificationApi, notificationContext] = notification.useNotification();

  const notifySuccess = (title: string) => {
    const key = `open${Date.now()}`;

    notificationApi.open({
      duration: 3,
      icon: <CheckOutlined color={theme.green} />,
      key,
      title,
    });
  };

  const notifyError = (error: Error, title: string) => {
    const key = `open${Date.now()}`;

    notificationApi.open({
      description: error.message,
      duration: 3,
      icon: <CloseCircleOutlined color={theme.red} />,
      key,
      title,
    });
  };

  const { mutate: updateUserProfileMutation } = useMutation({
    mutationFn: updateUserProfile,
    onError: (error) => {
      notifyError(error, t('settings.profile.updateFailed'));
    },
    onSuccess: (updated) => {
      setAuthUser(updated);
      setSaved(form);
      setIsEditing(false);
      notifySuccess(t('settings.profile.updated'));
    },
  });

  const errors = validateProfile(form);
  const hasErrors = Object.keys(errors).length > 0;
  // "dirty" = editing AND the copy differs from what's saved.
  const isDirty = isEditing && JSON.stringify(form) !== JSON.stringify(saved);

  const setField = <K extends keyof AuthUser>(key: K, value: AuthUser[K]): void => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const startEditing = (): void => {
    setForm(saved);
    setIsEditing(true);
  };

  const cancel = (): void => {
    setForm(saved);
    setIsEditing(false);
  };

  const save = () => {
    if (hasErrors) return; // leave the banner/inputs showing the errors
    updateUserProfileMutation(form);
  };

  return (
    <div className={styles.page}>
      {notificationContext}
      {isDirty ? <DirtyBanner hasErrors={hasErrors} onDiscard={cancel} onSave={save} /> : null}

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <SettingsNav />
        </aside>

        <div className={styles.sections}>
          <section id="profile">
            <ProfileSection
              avatarUpdatedAt={user.avatarUpdatedAt}
              isEditing={isEditing}
              form={form}
              errors={errors}
              setField={setField}
              notifyError={notifyError}
              notifySuccess={notifySuccess}
              onEdit={startEditing}
              onCancel={cancel}
              onSave={save}
              ownerId={user.ownerId}
            />
          </section>
          <section id="account">
            <AccountSection
              form={form}
              saved={saved}
              setForm={setForm}
              setField={setField}
              saveProfile={updateUserProfileMutation}
            />
          </section>
          <section id="danger">
            <DangerSection handle={saved.handle} />
          </section>
        </div>
      </div>
    </div>
  );
}
