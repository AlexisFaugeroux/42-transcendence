import type { AudioUnitBox, TrackBox } from '@opendaw/studio-boxes';
import type { JSX } from 'react';
import { ProjectProvider } from './contexts/ProjectContext';
import { TracksProvider } from './contexts/TracksContext';
import { usePanels } from './hooks/usePanels';
import { Footer } from './ui/Footer/Footer';
import { Header } from './ui/Header/Header';
import { panels } from './ui/panels';

export interface Track {
  audioUnitBox: AudioUnitBox;
  name: string;
  instrumentName: 'Nano' | 'Vaporisateur' | 'Tape';
  uuid: Readonly<Uint8Array>;
  trackBox: TrackBox;
  color: string;
}

function App(): JSX.Element {
  const { isVisible, toggle } = usePanels({ browser: false, devices: false, editor: false, timeline: true });

  return (
    <div className="app">
      <ProjectProvider>
        <TracksProvider>
          <Header />
          <main style={{ flex: 1, overflow: 'auto' }}>
            {panels.map((panel) => (
              <div key={panel.id} style={{ border: '2px solid var(--line-soft)' }}>
                <panel.header id={panel.id} label={panel.label} onToggle={toggle} />
                {isVisible(panel.id) ? <panel.main /> : null}
              </div>
            ))}
          </main>
          <Footer />
        </TracksProvider>
      </ProjectProvider>
    </div>
  );
}

export default App;
