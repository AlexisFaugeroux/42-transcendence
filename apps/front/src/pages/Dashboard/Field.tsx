import { Input } from '@transcendence/ui';
import type { JSX } from 'react';

interface FieldTextProps {
  editing: boolean;
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  prefix?: string;
  error?: string;
}

export function FieldText({ editing, error, onChange, placeholder, prefix, value }: FieldTextProps): JSX.Element {
  if (!editing) {
    return (
      <span style={{ color: 'var(--fg1)', fontSize: 13 }}>
        {prefix ? <span style={{ color: 'var(--fg3)' }}>{prefix}</span> : null}
        {value || <span style={{ color: 'var(--fg3)' }}>—</span>}
      </span>
    );
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: '100%' }}>
      <Input
        value={value}
        prefix={prefix}
        placeholder={placeholder}
        status={error ? 'error' : undefined}
        onChange={(event) => {
          onChange?.(event.target.value);
        }}
      />
      {error ? <span style={{ color: 'var(--color-red)', fontSize: 11 }}>{error}</span> : null}
    </div>
  );
}

interface FieldAreaProps {
  editing: boolean;
  value: string;
  onChange: (value: string) => void;
  max?: number;
}

export function FieldArea({ editing, max, onChange, value }: FieldAreaProps): JSX.Element {
  if (!editing) {
    return (
      <span style={{ color: 'var(--fg1)', fontSize: 13, lineHeight: 1.55, whiteSpace: 'pre-wrap' }}>
        {value || <span style={{ color: 'var(--fg3)' }}>—</span>}
      </span>
    );
  }
  // antd's TextArea gives us the character counter for free via showCount + maxLength.
  return (
    <Input.TextArea
      value={value}
      rows={3}
      maxLength={max}
      showCount
      onChange={(event) => {
        onChange(event.target.value);
      }}
      style={{ width: '100%' }}
    />
  );
}
