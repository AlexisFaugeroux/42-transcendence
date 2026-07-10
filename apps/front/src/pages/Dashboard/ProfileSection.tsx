import { Avatar, Button, Tag } from '@transcendence/ui';
import type { JSX } from 'react';
import { MsnIcon } from '@ui/components/MsnIcon/MsnIcon';
import type { ProfileErrors, UserProfile } from './dashboard.data';
import { FieldArea, FieldText } from './Field';
import { Card, Hr, Row, SectionHeader } from './primitives';
import styles from './ProfileSection.module.scss';

interface ProfileSectionProps {
  editing: boolean;
  form: UserProfile;
  errors: ProfileErrors;
  setField: <K extends keyof UserProfile>(key: K, value: UserProfile[K]) => void;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
}

export function ProfileSection({
  editing,
  errors,
  form,
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
          editing ? (
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
            <Avatar size={64}>{form.alias.charAt(0)}</Avatar>
            {editing ? (
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
            editing={editing}
            value={form.alias}
            onChange={(v) => {
              setField('alias', v);
            }}
            placeholder="Your artist name"
          />
        </Row>
        <Hr />

        <Row label="Handle" hint="Used in your URL: makesomenoise.fm/@…">
          <FieldText
            editing={editing}
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
            editing={editing}
            value={form.location}
            onChange={(v) => {
              setField('location', v);
            }}
            placeholder="City, country"
          />
        </Row>
        <Hr />

        <Row label="Bio" hint="Up to 240 characters">
          <FieldArea
            editing={editing}
            value={form.bio}
            onChange={(v) => {
              setField('bio', v);
            }}
            max={240}
          />
        </Row>
        <Hr />

        <Row label="Links" hint="Site, SoundCloud, Bandcamp, etc.">
          <div className={styles.links}>
            {form.links.map((link, index) => (
              <div key={index} className={styles.linkRow}>
                <Tag color="blue">{link.kind}</Tag>
                <FieldText
                  editing={editing}
                  value={link.url}
                  onChange={(v) => {
                    const next = [...form.links];
                    next[index] = { ...next[index], url: v };
                    setField('links', next);
                  }}
                />
                {editing ? (
                  <Button
                    type="text"
                    size="small"
                    onClick={() => {
                      setField(
                        'links',
                        form.links.filter((_, j) => j !== index),
                      );
                    }}
                  >
                    ✕
                  </Button>
                ) : null}
              </div>
            ))}
            {editing ? (
              <Button
                size="small"
                className={styles.addLink}
                onClick={() => {
                  setField('links', [...form.links, { kind: 'site', url: '' }]);
                }}
              >
                <MsnIcon name="plus" size="11px" /> Add link
              </Button>
            ) : null}
          </div>
        </Row>
      </Card>

      {editing ? (
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
