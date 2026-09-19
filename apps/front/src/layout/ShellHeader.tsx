import { useMutation } from '@tanstack/react-query';
import { useAuthUser, usePermissions, useUser } from '@transcendence/auth';
import { LanguageSelect, useTranslation } from '@transcendence/i18n';
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
  SettingOutlined,
  theme,
} from '@transcendence/ui';
import type { JSX } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Permissions } from '@transcendence/permissions';
import { NotificationsBell } from '../components/NotificationsBell/NotificationsBell';
import { UserChip } from '../components/UserChip/UserChip';
import styles from './ShellHeader.module.scss';

/** Shared top bar for AppLayout. Nav links live in LeftNav, not here. */
export function ShellHeader(): JSX.Element {
  const user = useAuthUser();
  const { logout } = useUser();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const canChat = usePermissions(Permissions.CHAT_ACCESS);
  const [notificationApi, notificationContext] = notification.useNotification();

  const items: MenuProps['items'] = [
    {
      icon: <SettingOutlined style={{ color: theme.orange }} />,
      key: 'settings',
      label: t('header.settings'),
      style: { fontSize: '10px' },
    },
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

  const openErrorNotification = (error: Error): void => {
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

  const onMenuClick: MenuProps['onClick'] = ({ key }) => {
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

      <div className={styles.spacer} />

      <div className={styles.right}>
        <LanguageSelect />

        {canChat ? <NotificationsBell /> : null}

        <ConfigProvider theme={{ token: { colorBgElevated: theme.bgPanel3 } }}>
          <Dropdown
            trigger={['click']}
            menu={{
              items,
              onClick: onMenuClick,
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
