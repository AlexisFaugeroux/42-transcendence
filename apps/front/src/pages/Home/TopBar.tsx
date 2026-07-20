import { useMutation } from '@tanstack/react-query';
import { useAuthUser, useUser } from '@transcendence/auth';
import {
  Badge,
  Button,
  CloseCircleOutlined,
  ConfigProvider,
  Dropdown,
  FileProtectOutlined,
  Input,
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
import { HeaderIconButton } from '../../components/HeaderIconButton/HeaderIconButton';
import { UserChip } from '../../components/UserChip/UserChip';
import styles from './TopBar.module.scss';

const items: MenuProps['items'] = [
  {
    icon: <SettingOutlined style={{ color: theme.orange }} />,
    key: 'settings',
    label: 'Settings',
    style: { fontSize: '10px' },
  },
  {
    icon: <LogoutOutlined style={{ color: theme.orange }} />,
    key: 'logout',
    label: 'Logout',
    style: { fontSize: '10px' },
  },
  {
    icon: <FileProtectOutlined style={{ color: theme.orange }} />,
    key: 'privacy',
    label: 'Privacy terms',
    style: { fontSize: '10px' },
  },
];

export function TopBar(): JSX.Element {
  const user = useAuthUser();
  const { logout } = useUser();
  const navigate = useNavigate();
  const [notificationApi, notificationContext] = notification.useNotification();

  const openErrorNotification = (error: Error) => {
    const key = `open${Date.now()}`;

    notificationApi.open({
      description: error.message,
      duration: 3,
      icon: <CloseCircleOutlined color={theme.red} />,
      key,
      title: 'An error occured while deleting you account',
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
    <header className={styles.bar}>
      {notificationContext}
      <Link to="/" className={styles.brand}>
        <MsnIcon name="msn" size="20px" color="var(--color-orange)" />
        <MsnWordmark size={15} accent="var(--color-orange)" />
      </Link>

      <Input
        className={styles.search}
        variant="filled"
        prefix={<MsnIcon name="search" size="13px" />}
        placeholder="Search sessions, samples, friends…"
      />

      <div className={styles.spacer} />

      <Badge count={3} size="small" color="var(--color-orange)">
        <HeaderIconButton label="Notifications">
          <MsnIcon name="bell" size="16px" />
        </HeaderIconButton>
      </Badge>

      <ConfigProvider theme={{ token: { colorBgElevated: theme.bgPanel3 } }}>
        <Dropdown
          trigger={['click']}
          menu={{ items, onClick: onMeunuClick, style: { border: `1px solid ${theme.lineSoft}` } }}
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
    </header>
  );
}
