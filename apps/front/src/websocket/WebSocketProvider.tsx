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
import type { WebSocketEvent } from '../types/event';

interface WebsocketContextValue {
  subscribe: (handler: eventHandler) => () => void;
}

type eventHandler = (input: WebSocketEvent) => void;

const websocketContext = createContext<WebsocketContextValue | null>(null);

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

    const ws = new WebSocket(`/api/ws`);

    ws.onopen = (event) => {
      if (import.meta.env.DEV) console.log('socket open', event);
    };

    ws.onmessage = (event: MessageEvent<string>) => {
      const message = JSON.parse(event.data) as WebSocketEvent;
      handlers.current.forEach((handler) => {
        handler(message);
      });
    };

    ws.onclose = (event) => {
      if (import.meta.env.DEV) console.log('socket close:', event);
    };

    return () => {
      ws.onmessage = null;
      if (ws.readyState === WebSocket.CONNECTING) {
        ws.onopen = () => {
          ws.close();
        };
      } else {
        ws.close();
      }
    };
  }, [loading, userId]);

  return <websocketContext.Provider value={{ subscribe }}>{children}</websocketContext.Provider>;
}

export function useSocket() {
  const ctx = useContext(websocketContext);
  if (!ctx) throw new Error('useContext used outside a WebSocketProvider');
  return ctx;
}
