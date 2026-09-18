import { usePermissions, useUser } from '@transcendence/auth';
import { useTranslation } from '@transcendence/i18n';
import { Permissions } from '@transcendence/permissions';
import { Button, MsnIcon, MsnWordmark, theme } from '@transcendence/ui';
import { type JSX, useEffect } from 'react';
import styles from './App.module.scss';
import { ProjectProvider } from './contexts/ProjectContext';
import { TracksProvider } from './contexts/TracksContext';
import { useIsDesktop } from './hooks/useIsDesktop';
import { usePanels } from './hooks/usePanels';
import { Footer } from './ui/Footer/Footer';
import { Header } from './ui/Header/Header';
import { PanelFrame } from './ui/PanelFrame/PanelFrame';

const FRONT_URL = import.meta.env.VITE_FRONT_URL;

interface NoticeProps {
  back: string;
  body: string;
  title: string;
}

function Notice({ back, body, title }: NoticeProps): JSX.Element {
  return (
    <div className={styles.notice}>
      <div className={styles.noticeCard}>
        <div className={styles.noticeBrand}>
          <MsnIcon name="msn" size="22px" color={theme.orange} />
          <MsnWordmark size={20} accent={theme.orange} />
        </div>

        <h1 className={styles.noticeTitle}>{title}</h1>
        <p className={styles.noticeBody}>{body}</p>

        <Button href={`${FRONT_URL}/`} size="large">
          {back}
        </Button>
      </div>
    </div>
  );
}

function StudioDenied(): JSX.Element {
  const { t } = useTranslation();

  return (
    <Notice
      back={t('studio.denied.back')}
      body={t('studio.denied.body')}
      title={t('studio.denied.title')}
    />
  );
}

function SmallScreenNotice(): JSX.Element {
  const { t } = useTranslation();

  return (
    <Notice
      back={t('studio.smallScreen.back')}
      body={t('studio.smallScreen.body')}
      title={t('studio.smallScreen.title')}
    />
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
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (!loading && !user) window.location.href = `${FRONT_URL}/`;
  }, [loading, user]);

  if (loading || !user) return null;
  if (!isDesktop) return <SmallScreenNotice />;

  return <AuthorizedStudio />;
}

export default App;
