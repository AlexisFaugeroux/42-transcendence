import type { WebSocket } from '@fastify/websocket';
import type { FastifyRequest } from 'fastify';
import { userRepository } from '../repositories/user';
import { Message } from '../domain/chat';
import { chatRepository } from '../repositories/chat';

class WebsocketController {
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

  public ws = async (socket: WebSocket, req: FastifyRequest) => {
    const userId = req.authUser.id;

    let userSockets = this._sockets.get(userId);
    if (!userSockets) {
      userSockets = new Set<WebSocket>();
      this._sockets.set(userId, userSockets);
    }

    userSockets.add(socket);
    this._alive.set(socket, true);

    socket.on('close', () => {
      const socketSet = this._sockets.get(userId);
      if (!socketSet) return;
      this._disconnect(socketSet, socket, userId).catch((error: unknown) => {
        req.log.error(error);
      });
    });

    socket.on('pong', () => {
      this._alive.set(socket, true);
    });

    const nbUserSocket = userSockets.size;

    // recuperation des following par l'appelant
    const followingOnlineAtConnection = await this._getFollowingAtConnection(userId);
    if (!userSockets.has(socket)) return;
    socket.send(
      JSON.stringify({
        data: followingOnlineAtConnection,
        event: 'OnlineFollowingAtConnection',
      }),
    );

    if (nbUserSocket > 1) {
      return;
    }

    await this._broadcastToFollowers(userId, 'FollowingConnected');
  };

  public sendMessage = async ( message : Message ) => {
    const participants = await chatRepository.listConversationParticipants( message.conversationId );
    for ( const participant of participants ) {
      if (participant.userId != message.participantId )
      {
        const payload = JSON.stringify({
          data: message,
          event: "message"
        });
        const socketSet = this._sockets.get( participant.userId );
        if (!socketSet)
          continue ;
        for ( const socket of socketSet )
          socket.send( payload );
      }
    }
  }

  private _broadcastToFollowers = async (userId: string, event: string) => {
    const followers = await userRepository.listFollowerIdsByUserId(userId);
    const payload = JSON.stringify({
      data: [userId],
      event,
    });
    for (const follower of followers) {
      for (const socket of this._sockets.get(follower) ?? []) {
        socket.send(payload);
      }
    }
  };

  private _getFollowingAtConnection = async (userId: string) => {
    const followingConnected: string[] = [];

    const following = await userRepository.listFollowingIdsByUserId(userId);
    for (const followId of following) {
      if (this._sockets.has(followId)) followingConnected.push(followId);
    }
    return followingConnected;
  };

  private _disconnect = async (socketSet: Set<WebSocket>, socket: WebSocket, userId: string) => {
    socketSet.delete(socket);
    if (socketSet.size === 0) {
      this._sockets.delete(userId);
      await this._broadcastToFollowers(userId, 'FollowingDisconnected');
    }
  };
}

export const websocketController = new WebsocketController();
