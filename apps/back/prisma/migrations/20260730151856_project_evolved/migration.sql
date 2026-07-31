-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('MIX', 'PRODUCE', 'RECORD');

-- AlterTable
ALTER TABLE "StudioProject" ADD COLUMN     "archived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "type" "ProjectType" NOT NULL DEFAULT 'MIX';
