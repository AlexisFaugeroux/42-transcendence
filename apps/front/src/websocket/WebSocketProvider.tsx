import { useUser } from '@transcendence/auth';
import { createContext, type JSX, type ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react';

interface WebsocketContextValue {
  subscribe : ( handler : eventHandler) => () => void;
}

type eventHandler = ( input : { event: string; data: string[] }) => void;


const websocketContext = createContext<WebsocketContextValue | null>(null);

const BASE_URL = import.meta.env.VITE_API_URL;

export function WebSocketProvider({ children }: { children: ReactNode }): JSX.Element {
  const [socket, setsocket] = useState<WebSocket>();
  const { loading, user } = useUser();
  const userId = user?.id;
  const handlers = useRef<Set<eventHandler>>(new Set<eventHandler>());

  const subscribe = useCallback( (handler : eventHandler) => {
      handlers.current.add(handler);
      console.log("SUBSCRIBE")
      return () => {
        console.log("UNSUBSCIBE");
        handlers.current.delete(handler);
      }
    }, [] );

  useEffect(() => {
    if (loading || !userId) return;

    const ws = new WebSocket(`${BASE_URL}api/ws`);

    ws.onopen = (event) => {
      console.log('socket open', event);
      setsocket(ws);
    };

    ws.onmessage = (event: MessageEvent<string>) => {
      const message = JSON.parse(event.data) as { event: string; data: string[] };
      handlers.current.forEach( ( handler ) => handler( message ));
    };

    ws.onclose = (event) => {
      console.log('ws close:', event);
    };

    return () => {
      ws.close();
    };
  }, [loading, userId]);

  return (
    <websocketContext.Provider value={{ subscribe }}>
      {children}
    </websocketContext.Provider>
  );
}

export function useSocket() {
  const ctx = useContext(websocketContext);
  if (!ctx) throw new Error('useContext used outside a WebSocketProvider');
  return ctx;
}


