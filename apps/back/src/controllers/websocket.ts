import type { WebSocket } from "@fastify/websocket";
import type { FastifyRequest } from "fastify";
import { userRepository } from "../repositories/user";

class WebsocketControler {

    private sockets : Map<string, WebSocket> = new Map<string, Set<WebSocket | null>>;

    public ws = async ( socket : WebSocket, req : FastifyRequest ) => {
     
        const userId = req.authUser.id;

        let userSockets : Set<WebSocket | null> = this.sockets.get( userId );
        if ( userSockets === undefined) 
        {    
            userSockets = new Set<WebSocket>();userSockets.add( socket );
            this.sockets.set( userId, userSockets);
        }
        
        userSockets.add( socket );

        socket.on( 'close', async () => {

            let userSockets : Set<WebSocket | null> = this.sockets.get( userId );
            console.log("DISCONNED : ", userId, "nb socket :", userSockets?.size);
           
            userSockets?.delete( socket );
            if ( userSockets?.size == 0 )
            {
                this.sockets.delete( userId );
                console.log("DECONNEXION DANS LE BACK");
                for ( let key of this.sockets.keys() ) {
                    if ( key !== userId && this.sockets.get( key ) !== null )
                        await this.broadcastConnection( key, userId, "FollowingDisconnected" );
                }
            }        
        });

        // recuperation des following par l'appelant
        const followingOnlineAtConnexion = await this.getFollowingAtConnextion( userId );
        console.log( "cacacacaca :", followingOnlineAtConnexion );
        socket.send(
            JSON.stringify({ 
                event : "OnlineFolloingAtConnexion", 
                data : followingOnlineAtConnexion
        }));
        

        if ( userSockets.size > 1 ){
            return 
        };
        // broadcast aux followers
        for ( let key of this.sockets.keys() ) {
            if ( key !== userId && this.sockets.get( key ) !== null )
                await this.broadcastConnection( key, userId, "FollowingConnected" );
        }

        console.log("CONNEXION DANS LE BACK");


    }

    private broadcastConnection = async ( userBroadcastToId : string, newUserConnectedId : string, event : string ) => {
        
        console.log("BROADCAST FT")
        const following = await userRepository.listFollowingIdsByUserId( userBroadcastToId );
        for ( let followId of following) {
            if ( followId === newUserConnectedId )
            {
                const sockets : Set<WebSocket> = this.sockets.get( userBroadcastToId );
                for ( let socket of sockets ) {
                    console.log("Broadcast to : ", userBroadcastToId);
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
}

export const websocketControler = new WebsocketControler;