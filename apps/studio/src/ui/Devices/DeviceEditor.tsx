import {
  type AudioEffectDeviceAdapter,
  AudioUnitBoxAdapter,
  Devices,
} from '@opendaw/studio-adapters';
import { useTranslation } from '@transcendence/i18n';
import clsx from 'clsx';
import { type CSSProperties, type JSX, useEffect, useState } from 'react';
import { useProject } from '../../contexts/ProjectContext';
import { StudioIcon } from '../components/StudioIcon/StudioIcon';
import styles from './DeviceEditor.module.scss';
import { DEVICES } from './deviceRegistry';
import type { EffectEntry } from './effectFactories';
import { UnknownDevice } from './UnknownDevice';

interface DeviceEditorProps {
  audioUnit: AudioUnitBoxAdapter;
  effect: AudioEffectDeviceAdapter;
  entry: EffectEntry;
}

export function DeviceEditor({ audioUnit, effect, entry }: DeviceEditorProps): JSX.Element {
  const { t } = useTranslation();
  const { project } = useProject();
  const [isEnabled, setIsEnabled] = useState(() => effect.enabledField.getValue());
  const [isMinimized, setIsMinimized] = useState(() => effect.minimizedField.getValue());

  useEffect(() => {
    const sub = effect.enabledField.catchupAndSubscribe((obs) => {
      setIsEnabled(obs.getValue());
    });

    return () => {
      sub.terminate();
    };
  }, [effect.enabledField]);

  useEffect(() => {
    const sub = effect.minimizedField.catchupAndSubscribe((obs) => {
      setIsMinimized(obs.getValue());
    });

    return () => {
      sub.terminate();
    };
  }, [effect.minimizedField]);

  const move = (delta: number) => {
    project.editing.modify(() => {
      audioUnit.audioEffects.move(effect, delta);
    });
  };

  const foldButton = (
    <button
      className={styles.dev__btn}
      type="button"
      title={t(isMinimized ? 'studio.devices.expand' : 'studio.devices.minimize')}
      onClick={() => {
        project.editing.modify(() => {
          effect.minimizedField.toggle();
        });
      }}
    >
      <StudioIcon
        size={10}
        name="collapseV"
        style={{ rotate: isMinimized ? '-90deg' : undefined }}
      />
    </button>
  );

  const Body = DEVICES[effect.box.name] ?? UnknownDevice;

  return (
    <section
      className={clsx(styles.dev, isMinimized && styles.minimized, !isEnabled && styles.bypassed)}
      data-family={entry.family}
      style={{ '--accent': entry.accent } as CSSProperties}
    >
      <div className={styles.dev__bar}>
        <div className={styles.dev__head}>
          <StudioIcon size={14} name={entry.icon} color={entry.accent} />
          {isMinimized ? foldButton : null}
        </div>

        <span className={styles.dev__name}>{entry.label}</span>

        {isMinimized ? null : (
          <>
            {foldButton}
            <button
              aria-pressed={isEnabled}
              className={styles.dev__btn}
              style={{ color: isEnabled ? entry.accent : undefined }}
              type="button"
              title="Bypass"
              onClick={() => {
                project.editing.modify(() => {
                  effect.enabledField.toggle();
                });
              }}
            >
              ⏻
            </button>
            <button
              className={styles.dev__btn}
              title={t('studio.devices.moveLeft')}
              onClick={() => {
                move(-1);
              }}
            >
              {'<'}
            </button>
            <button
              className={styles.dev__btn}
              title={t('studio.devices.moveRight')}
              onClick={() => {
                move(2); // to move one to the right, SDK requires delta 2
              }}
            >
              {'>'}
            </button>
            <button
              className={styles.dev__btn}
              title={t('studio.devices.remove')}
              onClick={() => {
                project.editing.modify(() => {
                  Devices.deleteEffectDevices([effect]);
                });
              }}
            >
              ✕
            </button>
          </>
        )}
      </div>
      {!isMinimized ? (
        <div className={styles.dev__body}>
          <Body effect={effect} />
        </div>
      ) : null}
    </section>
  );
}
