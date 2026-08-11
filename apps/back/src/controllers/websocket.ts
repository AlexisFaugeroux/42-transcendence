import type { WebSocket } from "@fastify/websocket";
import type { FastifyRequest } from "fastify";
import { userRepository } from "../repositories/user";

class WebsocketControler {

    private sockets : Map<string, WebSocket> = new Map<string, Set<WebSocket | null>>;

    public ws = async ( socket : WebSocket, req : FastifyRequest ) => {
     
        const userId = req.authUser.id;

        let userSockets : Set<WebSocket | null> = this.sockets.get( userId );
        if (!userSockets) 
        {    
            userSockets = new Set<WebSocket>();userSockets.add( socket );
            this.sockets.set( userId, userSockets);
        }
        userSockets.add( socket );

        for ( let key of this.sockets.keys() ) {
            if ( key !== userId && this.sockets.get( key ) !== null )
                await this.broadcastConnection( key, userId, "FollowingConnected" );
        }
        socket.send(JSON.stringify({ message :"TU ES CO" }));
        

        socket.on( 'close', async () => {
            console.log("DISCONNED : ", userId);

            let userSockets : Set<WebSocket | null> = this.sockets.get( userId );
           
            userSockets?.delete( socket );
            if ( userSockets?.size == 0 )
                this.sockets.set( userId, null);

            for ( let key of this.sockets.keys() ) {
                if ( key !== userId && this.sockets.get( key ) !== null )
                    await this.broadcastConnection( key, userId, "FollowingDisconnected" );
            }        
        });
    }

    private broadcastConnection = async ( userBroadcastToId : string, newUserConnectedId : string, event : string ) => {
        
        const following = await userRepository.listFollowingIdsByUserId( userBroadcastToId );
        for ( let followId of following) {
            if ( followId === newUserConnectedId )
            {
                const sockets : Set<WebSocket> = this.sockets.get( userBroadcastToId );
                for ( let socket of sockets ) {
                    socket.send( JSON.stringify({ event : event, followingId : followId }) );
                }
                return ;
            }
        }
    }
}

export const websocketControler = new WebsocketControler;