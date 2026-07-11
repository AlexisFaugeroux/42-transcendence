import type { Sample } from "../lib/types";
import { useUser } from "@auth/src/AuthContext";
import type { AuthUser } from "@auth/src/types";

const BACK_URL = import.meta.env.VITE_API_URL
const query = new URLSearchParams();

export async function getlistAudioFile() : Promise<Sample[]> {

	const { user } = useUser();
	query.set("userId", user.id);
	query.set( "visibility", "PUBLIC");

	const res = await fetch(`http://${BACK_URL}/api/audio/get?${query.toString()}`);
	if ( !res.ok )
		throw new Error("Failed");
	const data : Sample[] = await res.json() as Sample[];
	
	return data;
}