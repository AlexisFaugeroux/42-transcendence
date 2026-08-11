import { PPQN } from '@opendaw/lib-dsp';
import { theme } from '@transcendence/ui';
import { type JSX, type MouseEvent as ReactMouseEvent, useEffect, useState } from 'react';
import { useProject } from '../../../contexts/ProjectContext';
import { PIXELS_PER_PULSE } from '../constants';
import styles from './LoopRegionHandleStrip.module.scss';

interface LoopRegionProps {
  timelineWidth: number;
}

export function LoopRegionHandleStrip({ timelineWidth }: LoopRegionProps): JSX.Element {
  const { project } = useProject();
  const [from, setFrom] = useState(() => project.timelineBox.loopArea.from.getValue());
  const [to, setTo] = useState(() => project.timelineBox.loopArea.to.getValue());
  const [isLooping, setIsLooping] = useState(() => project.timelineBox.loopArea.enabled.getValue());

  useEffect(() => {
    const subFrom = project.timelineBox.loopArea.from.catchupAndSubscribe((obs) => {
      setFrom(obs.getValue());
    });
    const subTo = project.timelineBox.loopArea.to.catchupAndSubscribe((obs) => {
      setTo(obs.getValue());
    });

    return () => {
      subFrom.terminate();
      subTo.terminate();
    };
  }, [project.timelineBox.loopArea.from, project.timelineBox.loopArea.to]);

  useEffect(() => {
    const sub = project.timelineBox.loopArea.enabled.catchupAndSubscribe((obs) => {
      setIsLooping(obs.getValue());
    });

    return () => {
      sub.terminate();
    };
  }, [project.timelineBox.loopArea.enabled]);

  const SNAP = PPQN.Quarter / 4;

  function handleMouseDown(e: ReactMouseEvent<SVGPathElement>, handle: 'from' | 'to', startValuePpqn: number) {
    if (e.button !== 0) return;
    e.preventDefault();

    const startMouseX = e.clientX;

    function onMove(ev: MouseEvent) {
      const deltaPx = ev.clientX - startMouseX;
      const deltaPpqn = deltaPx / PIXELS_PER_PULSE;
      const rawPpqn = Math.max(0, startValuePpqn + deltaPpqn);
      const snappedPpqn = Math.round(rawPpqn / SNAP) * SNAP;

      project.editing.modify(() => {
        if (handle === 'from' && snappedPpqn <= to) project.timelineBox.loopArea.from.setValue(snappedPpqn);
        else if (handle === 'to' && snappedPpqn >= from) project.timelineBox.loopArea.to.setValue(snappedPpqn);
      });
    }

    function onUp() {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    }

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }

  function handleHoverCursor(e: ReactMouseEvent<SVGPathElement>) {
    e.currentTarget.style.cursor = 'grab';
  }

  const H = 12;
  const r = H / 2; // 6 - radius = half the strip height -> semi-circle
  const xFrom = from * PIXELS_PER_PULSE;
  const xTo = to * PIXELS_PER_PULSE;

  return (
    <div className={styles.loopHandleStrip} style={{ width: timelineWidth }}>
      <svg width={timelineWidth} height={12}>
        <rect
          x={from * PIXELS_PER_PULSE}
          y={2}
          width={to * PIXELS_PER_PULSE - from * PIXELS_PER_PULSE}
          height={8}
          fill={isLooping ? theme.purple : theme.fg2}
          strokeWidth={2}
          stroke={theme.lineHover}
          opacity={0.6}
          pointerEvents="none"
        />
        <path
          d={`M ${xTo}, 0 A ${r + 1},${r} 0 0 1 ${xTo},${H} Z`}
          fill={isLooping ? theme.purple : theme.fg2}
          onMouseDown={(e) => {
            handleMouseDown(e, 'to', to);
          }}
          onMouseMove={handleHoverCursor}
        />
        {/* Left handle last in the rendering order to make sure it's clickable */}
        <path
          d={`M ${xFrom}, 0 A ${r + 1},${r} 0 0 ${from === 0 ? '1' : '0'} ${xFrom},${H} Z`}
          fill={isLooping ? theme.purple : theme.fg2}
          onMouseDown={(e) => {
            handleMouseDown(e, 'from', from);
          }}
          onMouseMove={handleHoverCursor}
        />
      </svg>
    </div>
  );
}
