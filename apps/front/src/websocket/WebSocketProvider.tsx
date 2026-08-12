import {
  createContext,
  useContext,
  useEffect,
  useState,
  type JSX,
  type ReactNode,
} from "react";

import { useUser } from "@transcendence/auth";

type Message = {
    from : string;
    to : string;
    time : string;
    message : string;
}

interface WebsocketContextValue {
    sendMessage : ( message : Message) => void,
    followingConnected : string[],
    socket: WebSocket | undefined;
}

const websocketContext = createContext<WebsocketContextValue | null>(null);

export function WebSocketProvider({ 
    children 
}: { 
    children : ReactNode 
}) : JSX.Element {

    const [socket, setsocket] = useState<WebSocket>();
    const [followingConnected, setFollowingConnected] = useState<string[]>([]);
    const { loading, user } = useUser();
   
    useEffect( () => {

        if (loading || !user)
            return ;

        const ws = new WebSocket("http://localhost:8080/ws");
        
        ws.onopen = ( event ) => {
            console.log("socket open", event)
            setsocket( ws );
        }

        ws.onmessage = ( event : MessageEvent) => {

            const message : { event : string, data : string[] } = JSON.parse(event.data);
            
            // connexion 
            if ( message.event == "OnlineFolloingAtConnexion") {
                const usersAlreadyConnected = message.data;
                console.log("Already Connected : ", message);
                setFollowingConnected( usersAlreadyConnected );
            }
            // folllowing connected
            else if ( message.event == "FollowingConnected") {

                const userConnectedId = message.data[0]; 
                console.log( "conected : ", userConnectedId);
                setFollowingConnected((current) =>
                  current.includes(userConnectedId)
                    ? current
                    : [...current, userConnectedId],
                );                
            }
            // following disconnected
            else if ( message.event == "FollowingDisconnected") {

                const userDisconnectedId = message.data[0];
                console.log( "disconneect : ", userDisconnectedId);
                setFollowingConnected((current) =>
                  current.filter((id) => id !== userDisconnectedId),
                );
            }
        }

        ws.onclose = ( event ) => {
            console.log( "CLOSE", event ); 
        }

        return () => { 
            ws.close();
        }

    }, [loading, user?.id]);

    useEffect( () => {
        console.log( "Current following connexted:",  followingConnected );
    },[followingConnected]);
    const sendMessage = ( message : Message ) => {
        if ( socket && socket.readyState === WebSocket.OPEN )
            socket.send( JSON.stringify( message ));
    }

    return (
        <websocketContext.Provider value={{sendMessage, followingConnected, socket}}>
            { children }
        </websocketContext.Provider>
    )
}

export function useSocket() {
    const ctx = useContext( websocketContext );
    if (!ctx) throw new Error("useContext used outside a WebSocketProvider");
    return ctx;
}