-- CreateEnum
CREATE TYPE "AudioFileKind" AS ENUM ('ONE_SHOT', 'LOOP', 'TRACK');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Key" ADD VALUE 'A_sharp_key';
ALTER TYPE "Key" ADD VALUE 'B_flat_key';
ALTER TYPE "Key" ADD VALUE 'C_sharp_key';
ALTER TYPE "Key" ADD VALUE 'D_flat_key';
ALTER TYPE "Key" ADD VALUE 'D_sharp_key';
ALTER TYPE "Key" ADD VALUE 'E_flat_key';
ALTER TYPE "Key" ADD VALUE 'F_sharp_key';
ALTER TYPE "Key" ADD VALUE 'G_flat_key';
ALTER TYPE "Key" ADD VALUE 'G_sharp_key';
ALTER TYPE "Key" ADD VALUE 'A_flat_key';

-- AlterTable
ALTER TABLE "AudioFile" ADD COLUMN     "kind" "AudioFileKind";
