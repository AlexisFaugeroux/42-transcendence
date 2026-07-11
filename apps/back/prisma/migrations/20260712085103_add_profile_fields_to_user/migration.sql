/*
  Warnings:

  - You are about to drop the column `pseudo` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[handle]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[artistName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `artistName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `handle` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_pseudo_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "pseudo",
ADD COLUMN     "artistName" TEXT NOT NULL,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "firstname" TEXT NOT NULL,
ADD COLUMN     "handle" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL,
ADD COLUMN     "links" JSONB,
ADD COLUMN     "location" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_handle_key" ON "User"("handle");

-- CreateIndex
CREATE UNIQUE INDEX "User_artistName_key" ON "User"("artistName");
