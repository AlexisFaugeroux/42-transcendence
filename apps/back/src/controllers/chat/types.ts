import type { RouteGenericInterface } from 'fastify';
import type { Conversation, Message } from '../../domain/chat';
import type { CreateMessageInput } from '../../domain/chat';

export interface CreateChatRequest extends RouteGenericInterface {
  Body: {
    authorId: string;
    toId: string;
    content: string;
  };
  Reply: Conversation;
}

export interface ListMessages extends RouteGenericInterface {
  Querystring: {
    conversationId: string;
  };
  Reply: Message[];
}

export interface SendMessageRequest extends RouteGenericInterface {
  Body: CreateMessageInput;
  Reply: Message;
}

export interface MarkAsReadRequest extends RouteGenericInterface {
  Body: {
    conversationId: string;
  };
}
