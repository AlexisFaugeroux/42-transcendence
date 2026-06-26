import type { FC } from 'react';
import { Browser } from '../Browser/Browser';
import type { StudioIconLabel } from '../components/StudioIcon/types';
import { Devices } from '../Devices/Devices';
import { Editor } from '../Editor/Editor';
import { Timeline } from '../Timeline/Timeline';
import { PanelHeader } from './PanelHeader';

export interface PanelHeaderProps {
  icon: StudioIconLabel;
  id: Panel['id'];
  label: string;
  onToggle: (id: Panel['id']) => void;
  isVisible: (id: Panel['id']) => boolean;
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
  editor: { header: PanelHeader, id: 'editor', label: 'Editor', main: Editor },
  timeline: { header: PanelHeader, id: 'timeline', label: 'Timeline', main: Timeline },
};
