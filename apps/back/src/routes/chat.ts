import type { FastifyInstance } from 'fastify';
import { chatController } from '../controllers/chat';

const messageSchema = {
  additionalProperties: false,
  properties: {
    authorId: { type: 'string' },
    content: { type: 'string' },
    conversationId: { type: 'string' },
    toId: { type: 'string' },
  },
  required: ['id', 'content', 'toId', 'conversationId'],
  type: 'object',
};

const firstMessageSchema = {
  additionalProperties: false,
  properties: {
    authorId: { type: 'string' },
    content: { type: 'string' },
    toId: { type: 'string' },
  },
  required: ['authorId', 'id', 'content'],
  type: 'object',
};

const createChatSchema = {
  body: {
    properties: {
      message: firstMessageSchema,
    },
    required: ['message'],
    type: 'object',
  },
};

const sendMessageSchema = {
  body: {
    properties: {
      message: messageSchema,
    },
    required: ['message'],
    type: 'object',
  },
};

const markAsReadSchema = {
  body: {
    properties: {
      conversationId: { type: 'string' },
    },
    required: ['conversationId'],
    type: 'object',
  },
};

export function chatRoutes(app: FastifyInstance) {
  app.get('/listConversations', { preHandler: app.authenticate }, chatController.listConversations);

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
