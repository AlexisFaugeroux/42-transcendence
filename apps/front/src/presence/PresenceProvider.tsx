import { useContext, type ReactNode } from "react";
import type { JSX } from "react";
import { useEffect } from "react";
import type { OnlineUser } from "../pages/Home/home.data";
import { createContext } from "react";
import { useState } from "react";
import { useSocket } from "../websocket/WebSocketProvider";
import { useFollowing } from "../hooks/useFollowing";

interface PresenceData {
		count : number;
		onlineUsers : OnlineUser[] | null;
}

const presenceContext = createContext<PresenceData | null>(null);

export function PresenceProvider({ children }: { children: ReactNode }): JSX.Element {

	const { subscribe } = useSocket();
	const { following, isLoading } = useFollowing();
	const [followingConnected, setFollowingConnected] = useState<Set<string>>( new Set<string>());

	const handler = ( message : { event : string; data : string[]} ) => {
		if (message.event == 'OnlineFollowingAtConnection') {
			const usersAlreadyConnected = message.data;
			setFollowingConnected( () => {
				const list = new Set<string>();
				usersAlreadyConnected.forEach( (user) => list.add(user) );
				return ( list );
			})
		}
		else if (message.event == 'FollowingConnected') {
			const userConnectedId = message.data[0];
			setFollowingConnected( (current) => {
				const list = new Set<string>(current);
				list.add( userConnectedId );
				return ( list );
			});
		}
		else if (message.event == 'FollowingDisconnected') {
			const userDisconnectedId = message.data[0];
			setFollowingConnected( (current) => {
				const list = new Set<string>(current);
				list.delete( userDisconnectedId );
				return ( list );
			});
		}
	}

	useEffect( () => { 
		return subscribe( handler );
	},[subscribe, isLoading]);

	if ( !following || isLoading ) {
		return (
			<presenceContext.Provider value={{ count : 0, onlineUsers : [] }}>
				{children}
			</presenceContext.Provider>   
		)
 };

	const onlineFollowing = following.reduce((acc : OnlineUser[], curr) => {
		followingConnected.forEach( ( connected ) => { 
			if ( curr.id == connected )  
				acc.push( curr );
	})
		return acc;
	}, []);

	return ( 
		<presenceContext.Provider value={{ count : onlineFollowing.length, onlineUsers : onlineFollowing }}>
				{children}
		</presenceContext.Provider> 
	);
}

export function usePresence() {
		const ctx = useContext( presenceContext );
		return ctx;
}