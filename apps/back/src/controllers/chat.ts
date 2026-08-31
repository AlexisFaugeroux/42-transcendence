import type { FastifyReply, FastifyRequest } from 'fastify';
import type { RouteGenericInterface } from 'fastify';
import type { Conversation, Message } from '../domain/chat';
import type { CreateMessageInput } from '../domain/chat';
import { UnauthorizedError } from '../domain/errors';
import { chatRepository } from '../repositories/chat';
import { websocketController } from './websocket';

interface CreateChatRequest extends RouteGenericInterface {
  Body: {
    authorId: string;
    toId: string;
    content: string;
  };
  Reply: Conversation;
}

interface ListMessages extends RouteGenericInterface {
  Querystring: {
    conversationId: string;
  };
  Reply: Message[];
}

interface SendMessageRequest extends RouteGenericInterface {
  Body: CreateMessageInput;
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
    const { authorId, toId, content } = req.body;

    if (authorId !== userId) throw new UnauthorizedError('Unauthorized to send this message');

    const create = await chatRepository.createConversation(userId, toId);
    const messageSent = await chatRepository.createMessage({
      authorId,
      toId,
      content,
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

  public listMessages = async (
    req: FastifyRequest<ListMessages>,
    reply: FastifyReply<ListMessages>,
  ) => {
    const conversationId = req.query.conversationId;
    const userId = req.authUser.id;
    const conversation = await chatRepository.listOneConversation(conversationId);

    if (!this.isAParticipant(userId, conversation.participants))
      throw new UnauthorizedError('Unauthorized to get those messages');

    const messages = await chatRepository.listMessageByConversationId(conversationId);
    reply.code(200).send(messages);
    return;
  };

  public sendMessage = async (
    req: FastifyRequest<SendMessageRequest>,
    reply: FastifyReply<SendMessageRequest>,
  ) => {
    const userId = req.authUser.id;
    const message = req.body;
    const { authorId, conversationId } = message;

    const conversation = await chatRepository.listOneConversation(conversationId);

    if (authorId !== userId || !this.isAParticipant(authorId, conversation.participants))
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
