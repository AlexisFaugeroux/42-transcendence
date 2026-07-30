import { type TranslationKey, useTranslation } from '@transcendence/i18n';
import type { JSX } from 'react';

interface PasswordStrengthProps {
  value: string;
}

// Five colors keyed by score 0..5 (red → orange → yellow → green). From design/signup.jsx.
const COLORS = [
  'hsl(8, 85%, 55%)', // 0
  'hsl(8, 85%, 55%)', // 1
  'hsl(25, 90%, 55%)', // 2
  'hsl(45, 95%, 55%)', // 3
  'hsl(140, 65%, 45%)', // 4
  'hsl(140, 65%, 45%)', // 5
];
const LABEL_KEYS: TranslationKey[] = [
  'auth.passwordStrength.tooShort',
  'auth.passwordStrength.weak',
  'auth.passwordStrength.ok',
  'auth.passwordStrength.good',
  'auth.passwordStrength.strong',
  'auth.passwordStrength.excellent',
];

function scorePassword(pw: string): number {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^\w\s]/.test(pw)) score++;
  return score;
}

export function PasswordStrength({ value }: PasswordStrengthProps): JSX.Element | null {
  const { t } = useTranslation();

  // Nothing to show until the user types something.
  if (!value) return null;

  const score = scorePassword(value);
  const color = COLORS[score] ?? 'hsl(0, 0%, 38%)';

  return (
    <div style={{ alignItems: 'center', display: 'flex', gap: 8, margin: '0 0 12px' }}>
      <div style={{ display: 'flex', flex: 1, gap: 3 }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            style={{
              background: i < score ? color : 'hsl(197, 14%, 3%)',
              borderRadius: 1,
              boxShadow: i < score ? `0 0 4px -1px ${color}` : 'none',
              flex: 1,
              height: 3,
            }}
          />
        ))}
      </div>
      <span
        style={{
          color,
          fontFamily: 'ui-monospace, monospace',
          fontSize: 10,
          letterSpacing: 0.4,
          textTransform: 'uppercase',
        }}
      >
        {t(LABEL_KEYS[score])}
      </span>
    </div>
  );
}
