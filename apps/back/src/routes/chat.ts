import type { FastifyInstance } from 'fastify';
import { chatController } from '../controllers/chat/chat';

const sendMessageSchema = {
  additionalProperties: false,
  body: {
    properties: {
      authorId: { type: 'string' },
      content: { type: 'string' },
      conversationId: { type: 'string' },
      toId: { type: 'string' },
    },
    required: ['authorId', 'content', 'toId', 'conversationId'],
    type: 'object',
  },
};

const createChatSchema = {
  body: {
    properties: {
      authorId: { type: 'string' },
      content: { type: 'string' },
      toId: { type: 'string' },
    },
    required: ['authorId', 'toId', 'content'],
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

  app.get('/listMessages', { preHandler: app.authenticate }, chatController.listMessages);

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
