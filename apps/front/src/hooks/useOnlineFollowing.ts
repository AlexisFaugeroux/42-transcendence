import { useQuery } from '@tanstack/react-query';
import { getOnlineFollowing } from '../api/onlineFollowing';
import { useSocket } from '../websocket/WebSocketProvider';

export function useOnlineFollowing() {
  const ws = useSocket();
  const { data } = useQuery({
    queryFn: () => getOnlineFollowing(ws.followingConnected),
    queryKey: ['onlineFollowing', ws.followingConnected],
  });
  return { count: ws.followingConnected.length, data: data ?? null };
}
