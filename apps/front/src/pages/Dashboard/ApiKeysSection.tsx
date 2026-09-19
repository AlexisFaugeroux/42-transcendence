import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthUser } from '@transcendence/auth';
import { type TranslationKey, useTranslation } from '@transcendence/i18n';
import {
  Alert,
  Button,
  CheckOutlined,
  CloseCircleOutlined,
  Form,
  Input,
  Modal,
  notification,
  Popconfirm,
  Select,
  Table,
  theme,
  Tooltip,
} from '@transcendence/ui';
import { type JSX, useState } from 'react';
import { formatDate } from '@transcendence/date';
import { createApiKey, getApiKeys, revokeApiKey } from '../../api/apiKeys/apiKeys';
import type { ApiKey, CreatedApiKey } from '../../api/apiKeys/types';
import styles from './ApiKeysSection.module.scss';
import { Card, SectionHeader } from './primitives';

const EXPIRY_OPTIONS = [30, 90, 365];

interface CreateFormValues {
  name: string;
  expiresInDays?: number;
}

export function ApiKeysSection(): JSX.Element {
  const user = useAuthUser();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [form] = Form.useForm<CreateFormValues>();
  const [isCreating, setIsCreating] = useState(false);
  const [created, setCreated] = useState<CreatedApiKey | null>(null);
  const [notificationApi, notificationContext] = notification.useNotification();

  const notify = (titleKey: TranslationKey, error?: Error): void => {
    notificationApi.open({
      description: error?.message,
      duration: 3,
      icon: error ? (
        <CloseCircleOutlined color={theme.red} />
      ) : (
        <CheckOutlined color={theme.green} />
      ),
      key: `open${String(Date.now())}`,
      title: t(titleKey),
    });
  };

  const keysQuery = useQuery({
    queryFn: getApiKeys,
    queryKey: ['api-keys', user.id],
  });

  const invalidate = async (): Promise<void> => {
    await queryClient.invalidateQueries({ queryKey: ['api-keys', user.id] });
  };

  const { isPending: isSubmitting, mutate: create } = useMutation({
    mutationFn: createApiKey,
    onError: (error) => {
      notify('settings.apiKeys.createFailed', error);
    },
    onSuccess: async (key) => {
      setIsCreating(false);
      form.resetFields();
      setCreated(key);
      await invalidate();
    },
  });

  const { mutate: revoke } = useMutation({
    mutationFn: revokeApiKey,
    onError: (error) => {
      notify('settings.apiKeys.revokeFailed', error);
    },
    onSuccess: async () => {
      notify('settings.apiKeys.revoked');
      await invalidate();
    },
  });

  const copyKey = async (): Promise<void> => {
    if (!created) return;
    try {
      await navigator.clipboard.writeText(created.key);
      notify('settings.apiKeys.copied');
    } catch {
      notify('settings.apiKeys.copyFailed');
    }
  };

  const columns = [
    {
      dataIndex: 'name',
      key: 'name',
      title: t('settings.apiKeys.columns.name'),
    },
    {
      dataIndex: 'prefix',
      key: 'prefix',
      render: (prefix: string) => <span className={styles.mono}>msn_{prefix}…</span>,
      title: t('settings.apiKeys.columns.prefix'),
    },
    {
      dataIndex: 'lastUsedAt',
      key: 'lastUsedAt',
      render: (value: string | null) =>
        value === null ? t('settings.apiKeys.neverUsed') : formatDate(value),
      title: t('settings.apiKeys.columns.lastUsed'),
    },
    {
      dataIndex: 'expiresAt',
      key: 'expiresAt',
      render: (value: string | null) =>
        value === null ? t('settings.apiKeys.noExpiry') : formatDate(value),
      title: t('settings.apiKeys.columns.expires'),
    },
    {
      key: 'actions',
      render: (_: unknown, key: ApiKey) => (
        <Popconfirm
          title={t('settings.apiKeys.revokeConfirm')}
          okText={t('settings.apiKeys.revoke')}
          cancelText={t('common.cancel')}
          onConfirm={() => {
            revoke(key.id);
          }}
        >
          <Button size="small" danger>
            {t('settings.apiKeys.revoke')}
          </Button>
        </Popconfirm>
      ),
      title: '',
      width: 1,
    },
  ];

  return (
    <div>
      {notificationContext}
      <SectionHeader
        title={t('settings.apiKeys.title')}
        subtitle={t('settings.apiKeys.subtitle')}
        right={
          <Button
            size="small"
            type="primary"
            onClick={() => {
              setIsCreating(true);
            }}
          >
            {t('settings.apiKeys.create')}
          </Button>
        }
      />

      <Card>
        <Table<ApiKey>
          columns={columns}
          dataSource={keysQuery.data?.items ?? []}
          loading={keysQuery.isLoading}
          locale={{ emptyText: t('settings.apiKeys.empty') }}
          pagination={false}
          rowKey="id"
          size="small"
        />
      </Card>

      <Modal
        open={isCreating}
        title={t('settings.apiKeys.createTitle')}
        okText={t('settings.apiKeys.create')}
        cancelText={t('common.cancel')}
        confirmLoading={isSubmitting}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => {
          setIsCreating(false);
          form.resetFields();
        }}
      >
        <Form form={form} layout="vertical" requiredMark={false} onFinish={create}>
          <Form.Item
            label={t('settings.apiKeys.nameLabel')}
            name="name"
            rules={[{ message: t('settings.apiKeys.nameRequired'), required: true }]}
          >
            <Input placeholder={t('settings.apiKeys.namePlaceholder')} maxLength={64} />
          </Form.Item>

          <Form.Item label={t('settings.apiKeys.expiryLabel')} name="expiresInDays">
            <Select
              allowClear
              placeholder={t('settings.apiKeys.noExpiry')}
              options={EXPIRY_OPTIONS.map((days) => ({
                label: t('settings.apiKeys.expiryDays', { count: days }),
                value: days,
              }))}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        open={created !== null}
        title={t('settings.apiKeys.createdTitle')}
        footer={
          <Button
            type="primary"
            onClick={() => {
              setCreated(null);
            }}
          >
            {t('common.close')}
          </Button>
        }
        onCancel={() => {
          setCreated(null);
        }}
      >
        <Alert type="warning" showIcon title={t('settings.apiKeys.createdWarning')} />
        <div className={styles.secret}>
          <code className={styles.key}>{created?.key}</code>
          <Tooltip title={t('settings.apiKeys.copy')}>
            <Button
              size="small"
              onClick={() => {
                void copyKey();
              }}
            >
              {t('settings.apiKeys.copy')}
            </Button>
          </Tooltip>
        </div>
        <p className={styles.usage}>{t('settings.apiKeys.usage')}</p>
        <pre className={styles.sample}>
          curl -H &quot;x-api-key: {created?.key}&quot; {window.location.origin}/api/samples/get
        </pre>
      </Modal>
    </div>
  );
}
