import { useMutation } from '@tanstack/react-query';
import { useAuthUser } from '@transcendence/auth';
import { useTranslation } from '@transcendence/i18n';
import { Form, Input } from '@transcendence/ui';
import { JSX, useEffect } from 'react';
import { markAsRead, sendMessage } from '../../api/chat/chat';
import type { Conversation, NewMessage } from '../../types/chat';
import style from './Conversation.module.scss';
import { MessageList } from './MessageList';
import { useQueryClient } from '@tanstack/react-query';

interface ConversationProp {
  conversation: Conversation;
}

interface MessageContent {
  content: string;
}

export function Conversation({ conversation }: ConversationProp): JSX.Element {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
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
    onSuccess: (_, conversationId) => {
    queryClient.setQueryData<Conversation[]>(
      ['conversations', user.id],
      (current) =>
        current?.map((conversation) =>
          conversation.id !== conversationId
            ? conversation
            : {
                ...conversation,
                participants: conversation.participants.map(
                  (participant) =>
                    participant.id === user.id
                      ? { ...participant, unreadCount: 0 }
                      : participant,
                ),
              },
        ),
    );
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
