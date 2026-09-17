import { Permissions } from '@transcendence/permissions';
import type { FastifyInstance } from 'fastify';
import { chatController } from '../controllers/chat/chat';
import {
  conversationSchema,
  conversationsResponseSchema,
  messageSchema,
  messagesResponseSchema,
} from './schemas/chat';

const sendMessageSchema = {
  body: {
    additionalProperties: false,
    properties: {
      authorId: { format: 'uuid', type: 'string' },
      content: { minLength: 1, type: 'string' },
      conversationId: { format: 'uuid', type: 'string' },
      toId: { format: 'uuid', type: 'string' },
    },
    required: ['authorId', 'content', 'toId', 'conversationId'],
    type: 'object',
  },
  response: {
    200: messageSchema,
  },
};

const createChatSchema = {
  body: {
    additionalProperties: false,
    properties: {
      authorId: { format: 'uuid', type: 'string' },
      content: { minLength: 1, type: 'string' },
      toId: { format: 'uuid', type: 'string' },
    },
    required: ['authorId', 'toId', 'content'],
    type: 'object',
  },
  response: {
    200: conversationSchema,
  },
};

const markAsReadSchema = {
  body: {
    additionalProperties: false,
    properties: {
      conversationId: { format: 'uuid', type: 'string' },
    },
    required: ['conversationId'],
    type: 'object',
  },
};

const listConversationsSchema = {
  response: {
    200: conversationsResponseSchema,
  },
};

const listMessagesSchema = {
  querystring: {
    additionalProperties: false,
    properties: {
      conversationId: { format: 'uuid', type: 'string' },
    },
    required: ['conversationId'],
    type: 'object',
  },
  response: {
    200: messagesResponseSchema,
  },
};

export function chatRoutes(app: FastifyInstance) {
  app.get(
    '/listConversations',
    {
      preHandler: [app.authenticate, app.authorize(Permissions.CHAT_ACCESS)],
      schema: listConversationsSchema,
    },
    chatController.listConversations,
  );

  app.get(
    '/listMessages',
    {
      preHandler: [app.authenticate, app.authorize(Permissions.CHAT_ACCESS)],
      schema: listMessagesSchema,
    },
    chatController.listMessages,
  );

  app.post(
    '/createConversation',
    {
      preHandler: [app.authenticate, app.authorize(Permissions.CHAT_ACCESS)],
      schema: createChatSchema,
    },
    chatController.createChat,
  );

  app.post(
    '/sendMessage',
    {
      preHandler: [app.authenticate, app.authorize(Permissions.CHAT_ACCESS)],
      schema: sendMessageSchema,
    },
    chatController.sendMessage,
  );

  app.post(
    '/markAsRead',
    {
      preHandler: [app.authenticate, app.authorize(Permissions.CHAT_ACCESS)],
      schema: markAsReadSchema,
    },
    chatController.markAsRead,
  );
}
