import { FastifyReply, FastifyRequest } from "fastify";
import { chatRepository } from "../repositories/chat";
import { RouteGenericInterface } from "fastify";
import { Message } from "../domain/chat";
import { websocketController } from "./websocket";
import { UnauthorizedError } from "../domain/errors";

interface CreateChatRequest extends RouteGenericInterface {

    Body : {
        message : Message;
        recipientId : string;
    }
}

interface SendMessageRequest extends RouteGenericInterface {

    Body : {
        message : Message;
    }

    Reply : Message
}

class ChatController {

    public createChat = async ( req : FastifyRequest<CreateChatRequest>, reply : FastifyReply ) => {
        
        const userId = req.authUser.id;
        const recipientId = req.body.recipientId;
        const message = req.body.message;

        if ( message.participantId != userId )
            throw new UnauthorizedError("Unauthorized to send this message")
        
        await chatRepository.createConversation( userId, recipientId );
        await chatRepository.createMessage( message );
        await websocketController.sendMessage( message );

        reply.code(200).send();
        return ;
    }

    public listConversation = async ( req : FastifyRequest, reply : FastifyReply ) => {
        
        const userId = req.authUser.id;
        const conversation = await chatRepository.listConversationForUser( userId );
        
        reply.code(200).send( conversation );
        return ;
    }

    public sendMessage = async ( req : FastifyRequest<SendMessageRequest>, reply : FastifyReply<SendMessageRequest> ) => {

        const message = req.body.message;
        const userId = message.participantId;

        if ( message.participantId != userId )
            throw new UnauthorizedError("Unauthorized to send this message")

        const toSend = await chatRepository.createMessage( message );
        await websocketController.sendMessage( toSend );

        reply.code(200).send( toSend );
        return ;
    }
}

export const chatController = new ChatController();