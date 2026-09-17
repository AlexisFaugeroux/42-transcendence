import { can, Permissions } from '@transcendence/permissions';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { ForbiddenError } from '../../domain/errors';
import { chatRepository } from '../../repositories/chat/chat';
import { userRepository } from '../../repositories/user/user';
import { webSocketRegistry } from '../../utils/websockets';
import { chatRecipientIds, isAParticipant } from './helpers';
import type {
  CreateChatRoute,
  ListConversationsRoute,
  ListMessagesRoute,
  MarkAsReadRoute,
  SendMessageRoute,
} from './types';

class ChatController {
  public createChat = async (
    req: FastifyRequest<CreateChatRoute>,
    reply: FastifyReply<CreateChatRoute>,
  ) => {
    const userId = req.authUser.id;
    const { authorId, toId, content } = req.body;

    if (authorId !== userId) throw new ForbiddenError('You cannot act as another account');

    const recipient = await userRepository.find({ id: toId });
    if (!can(recipient.role, Permissions.CHAT_ACCESS)) {
      throw new ForbiddenError('This account cannot receive messages');
    }

    const newConv = await chatRepository.createConversation(userId, toId);
    const messageSent = await chatRepository.createMessage({
      authorId,
      toId,
      content,
      conversationId: newConv.id,
    });

    webSocketRegistry.sendToUsers(chatRecipientIds(newConv.participants), {
      data: messageSent,
      event: 'message',
    });

    const conversation = await chatRepository.listOneConversation(newConv.id);

    reply.code(200).send(conversation);
    return;
  };

  public listConversations = async (
    req: FastifyRequest,
    reply: FastifyReply<ListConversationsRoute>,
  ) => {
    const userId = req.authUser.id;
    const conversations = await chatRepository.listConversationsForUser(userId);

    reply.code(200).send(conversations);
    return;
  };

  public listMessages = async (
    req: FastifyRequest<ListMessagesRoute>,
    reply: FastifyReply<ListMessagesRoute>,
  ) => {
    const conversationId = req.query.conversationId;
    const userId = req.authUser.id;
    const conversation = await chatRepository.listOneConversation(conversationId);

    if (!isAParticipant(userId, conversation.participants))
      throw new ForbiddenError('You are not a participant of this conversation');

    const messages = await chatRepository.listMessageByConversationId(conversationId);

    reply.code(200).send(messages);
    return;
  };

  public sendMessage = async (
    req: FastifyRequest<SendMessageRoute>,
    reply: FastifyReply<SendMessageRoute>,
  ) => {
    const userId = req.authUser.id;
    const message = req.body;
    const { authorId, conversationId } = message;

    const conversation = await chatRepository.listOneConversation(conversationId);

    if (authorId !== userId) throw new ForbiddenError('You cannot act as another account');
    if (!isAParticipant(authorId, conversation.participants)) {
      throw new ForbiddenError('You are not a participant of this conversation');
    }

    const recipients = chatRecipientIds(conversation.participants);
    if (!recipients.includes(message.toId)) {
      throw new ForbiddenError('This account cannot receive messages');
    }

    const newMessage = await chatRepository.createMessage(message);
    webSocketRegistry.sendToUsers(recipients, { data: newMessage, event: 'message' });

    reply.code(200).send(newMessage);
    return;
  };

  public markAsRead = async (req: FastifyRequest<MarkAsReadRoute>, reply: FastifyReply) => {
    const userId = req.authUser.id;
    const conversationId = req.body.conversationId;

    const conversation = await chatRepository.listOneConversation(conversationId);
    if (!isAParticipant(userId, conversation.participants)) {
      throw new ForbiddenError('You are not a participant of this conversation');
    }

    await chatRepository.markAsRead(conversationId, userId);

    reply.code(200).send();
  };
}

export const chatController = new ChatController();
