import type { WebSocket } from "@fastify/websocket";
import type { FastifyRequest } from "fastify";
import { userRepository } from "../repositories/user";

class WebsocketControler {

    private sockets : Map<string, WebSocket> = new Map<string, Set<WebSocket | null>>;
    private alive : WeakMap<WebSocket, boolean> = new WeakMap<WebSocket, boolean>;

    public ws = async ( socket : WebSocket, req : FastifyRequest ) => {
     
        const userId = req.authUser.id;

        let userSockets : Set<WebSocket | null> = this.sockets.get( userId );
        if ( userSockets === undefined) 
        {    
            userSockets = new Set<WebSocket>();
            this.sockets.set( userId, userSockets);
        }
        
        userSockets.add( socket );
        this.alive.set(socket, true);

        socket.on( 'close', async () => {
            let socketSet : Set<WebSocket | null> = this.sockets.get( userId );
            await this.disconnect( socketSet, socket, userId );
        });

        socket.on('pong', () => {
          this.alive.set(socket, true);
        });
        
        const nb_user_socket =  userSockets.size ;
        
        // recuperation des following par l'appelant
        const followingOnlineAtConnexion = await this.getFollowingAtConnextion( userId );
        socket.send(
            JSON.stringify({ 
                event : "OnlineFolloingAtConnexion", 
                data : followingOnlineAtConnexion
        }));
        
        if (nb_user_socket > 1 ){
            return 
        };
        // broadcast aux followers
        for ( let key of this.sockets.keys() ) {
            if ( key !== userId && this.sockets.get( key ) !== null )
                await this.broadcastConnection( key, userId, "FollowingConnected" );
        }

    }

    private broadcastConnection = async ( userBroadcastToId : string, newUserConnectedId : string, event : string ) => {
        
        const following = await userRepository.listFollowingIdsByUserId( userBroadcastToId );
        for ( let followId of following) {
            if ( followId === newUserConnectedId )
            {
                const sockets : Set<WebSocket> = this.sockets.get( userBroadcastToId );
                for ( let socket of sockets ) {
                    socket.send( 
                        JSON.stringify({ 
                            event : event, 
                            data : [ followId ]
                    }) );
                }
                return ;
            }
        }
    }

    private getFollowingAtConnextion  = async ( userId : string ) => {
        let followingConnected : string[] = [];

        const following = await userRepository.listFollowingIdsByUserId( userId );
        for ( let followId of following )
        {
            if ( this.sockets.has( followId ) )
                followingConnected.push( followId );
        }
        return followingConnected;
    }

    private disconnect = async ( socketSet : Set<WebSocket>, socket : WebSocket, userId : string ) => {
        
        socketSet?.delete( socket );
        if ( socketSet?.size == 0 )
        {
            this.sockets.delete( userId );
            for ( let key of this.sockets.keys() ) {
                if ( key !== userId && this.sockets.get( key ) !== null )
                    await this.broadcastConnection( key, userId, "FollowingDisconnected" );
            }
        }    
    }
            
    public pong = setInterval( async () => {
            for ( const socketsSet of this.sockets.values() ) {
                for ( const socket of socketsSet )
                {
                    if ( this.alive.get(socket) === false ) {
                        socket.terminate();
                        continue ;
                    }
                    this.alive.set(socket, false);
                    socket.ping();
                }
            }
        }, 15000);
}

export const websocketControler = new WebsocketControler;
