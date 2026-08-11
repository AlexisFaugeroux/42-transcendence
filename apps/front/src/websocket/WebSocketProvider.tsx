import {
  createContext,
  useContext,
  useEffect,
  useState,
  type JSX,
  type ReactNode,
} from "react";

type Message = {
    from : string;
    to : string;
    time : string;
    message : string;
}

interface WebsocketContextValue {

    socket : WebSocket;
    sendMessage : ( message : Message) => void;
}

const websocketContext = createContext<WebsocketContextValue | null>(null);

export function WebSocketProvider({ 
    children 
}: { 
    children : ReactNode 
}) : JSX.Element {

    const socket = new WebSocket("http://localhost:8080/ws");

    socket.onmessage = ( event : MessageEvent) => {
        console.log( JSON.parse(event.data) );
    }
    
    socket.onclose = ( event ) => {
        console.log( "CLOSE", event );
    }

    const sendMessage = ( message : Message ) => {
        if ( socket.readyState === WebSocket.OPEN )
            socket.send( JSON.stringify( message ));
    }

    return (
        <websocketContext.Provider value={{socket, sendMessage}}>
            { children }
        </websocketContext.Provider>
    )
}

export function useSocket() {
    const ctx = useContext( websocketContext );
    if (!ctx) throw new Error("useContext used outside a WebSocketProvider");
    return ctx;
}