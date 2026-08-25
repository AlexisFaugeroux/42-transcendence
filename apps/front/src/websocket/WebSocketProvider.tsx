import { useUser } from '@transcendence/auth';
import {
  createContext,
  type JSX,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import type { SocketEvent } from '../types/event';

interface WebsocketContextValue {
  subscribe: (handler: eventHandler) => () => void;
}

type eventHandler = (input: SocketEvent) => void;

const websocketContext = createContext<WebsocketContextValue | null>(null);

const BASE_URL = import.meta.env.VITE_API_URL;

export function WebSocketProvider({ children }: { children: ReactNode }): JSX.Element {
  const { loading, user } = useUser();
  const userId = user?.id;
  const handlers = useRef<Set<eventHandler>>(new Set<eventHandler>());

  const subscribe = useCallback((handler: eventHandler) => {
    handlers.current.add(handler);
    return () => {
      handlers.current.delete(handler);
    };
  }, []);

  useEffect(() => {
    if (loading || !userId) return;

    const ws = new WebSocket(`${BASE_URL}/api/ws`);

    ws.onopen = (event) => {
      console.log('socket open', event);
    };

    ws.onmessage = (event: MessageEvent<string>) => {
      const message = JSON.parse(event.data) as SocketEvent;
      handlers.current.forEach((handler) => {
        handler(message);
      });
    };

    ws.onclose = (event) => {
      console.log('socket close:', event);
    };

    return () => {
      ws.close();
    };
  }, [loading, userId]);

  return <websocketContext.Provider value={{ subscribe }}>{children}</websocketContext.Provider>;
}

export function useSocket() {
  const ctx = useContext(websocketContext);
  if (!ctx) throw new Error('useContext used outside a WebSocketProvider');
  return ctx;
}
