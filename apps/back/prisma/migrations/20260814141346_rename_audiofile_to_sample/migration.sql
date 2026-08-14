ALTER TABLE "AudioFile" RENAME TO "Sample";
ALTER TABLE "Sample" RENAME CONSTRAINT "AudioFile_pkey" TO "Sample_pkey";
ALTER TABLE "Sample" RENAME CONSTRAINT "AudioFile_ownerId_fkey" TO "Sample_ownerId_fkey";

ALTER TABLE "_AudioFileToStudioProject" RENAME TO "_SampleToStudioProject";
ALTER TABLE "_SampleToStudioProject" RENAME CONSTRAINT "_AudioFileToStudioProject_AB_pkey" TO "_SampleToStudioProject_AB_pkey";
ALTER TABLE "_SampleToStudioProject" RENAME CONSTRAINT "_AudioFileToStudioProject_A_fkey" TO "_SampleToStudioProject_A_fkey";
ALTER TABLE "_SampleToStudioProject" RENAME CONSTRAINT "_AudioFileToStudioProject_B_fkey" TO "_SampleToStudioProject_B_fkey";
ALTER INDEX "_AudioFileToStudioProject_B_index" RENAME TO "_SampleToStudioProject_B_index";

UPDATE "Sample" SET "kind" = NULL WHERE "kind" = 'TRACK';
CREATE TYPE "SampleKind" AS ENUM ('ONE_SHOT', 'LOOP');
ALTER TABLE "Sample" ALTER COLUMN "kind" TYPE "SampleKind" USING ("kind"::text::"SampleKind");
DROP TYPE "AudioFileKind";

DROP TYPE "AudioType";
