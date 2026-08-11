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
    sendMessage : ( message : Message) => void;
}

const websocketContext = createContext<WebsocketContextValue | null>(null);

export function WebSocketProvider({ 
    children 
}: { 
    children : ReactNode 
}) : JSX.Element {

    const [socket, setsocket] = useState<WebSocket>();
    const [followingConnected, setFollowingConnected] = useState<string[] | null>(null);
    const { loading, user } = useUser();
   
    useEffect( () => {
        if (loading || !user)
            return ;
        const ws = new WebSocket("http://localhost:8080/ws");
        
        ws.onopen = ( event ) => {
            console.log( event );
            setsocket( ws );
        }

        ws.onmessage = ( event : MessageEvent) => {
            const message : { event : string, id : string } = JSON.parse(event.data);
            if ( message.event == "FollowingConnected") {
                const userConnectedId = message.id; 
                setFollowingConnected(followingConnected ? [ userConnectedId, ...followingConnected] : [ userConnectedId ]);
            }
            else if ( message.event == "FollowingDisconnected") {
                const userDisconnectedId = message.id;
                setFollowingConnected((followingConnected) =>
                  followingConnected === null
                    ? null
                    : followingConnected.filter((id) => id !== userDisconnectedId),
                );
            }
            console.log( "ws EVENT :",  followingConnected )
        }

        ws.onclose = ( event ) => {
            console.log( "CLOSE", event ); 
        }

        return () => { 
            ws.close();
        }

    }, [loading, user?.id]);


    const sendMessage = ( message : Message ) => {
        if ( socket && socket.readyState === WebSocket.OPEN )
            socket.send( JSON.stringify( message ));
    }

    return (
        <websocketContext.Provider value={{sendMessage}}>
            { children }
        </websocketContext.Provider>
    )
}

export function useSocket() {
    const ctx = useContext( websocketContext );
    if (!ctx) throw new Error("useContext used outside a WebSocketProvider");
    return ctx;
}