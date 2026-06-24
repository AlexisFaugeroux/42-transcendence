import type { AudioUnitBox, TrackBox } from '@opendaw/studio-boxes';
import type { JSX } from 'react';
import styles from './App.module.scss';
import { ProjectProvider } from './contexts/ProjectContext';
import { TracksProvider } from './contexts/TracksContext';
import { usePanels } from './hooks/usePanels';
import { Footer } from './ui/Footer/Footer';
import { Header } from './ui/Header/Header';
import { PanelFrame } from './ui/PanelFrame/PanelFrame';

export interface Track {
  audioUnitBox: AudioUnitBox;
  name: string;
  instrumentName: 'Nano' | 'Vaporisateur' | 'Tape';
  uuid: Readonly<Uint8Array>;
  trackBox: TrackBox;
  color: string;
}

function App(): JSX.Element {
  const { isVisible, toggle } = usePanels({ browser: true, devices: true, editor: false, timeline: true });

  return (
    <div className="app">
      <ProjectProvider>
        <TracksProvider>
          <Header />

          <main className={styles.workspace}>
            <PanelFrame
              id="browser"
              className={isVisible('browser') ? styles.browserSlot : styles.browserSlotCollapsed}
              isVisible={isVisible}
              onToggle={toggle}
            />
            <div className={styles.rightArea}>
              <PanelFrame
                id="timeline"
                className={isVisible('timeline') ? styles.timelineSlot : styles.collapsedSlot}
                isVisible={isVisible}
                onToggle={toggle}
              />
              <PanelFrame
                id="editor"
                className={isVisible('editor') ? styles.editorSlot : styles.collapsedSlot}
                isVisible={isVisible}
                onToggle={toggle}
              />
              <PanelFrame
                id="devices"
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
