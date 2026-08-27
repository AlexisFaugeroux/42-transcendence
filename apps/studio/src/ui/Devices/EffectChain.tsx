import type { AudioEffectDeviceAdapter, AudioUnitBoxAdapter } from '@opendaw/studio-adapters';
import { useTranslation } from '@transcendence/i18n';
import { BorderBeam, theme } from '@transcendence/ui';
import { type DragEvent, Fragment, type JSX, useState } from 'react';
import { useProject } from '../../contexts/ProjectContext';
import { AddEffectButton } from './AddEffectButton';
import { DeviceEditor } from './DeviceEditor';
import styles from './EffectChain.module.scss';
import { EFFECT_ENTRIES, findEffectEntry } from './effectFactories';

function findInsertIndex(e: DragEvent, effects: readonly AudioEffectDeviceAdapter[]): number {
  const effectTiles = Array.from(
    e.currentTarget.querySelectorAll<HTMLElement>('[data-effect-index]'),
  );
  const target = effectTiles.find((tile) => {
    const rect = tile.getBoundingClientRect();
    return e.clientX < rect.left + rect.width / 2;
  });

  return target ? Number(target.dataset.effectIndex) : effects.length;
}

interface EffectChainProps {
  audioUnit: AudioUnitBoxAdapter;
  effects: readonly AudioEffectDeviceAdapter[];
}

export function EffectChain({ audioUnit, effects }: EffectChainProps): JSX.Element {
  const { project } = useProject();
  const { t } = useTranslation();
  const [dropIndex, setDropIndex] = useState<number | null>(null);

  const handleOnDrop = (e: DragEvent) => {
    e.preventDefault();

    const boxName = e.dataTransfer.getData('application/x-effect');
    const droppedEffect = EFFECT_ENTRIES.find((entry) => entry.boxName === boxName);
    if (!droppedEffect) return;

    const insertIndex = findInsertIndex(e, effects);

    project.editing.modify(() => {
      project.api.insertEffect(audioUnit.audioEffectsField, droppedEffect.factory, insertIndex);
    });
  };

  return (
    <div
      className={styles.effectChain}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        const insertIndex = findInsertIndex(e, effects);
        setDropIndex(insertIndex);
      }}
      onDragLeave={(e) => {
        if (e.currentTarget.contains(e.relatedTarget as Node | null)) return;
        setDropIndex(null);
      }}
      onDrop={(e) => {
        handleOnDrop(e);
        setDropIndex(null);
      }}
    >
      {effects.map((effect, index) => {
        const entry = findEffectEntry(effect);
        if (!entry) return null;
        return (
          <Fragment key={effect.uuid.toString()}>
            {dropIndex === index ? (
              <BorderBeam count={2} color={theme.orange} duration={2} size={50}>
                <div className={styles.dropMarker} />
              </BorderBeam>
            ) : null}
            <DeviceEditor
              audioUnit={audioUnit}
              key={effect.uuid.toString()}
              effect={effect}
              entry={entry}
              index={index}
            />
          </Fragment>
        );
      })}
      {dropIndex !== null && dropIndex >= effects.length ? (
        <BorderBeam count={2} color={theme.orange} duration={2} size={50}>
          <div className={styles.dropMarker} />
        </BorderBeam>
      ) : null}
      <AddEffectButton audioUnit={audioUnit} title={t('studio.devices.addEffect')} />
      {effects.length === 0 ? (
        <div className={styles.empty}>{t('studio.devices.noEffect')}</div>
      ) : null}
    </div>
  );
}
