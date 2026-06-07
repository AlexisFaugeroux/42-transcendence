import type { FC } from 'react';
import { Timeline } from './Timeline/Timeline';
import { TimelineHeader } from './Timeline/TimelineHeader';

export interface PanelHeaderProps {
  id: Panel['id'];
  label: string;
  onToggle: (id: Panel['id']) => void;
}

export interface Panel {
  id: 'timeline' | 'browser' | 'devices' | 'editor';
  label: string;
  header: FC<PanelHeaderProps>;
  main: FC;
}

export const panels: Panel[] = [
  { header: TimelineHeader, id: 'timeline', label: 'Timeline', main: Timeline },
  // { id: 'browser', label: 'Browser', component: Browser},
  // { id: 'devices', label: 'Devices', component: Devices},
  // { id: 'editor', label: 'Editor', component: Editor},
];
