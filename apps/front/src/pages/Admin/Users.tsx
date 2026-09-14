import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthUser, usePermissions } from '@transcendence/auth';
import { formatDate } from '@transcendence/date';
import { useTranslation } from '@transcendence/i18n';
import { Permissions, Role } from '@transcendence/permissions';
import {
  Button,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  Input,
  LogoutOutlined,
  MsnIcon,
  notification,
  Select,
  Table,
  type TableColumnType,
  Tag,
  theme,
  Tooltip,
} from '@transcendence/ui';
import { type JSX, useEffect, useState } from 'react';
import { getUsers, updateUserRole } from '../../api/admin/admin';
import type { User } from '../../api/admin/types';
import { PAGE_SIZE } from '../constants';
import { ROLE_LABEL, ROLE_ORDER } from './constants';
import { DeleteUserModal } from './DeleteUserModal';
import { EditUserModal } from './EditUserModal';
import { RevokeSessionsModal } from './RevokeSessionsModal';
import styles from './Users.module.scss';

export function Users(): JSX.Element {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [debouncedQ, setDebouncedQ] = useState('');
  const [editTarget, setEditTarget] = useState<User | null>(null);
  const [revokeTarget, setRevokeTarget] = useState<User | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const me = useAuthUser();
  const canWrite = usePermissions(Permissions.USER_WRITE);
  const [notificationApi, notificationContext] = notification.useNotification();

  const notifySuccess = (title: string, description: string): void => {
    notificationApi.open({
      description,
      duration: 5,
      icon: <CheckCircleOutlined style={{ color: theme.green }} />,
      title,
    });
  };

  const notifyError = (title: string, description: string): void => {
    notificationApi.open({
      description,
      duration: 5,
      icon: <CloseCircleOutlined style={{ color: theme.red }} />,
      title,
    });
  };

  const { data, isLoading } = useQuery({
    queryFn: () => getUsers(page, PAGE_SIZE, debouncedQ),
    queryKey: ['admin', 'users', page, PAGE_SIZE, debouncedQ],
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });

  const { mutate: updateUserRoleMutation } = useMutation({
    mutationFn: updateUserRole,
    onError: (error) => {
      notifyError(t('admin.users.role.failedTitle'), error.message);
    },
    onSuccess: () => {
      notifySuccess(t('admin.users.role.updatedTitle'), t('admin.users.role.updatedDescription'));
      void queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
  });

  const list = data?.items ?? [];
  const total = data?.total ?? 0;

  useEffect(() => {
    const id = window.setTimeout(() => {
      setDebouncedQ(query.trim());
      setPage(1);
    }, 300);

    return () => {
      window.clearTimeout(id);
    };
  }, [query]);

  const roleOptions = ROLE_ORDER.map((role) => ({ label: t(ROLE_LABEL[role]), value: role }));

  const columns: TableColumnType<User>[] = [
    {
      dataIndex: 'artistName',
      title: t('admin.users.table.artistName'),
    },
    {
      dataIndex: 'handle',
      title: t('admin.users.table.handle'),
      render: (value: string) => <span className={styles.handle}>@{value}</span>,
    },
    {
      dataIndex: 'email',
      title: t('admin.users.table.email'),
    },
    {
      dataIndex: 'role',
      title: t('admin.users.table.role'),
      width: 160,
      render: (value: Role, row) =>
        canWrite ? (
          <Select
            size="small"
            className={styles.roleSelect}
            value={value}
            options={roleOptions}
            disabled={row.id === me.id}
            onChange={(nextRole) => {
              updateUserRoleMutation({ id: row.id, role: nextRole });
            }}
          />
        ) : (
          <Tag>{t(ROLE_LABEL[value])}</Tag>
        ),
    },
    {
      dataIndex: 'joined',
      title: t('admin.users.table.joined'),
      render: (value: string) => {
        return formatDate(value);
      },
    },
  ];

  if (canWrite) {
    columns.push({
      align: 'center',
      key: 'actions',
      title: t('admin.users.table.actions'),
      width: 130,
      render: (_, row) => (
        <div className={styles.actions}>
          <Tooltip title={t('common.edit')}>
            <Button
              type="text"
              size="small"
              aria-label={t('common.edit')}
              onClick={() => {
                setEditTarget(row);
              }}
            >
              <EditOutlined />
            </Button>
          </Tooltip>

          <Tooltip title={t('admin.users.actions.revoke')}>
            <Button
              type="text"
              size="small"
              aria-label={t('admin.users.actions.revoke')}
              onClick={() => {
                setRevokeTarget(row);
              }}
            >
              <LogoutOutlined />
            </Button>
          </Tooltip>

          <Tooltip title={t('common.delete')}>
            <Button
              type="text"
              size="small"
              danger
              disabled={row.id === me.id}
              aria-label={t('common.delete')}
              onClick={() => {
                setDeleteTarget(row);
              }}
            >
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </div>
      ),
    });
  }

  return (
    <>
      {notificationContext}
      <div className={styles.toolbar}>
        <Input
          className={styles.search}
          allowClear
          prefix={<MsnIcon name="search" size="13px" />}
          placeholder={t('admin.users.searchPlaceholder')}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </div>

      <Table
        columns={columns}
        dataSource={list}
        pagination={{
          current: page,
          pageSize: PAGE_SIZE,
          total,
          showSizeChanger: false,
          onChange: setPage,
        }}
        rowKey="id"
        loading={isLoading}
      />

      <EditUserModal
        target={editTarget}
        onCancel={() => {
          setEditTarget(null);
        }}
        onConfirm={() => {
          setEditTarget(null);
        }}
        notifySuccess={notifySuccess}
        notifyError={notifyError}
      />

      <RevokeSessionsModal
        target={revokeTarget}
        onCancel={() => {
          setRevokeTarget(null);
        }}
        onConfirm={() => {
          setRevokeTarget(null);
        }}
        notifySuccess={notifySuccess}
        notifyError={notifyError}
      />

      <DeleteUserModal
        target={deleteTarget}
        onCancel={() => {
          setDeleteTarget(null);
        }}
        onConfirm={() => {
          setDeleteTarget(null);
        }}
        notifySuccess={notifySuccess}
        notifyError={notifyError}
      />
    </>
  );
}
