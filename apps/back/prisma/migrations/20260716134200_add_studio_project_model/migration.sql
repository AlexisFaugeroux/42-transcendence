-- CreateTable
CREATE TABLE "StudioProject" (
    "id" TEXT NOT NULL,
    "state" BYTEA NOT NULL,
    "ownerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "bpm" INTEGER NOT NULL,
    "visibility" "VisibilityType" NOT NULL,
    "key" "Key",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudioProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AudioFileToStudioProject" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AudioFileToStudioProject_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudioProject_id_key" ON "StudioProject"("id");

-- CreateIndex
CREATE INDEX "_AudioFileToStudioProject_B_index" ON "_AudioFileToStudioProject"("B");

-- AddForeignKey
ALTER TABLE "StudioProject" ADD CONSTRAINT "StudioProject_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AudioFileToStudioProject" ADD CONSTRAINT "_AudioFileToStudioProject_A_fkey" FOREIGN KEY ("A") REFERENCES "AudioFile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AudioFileToStudioProject" ADD CONSTRAINT "_AudioFileToStudioProject_B_fkey" FOREIGN KEY ("B") REFERENCES "StudioProject"("id") ON DELETE CASCADE ON UPDATE CASCADE;
