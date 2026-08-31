import { useMutation } from "@tanstack/react-query";
import { JSX, useState } from "react";
import { openConversation } from "../../api/chat/chat";
import { useUserRelation } from "../../hooks/useUserRelations";
import { Button, Modal, Form, Input } from "@transcendence/ui";
import style from "./NewConversationModal.module.scss"
import type { User } from "../../types/user";
import { useAuthUser } from "@transcendence/auth";
import type { Conversation } from "../../types/chat";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

interface NewSessionCOnvProps {
  open: boolean;
  onClose: () => void;
}

interface MessageContent {
  content: string;
}

export function NewConversationModal({ onClose, open }: NewSessionCOnvProps ) : JSX.Element {
    
    const me = useAuthUser();
    const navigate = useNavigate();
    const [form] = Form.useForm<MessageContent>();
    const users = useUserRelation();
    const [ newChat, setNewChat ] = useState(false);
    const [ to, setTo ] = useState<User | null>(null);
    const queryClient = useQueryClient();

    const { mutate : openConv } = useMutation({
        mutationFn : openConversation,
        onSuccess : ( conversation : Conversation) => {
            queryClient.setQueryData<Conversation[]>(
                ['conversations', me.id],
                (currentConversations) => [
                  conversation,
                  ...(currentConversations ?? []).filter(
                    (current) => current.id !== conversation.id,
                  ),
                ],
            );
            setNewChat(false);
            setTo(null);
            onClose();
            form.resetFields();
            navigate(`/messages/${conversation?.id}`);
        }
    });

    const sending = (content: MessageContent) => {
        if (!to) throw new Error('Receiver isnt set');
        openConv({
            content: content.content,
            authorId: me.id,
            toId: to.id,
        });
    };
    
    return (
        <Modal
        open={open}
        onCancel={ () => {
                setNewChat(false);
                setTo(null);
                form.resetFields();
                onClose();
            }
        }
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
            { newChat ? 
                <div>
                    <div className={style.openConvTitle}> 
                        Send the first message to {to?.handle} 
                    </div>
                    <Form form={form} onFinish={sending} >
                      <Form.Item name="content">
                        <Input size="large" placeholder="Your message..." autoFocus autoComplete="off" />
                      </Form.Item>
                      <Button
                      htmlType="submit"
                      >
                        Send
                      </Button>
                    </Form>
                </div>
                   :       users.map( (user) => {
                    return <div key={user.id} className={style.row}>
                        <p> {user.handle} </p>
                        <Button
                        onClick={() => {
                            setNewChat(true); 
                            setTo( user );
                        }}> 
                            Open new chat 
                        </Button>
                    </div>
                })
            }

        </Modal>
    )
}