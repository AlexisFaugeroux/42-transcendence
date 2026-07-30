import type { AuthUser } from '@transcendence/auth';
import { useTranslation } from '@transcendence/i18n';
import { Avatar, Button, MsnIcon, Tag } from '@transcendence/ui';
import type { JSX } from 'react';
import type { ProfileErrors } from './dashboard.data';
import { FieldArea, FieldText } from './Field';
import { Card, Hr, Row, SectionHeader } from './primitives';
import styles from './ProfileSection.module.scss';

interface ProfileSectionProps {
  isEditing: boolean;
  form: AuthUser;
  errors: ProfileErrors;
  setField: <K extends keyof AuthUser>(key: K, value: AuthUser[K]) => void;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
}

export function ProfileSection({
  errors,
  form,
  isEditing,
  onCancel,
  onEdit,
  onSave,
  setField,
}: ProfileSectionProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <div>
      <SectionHeader
        title={t('settings.profile.title')}
        subtitle={t('settings.profile.subtitle')}
        right={
          isEditing ? (
            <span className={styles.editingTag}>● {t('settings.profile.editing')}</span>
          ) : (
            <Button onClick={onEdit}>
              <MsnIcon name="settings" size="11px" /> {t('settings.profile.edit')}
            </Button>
          )
        }
      />

      <Card>
        <Row label={t('settings.profile.avatar')}>
          <div className={styles.avatarRow}>
            <Avatar size={64}>{form.artistName.slice(0, 2).toUpperCase()}</Avatar>
            {isEditing ? (
              <div className={styles.avatarActions}>
                <Button size="small">{t('settings.profile.uploadImage')}</Button>
                <Button size="small" danger>
                  {t('common.remove')}
                </Button>
              </div>
            ) : null}
          </div>
        </Row>
        <Hr />

        <Row label={t('settings.profile.alias')}>
          <FieldText
            editing={isEditing}
            value={form.artistName}
            onChange={(v) => {
              setField('artistName', v);
            }}
            placeholder={t('settings.profile.aliasPlaceholder')}
          />
        </Row>
        <Hr />

        <Row label={t('settings.profile.handle')} hint={t('settings.profile.handleHint')}>
          <FieldText
            editing={isEditing}
            value={form.handle}
            onChange={(v) => {
              setField('handle', v);
            }}
            prefix="@"
            error={errors.handle ? t(errors.handle) : undefined}
          />
        </Row>
        <Hr />

        <Row label={t('settings.profile.location')}>
          <FieldText
            editing={isEditing}
            value={form.location ?? ''}
            onChange={(v) => {
              setField('location', v);
            }}
            placeholder={t('settings.profile.locationPlaceholder')}
          />
        </Row>
        <Hr />

        <Row label={t('settings.profile.bio')} hint={t('settings.profile.bioHint', { count: 240 })}>
          <FieldArea
            editing={isEditing}
            value={form.bio ?? ''}
            onChange={(v) => {
              setField('bio', v);
            }}
            max={240}
          />
        </Row>
        <Hr />

        <Row label={t('settings.profile.links')} hint={t('settings.profile.linksHint')}>
          <div className={styles.links}>
            {form.links?.map((link, index) => (
              <div key={index} className={styles.linkRow}>
                <Tag color="blue">{link.kind}</Tag>
                <FieldText
                  editing={isEditing}
                  value={link.url}
                  onChange={(v) => {
                    if (form.links) {
                      const next = [...form.links];
                      next[index] = { ...next[index], url: v };
                      setField('links', next);
                    }
                  }}
                />
                {isEditing ? (
                  <Button
                    type="text"
                    size="small"
                    onClick={() => {
                      if (form.links) {
                        setField(
                          'links',
                          form.links.filter((_, j) => j !== index),
                        );
                      }
                    }}
                  >
                    ✕
                  </Button>
                ) : null}
              </div>
            ))}
            {isEditing ? (
              <Button
                size="small"
                className={styles.addLink}
                onClick={() => {
                  if (form.links) {
                    setField('links', [...form.links, { kind: 'site', url: '' }]);
                  }
                }}
              >
                <MsnIcon name="plus" size="11px" /> {t('settings.profile.addLink')}
              </Button>
            ) : null}
          </div>
        </Row>
      </Card>

      {isEditing ? (
        <div className={styles.actions}>
          <Button onClick={onCancel}>{t('common.cancel')}</Button>
          <Button type="primary" onClick={onSave}>
            {t('settings.saveChanges')}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
