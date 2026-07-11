import { FastifyReply, FastifyRequest, RouteGenericInterface } from "fastify";
import type { GetAudioFileInput } from "../domain/audioFile";
import { audioFileRepository } from "../repositories/audioFile";
import type { Visibility, Key } from "../domain/audioFile";
import { ownerRepositoty } from "../repositories/plateformOwner";

interface GetAudioFilesRoute extends RouteGenericInterface {
    Querystring : {
        ownerIds : string[],
        ids: string[],
        bpms: number[],
        keys: Key[],
        visibilities : Visibility[]
    }
}

class AudioFileController {

    public get = async ( req : FastifyRequest<GetAudioFilesRoute>, reply : FastifyReply ) => {
        const platformID = (await ownerRepositoty.platformID()).id
        req.query.ownerIds.push( platformID );
        const audio = await audioFileRepository.get( req.query );
        reply.code(200).send( audio );
    }
}

export const audioFileController = new AudioFileController(); 