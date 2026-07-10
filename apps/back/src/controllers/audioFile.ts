import { FastifyReply, FastifyRequest, RouteGenericInterface } from "fastify";
import type { GetAudioFileInput } from "../domain/audioFile";
import { audioFileRepository } from "../repositories/audioFile";
import type { Visibility, Key } from "../domain/audioFile";

interface GetOption extends RouteGenericInterface {
    Querystring : {
        ownerId : string[],
        id: string[],
        bpm: number[],
        key: Key[],
        visibility : Visibility[]
    }
}

export class AudioFileController {

    public get = async ( req : FastifyRequest<GetOption>, reply : FastifyReply ) => {
        const { ownerId, id, bpm, key, visibility } = req.query; 
        const data : GetAudioFileInput = {
            ownerIds : ownerId,
            ids : id,
            bpms : bpm,
            keys : key,
            visibilities : visibility 
        }
        const audio = await audioFileRepository.get( data );
        console.log( audio );
        reply.code(200).send( audio );
    }
}

export const audioFileController = new AudioFileController(); 