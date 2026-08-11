import type { WebSocket } from "@fastify/websocket";
import type { FastifyRequest } from "fastify";
import { userRepository } from "../repositories/user";

class WebsocketControler {

    private sockets : Map<string, WebSocket> = new Map<string, WebSocket>;

    public ws = async ( socket : WebSocket, req : FastifyRequest ) => {
     
        const userId = req.authUser.id;
        socket.send( JSON.stringify({ message : "CONNECTED"}) );
        this.sockets.set( userId, socket);
        for ( let key of this.sockets.keys() ) {
            if ( key !== userId)
                await this.broadcastConnection( key, userId );
        }

    }

    private broadcastConnection = async ( userBroadcastToId : string, newUserConnectedId : string ) => {
        
        const following = await userRepository.listFollowing( userBroadcastToId );
        for ( let follow of following) {
            if ( follow.id === newUserConnectedId )
            {
                const socket : WebSocket = this.sockets.get( userBroadcastToId );
                socket.send();
                return ;
            }
        }
    }
}

export const websocketControler = new WebsocketControler;