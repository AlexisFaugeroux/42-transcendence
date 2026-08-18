import { FastifyInstance } from "fastify";
import { chatController } from "../controllers/chat";

const createChatSchema = {
  body: {
    properties: {
        message : {
            id: { type : 'string'},
            content: { type : 'string'},
            participantId: { type : 'string'},
            conversationId: { type : 'string'},
        },
        recipientId : { type : 'string'}
    },
    required: ['id', 'content', 'participantId', 'conversationId', 'recipientId'],
    type: 'object',
  },
};

const sendMessageSchema = {
  body: {
    properties: {
        message : {
            id: { type : 'string'},
            content: { type : 'string'},
            participantId: { type : 'string'},
            conversationId: { type : 'string'},
        },
    },
    required: ['id', 'content', 'participantId', 'conversationId', 'recipientId'],
    type: 'object',
  },
};

export function chatRoutes( app : FastifyInstance ) {

    app.get('/listConversation', { preHandler : app.authenticate }, chatController.listConversation);

    app.post('/createChat', {preHandler : app.authenticate, schema : createChatSchema}, chatController.createChat);

    app.post('/sendMessage', { preHandler : app.authenticate, schema : sendMessageSchema}, chatController.sendMessage)
}