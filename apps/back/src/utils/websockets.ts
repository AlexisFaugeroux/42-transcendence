import type { WebSocket } from '@fastify/websocket';
import type { Message } from '../domain/chat';

export interface PresenceEvent {
  event:
    | 'onlineFollowingAtConnection'
    | 'followingConnected'
    | 'followingDisconnected'
    | 'producerFollowed'
    | 'producerUnfollowed';
  data: string[];
}

export interface ChatEvent {
  event: 'message';
  data: Message;
}

export type WebSocketEvent = PresenceEvent | ChatEvent;

class WebSocketRegistry {
  private readonly _sockets: Map<string, Set<WebSocket>> = new Map<string, Set<WebSocket>>();
  private readonly _alive: WeakMap<WebSocket, boolean> = new WeakMap<WebSocket, boolean>();

  constructor() {
    setInterval(() => {
      for (const socketsSet of this._sockets.values()) {
        for (const socket of socketsSet) {
          if (this._alive.get(socket) === false) {
            socket.terminate();
            continue;
          }
          this._alive.set(socket, false);
          socket.ping();
        }
      }
    }, 15000).unref();
  }

  public add(userId: string, socket: WebSocket): number {
    let sockets = this._sockets.get(userId);
    if (!sockets) {
      sockets = new Set<WebSocket>();
      this._sockets.set(userId, sockets);
    }

    sockets.add(socket);
    this._alive.set(socket, true);

    socket.on('pong', () => {
      this._alive.set(socket, true);
    });

    return sockets.size;
  }

  public remove(userId: string, socket: WebSocket): number {
    const sockets = this._sockets.get(userId);
    if (!sockets) return 0;

    sockets.delete(socket);
    if (sockets.size === 0) this._sockets.delete(userId);

    return sockets.size;
  }

  public closeAll(userId: string) {
    const sockets = this._sockets.get(userId);
    if (!sockets) return;

    for (const socket of sockets) {
      socket.close();
      sockets.delete(socket);
      if (sockets.size === 0) this._sockets.delete(userId);
    }
  }

  public send(socket: WebSocket, payload: WebSocketEvent): void {
    if (socket.readyState !== socket.OPEN) return;
    socket.send(JSON.stringify(payload));
  }

  public sendToUsers(participants: string[], payload: WebSocketEvent) {
    for (const participant of participants) {
      const sockets = this._sockets.get(participant);
      if (!sockets) continue;
      for (const socket of sockets) {
        this.send(socket, payload);
      }
    }
  }

  public isOnline(userId: string): boolean {
    return this._sockets.has(userId);
  }
}

export const webSocketRegistry = new WebSocketRegistry();
