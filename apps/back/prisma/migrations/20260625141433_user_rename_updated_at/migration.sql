/*
  Warnings:

  - You are about to drop the column `uptdatedAt` on the `AudioFile` table. All the data in the column will be lost.
  - You are about to drop the column `uptdatedAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `AudioFile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AudioFile" DROP COLUMN "uptdatedAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "uptdatedAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
