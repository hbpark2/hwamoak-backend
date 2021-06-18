/*
  Warnings:

  - Added the required column `plantsDetailId` to the `Plants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plants" ADD COLUMN     "plantsDetailId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "PlantsDetail" (
    "id" SERIAL NOT NULL,
    "sunlight" INTEGER,
    "Temperature" TEXT,
    "water" TEXT,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Plants" ADD FOREIGN KEY ("plantsDetailId") REFERENCES "PlantsDetail"("id") ON DELETE CASCADE ON UPDATE CASCADE;
