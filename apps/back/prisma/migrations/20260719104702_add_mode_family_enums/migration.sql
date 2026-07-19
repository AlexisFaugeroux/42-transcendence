-- CreateEnum
CREATE TYPE "Mode" AS ENUM ('MAJOR', 'MINOR');

-- CreateEnum
CREATE TYPE "Family" AS ENUM ('KICK', 'SNARE', 'CLAP', 'HAT', 'TOM', 'PERC', 'CYMBAL', 'BASS', 'SYNTH', 'LEAD', 'PAD', 'KEYS', 'PLUCK', 'STRINGS', 'BRASS', 'VOCAL', 'FX', 'AMBIENCE');

-- AlterTable
ALTER TABLE "AudioFile" ADD COLUMN     "family" "Family",
ADD COLUMN     "mode" "Mode";

-- AlterTable
ALTER TABLE "StudioProject" ADD COLUMN     "mode" "Mode";
