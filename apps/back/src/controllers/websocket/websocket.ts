import type { WebSocket } from '@fastify/websocket';
import type { FastifyRequest } from 'fastify';
import { userRepository } from '../../repositories/user/user';
import { type PresenceEvent, webSocketRegistry } from '../../utils/websockets';

class WebsocketController {
  public ws = async (socket: WebSocket, req: FastifyRequest) => {
    const userId = req.authUser.id;

    socket.on('close', () => {
      if (webSocketRegistry.remove(userId, socket) > 0) return;
      this._broadcastToFollowers(userId, 'followingDisconnected', socket).catch(
        (error: unknown) => {
          req.log.error(error);
        },
      );
    });

    const openSockets = webSocketRegistry.add(userId, socket);

    const { items: following } = await userRepository.listFollowing({ id: userId });
    const followingOnline = following.filter((f) => webSocketRegistry.isOnline(f.id));
    const followingOnlineIds = followingOnline.map((producer) => producer.id);

    webSocketRegistry.send(socket, {
      event: 'onlineFollowingAtConnection',
      data: followingOnlineIds,
    });

    if (openSockets > 1) return;

    await this._broadcastToFollowers(userId, 'followingConnected', socket);
  };

  private _broadcastToFollowers = async (
    userId: string,
    event: PresenceEvent['event'],
    socket: WebSocket,
  ) => {
    const { items: followers } = await userRepository.listFollowers({ id: userId });
    const followersIds = followers.map((follower) => follower.id);

    if (socket.readyState !== socket.OPEN) return;
    webSocketRegistry.sendToUsers(followersIds, { event, data: [userId] });
  };
}

export const websocketController = new WebsocketController();
