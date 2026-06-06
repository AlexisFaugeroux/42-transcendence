import { Header } from './ui/Header/Header';
import { ProjectProvider } from './contexts/ProjectContext';
import { TracksProvider } from './contexts/TracksContext';
import { panels } from './ui/panels';
import { usePanels } from './hooks/usePanels';

export interface Track {
  name: string;
  uuid: Readonly<Uint8Array>;
  color: string;
}

function App(): JSX.Element {
  const { isVisible, toggle } = usePanels({ timeline: true, browser: false, devices: false, editor: false });

  return (
    <div className="app">
      <ProjectProvider>
        <TracksProvider>
          <Header />

          {panels.map((panel) => (
            <div key={panel.id} style={{ border: '1px solid var(--line-soft)' }}>
              <panel.header id={panel.id} label={panel.label} onToggle={toggle} />
              {isVisible(panel.id) ? <panel.main /> : null}
            </div>
          ))}
        </TracksProvider>
      </ProjectProvider>
    </div>
  );
}

export default App;
