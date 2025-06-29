/*
  Warnings:

  - You are about to drop the column `isDelete` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "isDelete";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "isDelete" BOOLEAN NOT NULL DEFAULT false;
