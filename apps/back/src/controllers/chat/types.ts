import type { RouteGenericInterface } from 'fastify';
import type { Conversation, Message } from '../../domain/chat';
import type { CreateMessageInput } from '../../domain/chat';

export interface CreateChatRoute extends RouteGenericInterface {
  Body: {
    authorId: string;
    toId: string;
    content: string;
  };
  Reply: Conversation;
}

export interface ListMessagesRoute extends RouteGenericInterface {
  Querystring: {
    conversationId: string;
  };
  Reply: Message[];
}

export interface ListConversationsRoute extends RouteGenericInterface {
  Reply: Conversation[];
}

export interface SendMessageRoute extends RouteGenericInterface {
  Body: CreateMessageInput;
  Reply: Message;
}

export interface MarkAsReadRoute extends RouteGenericInterface {
  Body: {
    conversationId: string;
  };
}
