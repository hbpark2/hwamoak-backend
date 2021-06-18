/*
  Warnings:

  - You are about to drop the column `Temperature` on the `PlantsDetail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PlantsDetail" DROP COLUMN "Temperature",
ADD COLUMN     "temperature" TEXT;
