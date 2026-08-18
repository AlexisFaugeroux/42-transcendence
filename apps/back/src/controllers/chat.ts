import type { FastifyReply, FastifyRequest } from 'fastify';
import type { RouteGenericInterface } from 'fastify';
import type { Conversation, Message } from '../domain/chat';
import { UnauthorizedError } from '../domain/errors';
import { chatRepository } from '../repositories/chat';
import { websocketController } from './websocket';

interface CreateChatRequest extends RouteGenericInterface {
  Body: {
    messageInput: {
      authorId: string;
      toId: string;
      content: string;
    };
  };
  Reply: Conversation;
}

interface SendMessageRequest extends RouteGenericInterface {
  Body: {
    message: Message;
  };

  Reply: Message;
}

interface MarkAsReadRequest extends RouteGenericInterface {
  Body: {
    conversationId: string;
  };
}

class ChatController {
  public createChat = async (
    req: FastifyRequest<CreateChatRequest>,
    reply: FastifyReply<CreateChatRequest>,
  ) => {
    const userId = req.authUser.id;
    const { messageInput } = req.body;

    if (messageInput.authorId !== userId)
      throw new UnauthorizedError('Unauthorized to send this message');

    const create = await chatRepository.createConversation(userId, messageInput.toId);
    const messageSent = await chatRepository.createMessage({
      ...messageInput,
      conversationId: create.id,
    });
    await websocketController.sendMessage(messageSent);
    const conversation = await chatRepository.listOneConversation(create.id);

    reply.code(200).send(conversation);
    return;
  };

  public listConversations = async (req: FastifyRequest, reply: FastifyReply) => {
    const userId = req.authUser.id;
    const conversations = await chatRepository.listConversationsForUser(userId);

    reply.code(200).send(conversations);
    return;
  };

  public sendMessage = async (
    req: FastifyRequest<SendMessageRequest>,
    reply: FastifyReply<SendMessageRequest>,
  ) => {
    const message = req.body.message;
    const { authorId, conversationId } = message;

    const conversation = await chatRepository.listOneConversation(conversationId);

    if (message.authorId != authorId || !this.isAParticipant(authorId, conversation.participants))
      throw new UnauthorizedError('Unauthorized to send this message');

    const toSend = await chatRepository.createMessage(message);
    await websocketController.sendMessage(toSend);

    reply.code(200).send(toSend);
    return;
  };

  public markAsRead = async (req: FastifyRequest<MarkAsReadRequest>, reply: FastifyReply) => {
    const userId = req.authUser.id;
    const conversationId = req.body.conversationId;

    const conversation = await chatRepository.listOneConversation(conversationId);
    if (!this.isAParticipant(userId, conversation.participants))
      throw new UnauthorizedError('Unauthorized to send this message');
    await chatRepository.markAsRead(conversationId, userId);
    reply.code(200).send();
  };

  private isAParticipant = (userId: string, participants: Conversation['participants']) => {
    return participants.find((participant) => participant.id === userId) !== undefined;
  };
}

export const chatController = new ChatController();
