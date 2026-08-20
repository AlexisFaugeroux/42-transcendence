import type { JSX } from 'react';
import { Dropdown, type MenuProps } from '@transcendence/ui';
import styles from './Devices.module.scss';
import { EFFECT_ENTRIES } from './effectFactories';
import { useProject } from '../../contexts/ProjectContext';
import type { AudioUnitBoxAdapter } from '@opendaw/studio-adapters';
import { StudioIcon } from '../components/StudioIcon/StudioIcon';

interface AddEffectButtonProps {
  audioUnit: AudioUnitBoxAdapter;
  title: string;
}

export function AddEffectButton({ audioUnit, title }: AddEffectButtonProps): JSX.Element {
  const { project } = useProject();

  const items: MenuProps['items'] = EFFECT_ENTRIES.flatMap(
    ({ accent, family, icon, label }, index) => {
      const item = {
        key: label,
        label,
        icon: <StudioIcon color={accent} name={icon} size={16} style={{ marginRight: '5px' }} />,
        style: { fontSize: '10px' },
      };
      const opensFamily = index > 0 && EFFECT_ENTRIES[index - 1].family !== family;

      return opensFamily ? [{ type: 'divider' as const }, item] : [item];
    },
  );

  return (
    <Dropdown
      menu={{
        items,
        onClick: ({ key }) => {
          const targetEffect = EFFECT_ENTRIES.find((effect) => effect.label === key);
          if (!targetEffect) return;

          project.editing.modify(() =>
            project.api.insertEffect(audioUnit.audioEffectsField, targetEffect.factory),
          );
        },
      }}
      trigger={['click']}
    >
      <button type="button" className={styles.add} title={title}>
        +
      </button>
    </Dropdown>
  );
}
