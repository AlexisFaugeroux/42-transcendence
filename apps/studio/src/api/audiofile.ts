import type { Sample } from "../lib/types";

const BACK_URL = import.meta.env.VITE_API_URL
const query = new URLSearchParams();

export async function getlistAudioFile() : Promise<Sample[]> {
	
	const ownerId = "c62c3a83-ca31-4e59-8e04-dc705ff5c6d2";
	const plateformId = "d4097d02-92bb-4249-b268-92c54b1f5958";
	query.set( "ownerId", ownerId);
	query.set("ownerId", plateformId);
	query.set( "visibility", "PUBLIC");

	const res = await fetch(`http://${BACK_URL}/api/audio/get?${query.toString()}`);
	if ( !res.ok )
		throw new Error("Failed");
	const data : Sample[] = await res.json() as Sample[];
	
	return data;
}