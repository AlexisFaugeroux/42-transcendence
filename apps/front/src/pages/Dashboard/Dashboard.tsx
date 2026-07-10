import { message } from '@transcendence/ui';
import { type JSX, useState } from 'react';
import { AppHeader } from '../../components/AppHeader/AppHeader';
import { AccountSection } from './AccountSection';
import { DangerSection } from './DangerSection';
import { SAVED_USER, type UserProfile, validateProfile } from './dashboard.data';
import styles from './Dashboard.module.scss';
import { DirtyBanner } from './DirtyBanner';
import { ProfileSection } from './ProfileSection';
import { SettingsNav } from './SettingsNav';

export function Dashboard(): JSX.Element {
  const [saved, setSaved] = useState<UserProfile>(SAVED_USER); // committed data
  const [form, setForm] = useState<UserProfile>(SAVED_USER); // editable copy
  const [editing, setEditing] = useState(false);

  const errors = validateProfile(form);
  const hasErrors = Object.keys(errors).length > 0;
  // "dirty" = editing AND the copy differs from what's saved.
  const isDirty = editing && JSON.stringify(form) !== JSON.stringify(saved);

  const setField = <K extends keyof UserProfile>(key: K, value: UserProfile[K]): void => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const startEditing = (): void => {
    setForm(saved);
    setEditing(true);
  };

  const cancel = (): void => {
    setForm(saved);
    setEditing(false);
  };

  const save = (): void => {
    if (hasErrors) return; // leave the banner/inputs showing the errors
    setSaved(form); // commit
    setEditing(false);
    // TODO (backend): send `form` to the server here.
    void message.success('Profile saved.');
  };

  return (
    <div className={styles.page}>
      <AppHeader active="settings" />
      {isDirty ? <DirtyBanner hasErrors={hasErrors} onDiscard={cancel} onSave={save} /> : null}

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <SettingsNav />
        </aside>

        <div className={styles.sections}>
          <section id="profile">
            <ProfileSection
              editing={editing}
              form={form}
              errors={errors}
              setField={setField}
              onEdit={startEditing}
              onCancel={cancel}
              onSave={save}
            />
          </section>
          <section id="account">
            <AccountSection email={saved.email} joined={saved.joined} />
          </section>
          <section id="danger">
            <DangerSection handle={saved.handle} />
          </section>
        </div>
      </div>
    </div>
  );
}
