import { prisma } from "../utils/prisma";
import type { OwnerType } from "../generated/prisma/enums";

class OwnerRepository {

    public platformID = async ( ) => {
        const type : OwnerType = "PLATEFORM"
        return ( await prisma.owner.findFirstOrThrow({
            where : {type}
        }));
    }
}

export const ownerRepositoty = new OwnerRepository();
