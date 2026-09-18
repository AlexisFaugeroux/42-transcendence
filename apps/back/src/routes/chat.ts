import { Permissions } from '@transcendence/permissions';
import type { FastifyInstance } from 'fastify';
import { RATE_LIMITS } from '../constants';
import { chatController } from '../controllers/chat/chat';
import {
  conversationSchema,
  conversationsResponseSchema,
  messageSchema,
  messagesResponseSchema,
} from './schemas/chat';

const sendMessageSchema = {
  description:
    'Deliver a message to another producer. It is persisted and pushed live over the WebSocket if the recipient is connected.',
  summary: 'Send a direct message',
  tags: ['chat'],
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
  description:
    'Get the thread with a producer, creating it if it does not exist. The canonical pair key makes a duplicate impossible.',
  summary: 'Open a conversation',
  tags: ['chat'],
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
  description: 'Reset your unread count on a thread and record when you read it.',
  summary: 'Mark a conversation as read',
  tags: ['chat'],
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
  description: 'Every thread the authenticated account takes part in, with its unread count.',
  summary: 'List your conversations',
  tags: ['chat'],
  response: {
    200: conversationsResponseSchema,
  },
};

const listMessagesSchema = {
  description: 'The messages of one thread, newest last.',
  summary: 'Read a conversation',
  tags: ['chat'],
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
      config: { rateLimit: RATE_LIMITS.read },
      preHandler: [app.authenticate, app.authorize(Permissions.CHAT_ACCESS)],
      schema: listConversationsSchema,
    },
    chatController.listConversations,
  );

  app.get(
    '/listMessages',
    {
      config: { rateLimit: RATE_LIMITS.read },
      preHandler: [app.authenticate, app.authorize(Permissions.CHAT_ACCESS)],
      schema: listMessagesSchema,
    },
    chatController.listMessages,
  );

  app.post(
    '/createConversation',
    {
      config: { rateLimit: RATE_LIMITS.dm },
      preHandler: [app.authenticate, app.authorize(Permissions.CHAT_ACCESS)],
      schema: createChatSchema,
    },
    chatController.createChat,
  );

  app.post(
    '/sendMessage',
    {
      config: { rateLimit: RATE_LIMITS.write },
      preHandler: [app.authenticate, app.authorize(Permissions.CHAT_ACCESS)],
      schema: sendMessageSchema,
    },
    chatController.sendMessage,
  );

  app.post(
    '/markAsRead',
    {
      config: { rateLimit: RATE_LIMITS.write },
      preHandler: [app.authenticate, app.authorize(Permissions.CHAT_ACCESS)],
      schema: markAsReadSchema,
    },
    chatController.markAsRead,
  );
}
