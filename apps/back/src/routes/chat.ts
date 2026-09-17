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
    { preHandler: app.authenticate, schema: listConversationsSchema },
    chatController.listConversations,
  );

  app.get(
    '/listMessages',
    { preHandler: app.authenticate, schema: listMessagesSchema },
    chatController.listMessages,
  );

  app.post(
    '/createConversation',
    { preHandler: app.authenticate, schema: createChatSchema },
    chatController.createChat,
  );

  app.post(
    '/sendMessage',
    { preHandler: app.authenticate, schema: sendMessageSchema },
    chatController.sendMessage,
  );

  app.post(
    '/markAsRead',
    { preHandler: app.authenticate, schema: markAsReadSchema },
    chatController.markAsRead,
  );
}
