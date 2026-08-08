import type { JSX } from 'react';
import styles from './App.module.scss';
import { ProjectProvider } from './contexts/ProjectContext';
import { TracksProvider } from './contexts/TracksContext';
import { usePanels } from './hooks/usePanels';
import { Footer } from './ui/Footer/Footer';
import { Header } from './ui/Header/Header';
import { PanelFrame } from './ui/PanelFrame/PanelFrame';

function App(): JSX.Element {
  const { isVisible, toggle } = usePanels({
    browser: true,
    devices: true,
    editor: false,
    timeline: true,
  });

  return (
    <div className="app">
      <ProjectProvider>
        <TracksProvider>
          <Header />

          <main className={styles.workspace}>
            <PanelFrame
              id="browser"
              icon="folder"
              className={isVisible('browser') ? styles.browserSlot : styles.browserSlotCollapsed}
              isVisible={isVisible}
              onToggle={toggle}
            />
            <div className={styles.rightArea}>
              <PanelFrame
                id="timeline"
                icon="arrange"
                className={isVisible('timeline') ? styles.timelineSlot : styles.collapsedSlot}
                isVisible={isVisible}
                onToggle={toggle}
              />
              <PanelFrame
                id="editor"
                icon="pencil"
                className={isVisible('editor') ? styles.editorSlot : styles.collapsedSlot}
                isVisible={isVisible}
                onToggle={toggle}
              />
              <PanelFrame
                id="devices"
                icon="device"
                className={isVisible('devices') ? styles.devicesSlot : styles.collapsedSlot}
                isVisible={isVisible}
                onToggle={toggle}
              />
            </div>
          </main>

          <Footer />
        </TracksProvider>
      </ProjectProvider>
    </div>
  );
}

export default App;
