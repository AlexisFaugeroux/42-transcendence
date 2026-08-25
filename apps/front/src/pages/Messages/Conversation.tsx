import { useMutation } from '@tanstack/react-query';
import { useAuthUser } from '@transcendence/auth';
import { useTranslation } from '@transcendence/i18n';
import { Form, Input } from '@transcendence/ui';
import { JSX, useEffect } from 'react';
import { markAsRead, sendMessage } from '../../api/chat/chat';
import type { Conversation, NewMessage } from '../../types/chat';
import style from './Conversation.module.scss';
import { MessageList } from './MessageList';

interface ConversationProp {
  conversation: Conversation;
}

interface MessageContent {
  content: string;
}

export function Conversation({ conversation }: ConversationProp): JSX.Element {
  const { t } = useTranslation();

  const [form] = Form.useForm<MessageContent>();
  const user = useAuthUser();
  const toParticipant =
    conversation.participants[0].id !== user.id
      ? conversation.participants[0]
      : conversation.participants[1];
  const { mutate: send } = useMutation({
    mutationFn: async (message: NewMessage) => {
      await sendMessage(message);
    },
    onError: () => {
      form.setFields([{ errors: [t('chat.sendError')], name: 'content' }]);
    },
    onSuccess: () => {
      form.resetFields();
    },
  });

  const { mutate: read } = useMutation({
    mutationFn: async (conversation: string) => {
      await markAsRead(conversation);
    },
  });

  useEffect(() => {
    read(conversation.id);
  }, [conversation.id, read]);

  const sending = (content: MessageContent) => {
    send({
      content: content.content,
      authorId: user.id,
      conversationId: conversation.id,
      toId: toParticipant.id,
    });
  };

  return (
    <div className={style.conversation}>
      <MessageList conversation={conversation} />
      <Form form={form} onFinish={sending}>
        <Form.Item name="content">
          <Input size="large" placeholder="Your message..." autoFocus autoComplete="off" />
        </Form.Item>
      </Form>
    </div>
  );
}
