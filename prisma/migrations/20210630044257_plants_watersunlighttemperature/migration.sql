/*
  Warnings:

  - The `temperature` column on the `Plants` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `water` column on the `Plants` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Plants" DROP COLUMN "temperature",
ADD COLUMN     "temperature" INTEGER,
DROP COLUMN "water",
ADD COLUMN     "water" INTEGER;
