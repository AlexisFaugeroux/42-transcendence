import { Sample } from "@opendaw/studio-adapters";
import { useProject } from "../contexts/ProjectContext";

const BASE_URL = import.meta.env.VITE_API_URL;

export async function saveProject( blob: ArrayBufferLike, samples : string ) {

    const res = await fetch(
        `${BASE_URL}/api/save`, {
        body : JSON.stringify({
            blob : blob,
            sample : samples,
        }),
        method: 'POST',
        credentials: "include",
    });
    if ( !res.ok ) throw new Error("/api/save failed");
}