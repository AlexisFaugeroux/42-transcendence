
import { useSocket } from "../websocket/WebSocketProvider";
import { useQuery } from "@tanstack/react-query";
import { getOnlineFollowing } from "../api/onlineFollowing";

export function useOnlineFollowing() {

    const ws = useSocket();
    const { data } = useQuery({
        queryKey: [ "onlineFollowing", ws.followingConnected ],
        queryFn: () => getOnlineFollowing( ws.followingConnected ),
    })
    return { data : data ?? null, count : ws.followingConnected.length };
}