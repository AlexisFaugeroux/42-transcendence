import { usePermissions, useUser } from '@transcendence/auth';
import { useTranslation } from '@transcendence/i18n';
import { Permissions } from '@transcendence/permissions';
import { Button, MsnIcon, MsnWordmark, theme } from '@transcendence/ui';
import { type JSX, useEffect } from 'react';
import styles from './App.module.scss';
import { ProjectProvider } from './contexts/ProjectContext';
import { TracksProvider } from './contexts/TracksContext';
import { usePanels } from './hooks/usePanels';
import { Footer } from './ui/Footer/Footer';
import { Header } from './ui/Header/Header';
import { PanelFrame } from './ui/PanelFrame/PanelFrame';

const FRONT_URL = import.meta.env.VITE_FRONT_URL;

function StudioDenied(): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={styles.denied}>
      <div className={styles.deniedCard}>
        <div className={styles.deniedBrand}>
          <MsnIcon name="msn" size="22px" color={theme.orange} />
          <MsnWordmark size={20} accent={theme.orange} />
        </div>

        <h1 className={styles.deniedTitle}>{t('studio.denied.title')}</h1>
        <p className={styles.deniedBody}>{t('studio.denied.body')}</p>

        <Button href={`${FRONT_URL}/`} size="large">
          {t('studio.denied.back')}
        </Button>
      </div>
    </div>
  );
}

function Studio(): JSX.Element {
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

function AuthorizedStudio(): JSX.Element {
  const studioAccessGranted = usePermissions(Permissions.STUDIO_ACCESS);

  return studioAccessGranted ? <Studio /> : <StudioDenied />;
}

function App(): JSX.Element | null {
  const { loading, user } = useUser();

  useEffect(() => {
    if (!loading && !user) window.location.href = `${FRONT_URL}/`;
  }, [loading, user]);

  if (loading || !user) return null;

  return <AuthorizedStudio />;
}

export default App;
