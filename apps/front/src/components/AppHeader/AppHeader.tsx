import { useMutation } from '@tanstack/react-query';
import { useAuthUser, useUser } from '@transcendence/auth';
import { LanguageSelect, type TranslationKey, useTranslation } from '@transcendence/i18n';
import {
  Button,
  CloseCircleOutlined,
  ConfigProvider,
  Dropdown,
  FileProtectOutlined,
  LogoutOutlined,
  type MenuProps,
  MsnIcon,
  MsnWordmark,
  notification,
  theme,
} from '@transcendence/ui';
import type { JSX } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeaderIconButton } from '../HeaderIconButton/HeaderIconButton';
import { UserChip } from '../UserChip/UserChip';
import styles from './AppHeader.module.scss';

export type AppHeaderKey = 'home' | 'sessions' | 'library' | 'producers' | 'following' | 'settings';

interface HeaderLink {
  key: AppHeaderKey;
  labelKey: TranslationKey;
  to: string;
}

const LINKS: HeaderLink[] = [
  { key: 'home', labelKey: 'header.home', to: '/home' },
  { key: 'sessions', labelKey: 'header.sessions', to: '/sessions' },
  { key: 'library', labelKey: 'header.library', to: '/library' },
  { key: 'producers', labelKey: 'header.producers', to: '/producers' },
  { key: 'following', labelKey: 'header.following', to: '/following' },
  { key: 'settings', labelKey: 'header.settings', to: '/settings' },
];

// Shared top header for the in-app pages (Home / Sessions / Library / Settings).
// The `active` prop drives which link is highlighted.
export function AppHeader({ active }: { active: AppHeaderKey }): JSX.Element {
  const user = useAuthUser();
  const { logout } = useUser();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [notificationApi, notificationContext] = notification.useNotification();

  const items: MenuProps['items'] = [
    {
      icon: <LogoutOutlined style={{ color: theme.orange }} />,
      key: 'logout',
      label: t('header.logout'),
      style: { fontSize: '10px' },
    },
    {
      icon: <FileProtectOutlined style={{ color: theme.orange }} />,
      key: 'privacy',
      label: t('header.privacyTerms'),
      style: { fontSize: '10px' },
    },
  ];

  const openErrorNotification = (error: Error) => {
    const key = `open${Date.now()}`;

    notificationApi.open({
      description: error.message,
      duration: 3,
      icon: <CloseCircleOutlined color={theme.red} />,
      key,
      title: t('header.logoutError'),
    });
  };

  const { mutate: logoutMutation } = useMutation({
    mutationFn: logout,
    onError: (error) => {
      openErrorNotification(error);
    },
    onSuccess: () => {
      void navigate('/');
    },
  });

  const onMeunuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      logoutMutation();
      return;
    }
    void navigate(`/${key}`);
  };

  return (
    <header className={styles.header}>
      {notificationContext}
      <Link to="/home" className={styles.brand}>
        <MsnIcon name="msn" size="20px" color="var(--color-orange)" />
        <MsnWordmark size={15} accent="var(--color-orange)" />
      </Link>

      <nav className={styles.nav}>
        {LINKS.map((link) => (
          <Link
            key={link.key}
            to={link.to}
            className={`${styles.navLink} ${active === link.key ? styles.navLinkActive : ''}`}
          >
            {t(link.labelKey)}
          </Link>
        ))}
      </nav>

      <div className={styles.right}>
        <LanguageSelect />
        <HeaderIconButton label={t('header.notifications')}>
          <MsnIcon name="bell" size="16px" />
        </HeaderIconButton>
        <ConfigProvider theme={{ token: { colorBgElevated: theme.bgPanel3 } }}>
          <Dropdown
            trigger={['click']}
            menu={{
              items,
              onClick: onMeunuClick,
              style: { border: `1px solid ${theme.lineSoft}` },
            }}
          >
            <Button style={{ background: theme.void, border: 'none', boxShadow: 'none' }}>
              <UserChip
                avatarName={user.artistName}
                name={`${user.firstname} ${user.lastname}`}
                handle={user.handle}
                status="online"
              />
            </Button>
          </Dropdown>
        </ConfigProvider>
      </div>
    </header>
  );
}
