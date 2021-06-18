/*
  Warnings:

  - You are about to drop the `PlantsDetail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Plants" DROP CONSTRAINT "Plants_plantsDetailId_fkey";

-- AlterTable
ALTER TABLE "Plants" ADD COLUMN     "sunlight" INTEGER,
ADD COLUMN     "temperature" TEXT,
ADD COLUMN     "water" TEXT;

-- DropTable
DROP TABLE "PlantsDetail";
