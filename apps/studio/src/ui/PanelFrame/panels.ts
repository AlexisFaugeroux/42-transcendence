import type { TranslationKey } from '@transcendence/i18n';
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
  labelKey: TranslationKey;
  onToggle: (id: Panel['id']) => void;
  isVisible: (id: Panel['id']) => boolean;
}

export interface Panel {
  id: 'timeline' | 'browser' | 'devices' | 'editor';
  labelKey: TranslationKey;
  header: FC<PanelHeaderProps>;
  main: FC;
}

export const panels: Record<Panel['id'], Panel> = {
  browser: { header: PanelHeader, id: 'browser', labelKey: 'studio.panels.browser', main: Browser },
  devices: { header: PanelHeader, id: 'devices', labelKey: 'studio.panels.devices', main: Devices },
  editor: { header: PanelHeader, id: 'editor', labelKey: 'studio.panels.editor', main: Editor },
  timeline: {
    header: PanelHeader,
    id: 'timeline',
    labelKey: 'studio.panels.timeline',
    main: Timeline,
  },
};
