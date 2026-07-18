/*
  Warnings:

  - You are about to drop the column `length` on the `AudioFile` table. All the data in the column will be lost.
  - Added the required column `duration` to the `AudioFile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AudioFile" DROP COLUMN "length",
ADD COLUMN     "duration" DOUBLE PRECISION NOT NULL;
