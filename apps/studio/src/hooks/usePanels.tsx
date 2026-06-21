import { useState } from 'react';
import type { Panel } from '../ui/PanelFrame/panels';

export function usePanels(initState: Record<Panel['id'], boolean>) {
  const [visibility, setVisibility] = useState(initState);

  function toggle(id: Panel['id']) {
    setVisibility((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function isVisible(id: Panel['id']) {
    return visibility[id];
  }

  return { isVisible, toggle, visibility };
}
