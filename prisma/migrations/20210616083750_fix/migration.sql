/*
  Warnings:

  - You are about to drop the column `plantsId` on the `Hashtag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Hashtag" DROP CONSTRAINT "Hashtag_plantsId_fkey";

-- AlterTable
ALTER TABLE "Hashtag" DROP COLUMN "plantsId";
