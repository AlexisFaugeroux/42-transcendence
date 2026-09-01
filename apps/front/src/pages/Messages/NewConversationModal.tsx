import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthUser } from '@transcendence/auth';
import { Button, Form, Input, Modal, Spin } from '@transcendence/ui';
import { JSX, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { openConversation } from '../../api/chat/chat';
import { useUserRelations } from '../../hooks/useUserRelations';
import type { Conversation } from '../../types/chat';
import type { User } from '../../types/user';
import style from './NewConversationModal.module.scss';

interface NewSessionConvProps {
  open: boolean;
  onClose: () => void;
}

interface MessageContent {
  content: string;
}

export function NewConversationModal({ onClose, open }: NewSessionConvProps): JSX.Element {
  const me = useAuthUser();
  const navigate = useNavigate();
  const [form] = Form.useForm<MessageContent>();
  const { users, isLoading } = useUserRelations();
  const [newChat, setNewChat] = useState(false);
  const [search, setSearch] = useState<string>('');
  const [to, setTo] = useState<User | null>(null);
  const queryClient = useQueryClient();

  const { mutate: openConv } = useMutation({
    mutationFn: openConversation,
    onSuccess: async (conversation: Conversation) => {
      queryClient.setQueryData<Conversation[]>(['conversations', me.id], (currentConversations) => [
        conversation,
        ...(currentConversations ?? []).filter((current) => current.id !== conversation.id),
      ]);
      setNewChat(false);
      setTo(null);
      onClose();
      form.resetFields();
      await navigate(`/messages/${conversation.id}`);
    },
  });

  const sending = (content: MessageContent) => {
    if (!to) return;
    openConv({
      content: content.content,
      authorId: me.id,
      toId: to.id,
    });
  };

  const conversations = queryClient.getQueryData<Conversation[]>(['conversations', me.id]) ?? [];

  const userWithoutConversation = users.filter(
    (user) =>
      !conversations.some((conv) =>
        conv.participants.some((participant) => participant.id === user.id),
      ),
  );

  const query = search.trim().toLocaleLowerCase();
  const filteredUser = userWithoutConversation.filter((user) =>
    user.handle.toLocaleLowerCase().includes(query),
  );

  return (
    <Modal
      open={open}
      onCancel={() => {
        setNewChat(false);
        setTo(null);
        form.resetFields();
        onClose();
      }}
      footer={null}
      styles={{
        mask: {
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          backgroundColor: 'rgba(0, 0, 0, 0.35)',
        },
        body: {
          paddingBlock: '2.5rem',
        },
      }}
      centered
    >
      {newChat ? (
        <div>
          <div className={style.openConvTitle}>Send the first message to {to?.handle}</div>
          <Form form={form} onFinish={sending}>
            <Form.Item name="content">
              <Input size="large" placeholder="Your message..." autoFocus autoComplete="off" />
            </Form.Item>
            <Button htmlType="submit">Send</Button>
          </Form>
        </div>
      ) : isLoading ? (
        <Spin />
      ) : (
        <div>
          <Input
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
            placeholder="Search for a producer..."
          />
          {filteredUser.map((user) => {
            return (
              <div key={user.id} className={style.row}>
                <p> {user.handle} </p>
                <Button
                  onClick={() => {
                    setNewChat(true);
                    setTo(user);
                  }}
                >
                  Open new chat
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </Modal>
  );
}
