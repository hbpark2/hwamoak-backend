/*
  Warnings:

  - You are about to drop the column `file` on the `Plants` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Plants" DROP COLUMN "file";

-- CreateTable
CREATE TABLE "PlantsImage" (
    "id" SERIAL NOT NULL,
    "file" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "plantsId" INTEGER,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PlantsImage" ADD FOREIGN KEY ("plantsId") REFERENCES "Plants"("id") ON DELETE SET NULL ON UPDATE CASCADE;
