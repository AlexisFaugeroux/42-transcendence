import { Role } from '@transcendence/permissions';

const messageProperties = {
  authorId: { type: 'string' },
  content: { type: 'string' },
  createdAt: { format: 'date-time', type: 'string' },
  id: { type: 'string' },
  toId: { type: 'string' },
};

export const messageSchema = {
  additionalProperties: false,
  properties: {
    ...messageProperties,
    conversationId: { type: 'string' },
  },
  required: ['id', 'content', 'authorId', 'conversationId', 'toId', 'createdAt'],
  type: 'object',
};

const nestedMessageSchema = {
  additionalProperties: false,
  properties: messageProperties,
  required: ['id', 'content', 'authorId', 'toId', 'createdAt'],
  type: 'object',
};

export const conversationSchema = {
  additionalProperties: false,
  properties: {
    id: { type: 'string' },
    lastMessage: { ...nestedMessageSchema, type: ['object', 'null'] },
    lastMessageAt: { format: 'date-time', type: 'string' },
    messageSorted: { items: nestedMessageSchema, type: 'array' },
    participants: {
      items: {
        additionalProperties: false,
        properties: {
          artistName: { type: 'string' },
          handle: { type: 'string' },
          id: { type: 'string' },
          role: { enum: Object.values(Role), type: 'string' },
          unreadCount: { minimum: 0, type: 'integer' },
        },
        required: ['id', 'unreadCount', 'handle', 'artistName', 'role'],
        type: 'object',
      },
      type: 'array',
    },
    updatedAt: { format: 'date-time', type: 'string' },
  },
  required: ['id', 'lastMessageAt', 'lastMessage', 'updatedAt', 'participants', 'messageSorted'],
  type: 'object',
};

export const conversationsResponseSchema = { items: conversationSchema, type: 'array' };
export const messagesResponseSchema = { items: messageSchema, type: 'array' };
