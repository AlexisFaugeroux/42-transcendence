import type { FC } from 'react';
import { Browser } from '../Browser/Browser';
import { Devices } from '../Devices/Devices';
import { Timeline } from '../Timeline/Timeline';
import { Editor } from '../Editor/Editor';
import { PanelHeader } from './PanelHeader';

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

export const panels: Record<Panel['id'], Panel> = {
  browser: { header: PanelHeader, id: 'browser', label: 'Browser', main: Browser },
  devices: { header: PanelHeader, id: 'devices', label: 'Devices', main: Devices },
  timeline: { header: PanelHeader, id: 'timeline', label: 'Timeline', main: Timeline },
  editor: { header: PanelHeader, id: 'editor', label: 'Editor', main: Editor },
};
