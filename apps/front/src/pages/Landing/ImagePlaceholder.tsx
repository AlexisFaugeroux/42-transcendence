import type { CSSProperties, JSX } from 'react';

interface ImagePlaceholderProps {
  label: string;
  height?: number;
  accent?: string;
  style?: CSSProperties;
}

export function ImagePlaceholder({
  accent = 'hsl(25, 90%, 55%)',
  height = 240,
  label,
  style,
}: ImagePlaceholderProps): JSX.Element {
  return (
    <div
      style={{
        alignItems: 'center',
        background:
          'repeating-linear-gradient(135deg, hsl(197,14%,12%) 0 14px, hsl(197,14%,8%) 14px 28px)',
        border: '0.5px solid rgba(255, 255, 255, 0.07)',
        borderRadius: 4,
        display: 'flex',
        height,
        justifyContent: 'center',
        overflow: 'hidden',
        width: '100%',
        ...style,
      }}
    >
      <span
        style={{
          background: 'hsl(197, 14%, 3%)',
          border: `0.5px dashed ${accent}`,
          borderRadius: 2,
          color: 'hsl(0, 0%, 38%)',
          fontFamily: 'ui-monospace, monospace',
          fontSize: 11,
          maxWidth: '90%',
          overflow: 'hidden',
          padding: '4px 10px',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        <span style={{ color: accent }}>// </span>
        {label}
      </span>
    </div>
  );
}
