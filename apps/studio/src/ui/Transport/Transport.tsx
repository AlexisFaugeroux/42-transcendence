import type { JSX } from 'react';
import styles from './Transport.module.scss';

interface TransportProps {
  isPlaying: boolean;
  bpm: number;
  onPlay: () => void;
  onStop: () => void;
  onBpmChange: (newBpm: number) => void;
}

export function Transport({ bpm, isPlaying, onBpmChange, onPlay, onStop }: TransportProps): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        {/* Play/Stop buttons*/}
        <div className={styles.buttons}>
          <button
            onClick={onPlay}
            disabled={isPlaying}
            className={`${styles.btn} ${isPlaying ? styles.btnDisabled : `${styles.btnActive} ${styles.btnPlay}`}`}
          >
            ▶ Play
          </button>

          <button
            onClick={onStop}
            disabled={!isPlaying}
            className={`${styles.btn} ${isPlaying ? `${styles.btnActive} ${styles.btnStop}` : styles.btnDisabled}`}
          >
            ■ Stop
          </button>
        </div>

        {/* BPM control */}
        <div className={styles.bpmSection}>
          <label className={styles.bpmLabel}>Tempo: {bpm} BPM</label>
          <input
            type="range"
            min={60}
            max={180}
            value={bpm}
            onChange={(e) => {
              onBpmChange(Number(e.target.value));
            }}
            className={styles.bpmSlider}
          />
        </div>
      </div>
    </div>
  );
}
