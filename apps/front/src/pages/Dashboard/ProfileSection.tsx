import type { AuthUser } from '@transcendence/auth';
import { Avatar, Button, Tag } from '@transcendence/ui';
import type { JSX } from 'react';
import { MsnIcon } from '@ui/components/MsnIcon/MsnIcon';
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
  return (
    <div>
      <SectionHeader
        title="Profile"
        subtitle="Public information shown on your producer page."
        right={
          isEditing ? (
            <span className={styles.editingTag}>● Editing</span>
          ) : (
            <Button onClick={onEdit}>
              <MsnIcon name="settings" size="11px" /> Edit profile
            </Button>
          )
        }
      />

      <Card>
        <Row label="Avatar">
          <div className={styles.avatarRow}>
            <Avatar size={64}>{form.artistName.slice(0, 2).toUpperCase()}</Avatar>
            {isEditing ? (
              <div className={styles.avatarActions}>
                <Button size="small">Upload image</Button>
                <Button size="small" danger>
                  Remove
                </Button>
              </div>
            ) : null}
          </div>
        </Row>
        <Hr />

        <Row label="Producer alias">
          <FieldText
            editing={isEditing}
            value={form.artistName}
            onChange={(v) => {
              setField('artistName', v);
            }}
            placeholder="Your artist name"
          />
        </Row>
        <Hr />

        <Row label="Handle" hint="Used in your URL: makesomenoise.fm/@…">
          <FieldText
            editing={isEditing}
            value={form.handle}
            onChange={(v) => {
              setField('handle', v);
            }}
            prefix="@"
            error={errors.handle}
          />
        </Row>
        <Hr />

        <Row label="Location">
          <FieldText
            editing={isEditing}
            value={form.location ?? ''}
            onChange={(v) => {
              setField('location', v);
            }}
            placeholder="City, country"
          />
        </Row>
        <Hr />

        <Row label="Bio" hint="Up to 240 characters">
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

        <Row label="Links" hint="Site, SoundCloud, Bandcamp, etc.">
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
                <MsnIcon name="plus" size="11px" /> Add link
              </Button>
            ) : null}
          </div>
        </Row>
      </Card>

      {isEditing ? (
        <div className={styles.actions}>
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" onClick={onSave}>
            Save changes
          </Button>
        </div>
      ) : null}
    </div>
  );
}
