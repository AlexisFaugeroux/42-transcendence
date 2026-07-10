import type { JSX } from 'react';
import { MsnIcon } from '@ui/components/MsnIcon/MsnIcon';
import type { MsnIconLabel } from '@ui/components/MsnIcon/types';

interface CoverArtProps {
  size?: number;
  accent: string;
  icon: MsnIconLabel;
}

export function CoverArt({ accent, icon, size = 36 }: CoverArtProps): JSX.Element {
  return (
    <div
      style={{
        alignItems: 'center',
        background: `color-mix(in srgb, ${accent} 22%, hsl(197, 14%, 3%))`,
        borderRadius: 4,
        boxShadow: `inset 0 0 0 0.5px ${accent}`,
        color: accent,
        display: 'flex',
        height: size,
        justifyContent: 'center',
        width: size,
      }}
    >
      <MsnIcon name={icon} size={`${Math.round(size * 0.5)}px`} />
    </div>
  );
}
