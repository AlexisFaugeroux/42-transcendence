import type { Sample } from "../lib/types";

const BACK_URL = import.meta.env.VITE_API_URL
const query = new URLSearchParams();

export async function getlistAudioFile() : Promise<Sample[]> {
	
	const ownerId = "88005932-4cd8-4bc4-9e0e-b9e4e3b383b4";
	query.set( "ownerId", ownerId);
	query.set( "visibility", "PUBLIC");

	const res = await fetch(`http://${BACK_URL}/api/audio/get?${query.toString()}`);
	if ( !res.ok )
		throw new Error("Failed");
	const data : Sample[] = await res.json() as Sample[];
	
	return data;
}