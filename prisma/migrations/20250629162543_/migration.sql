-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "isArchive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isDelete" BOOLEAN NOT NULL DEFAULT false;
