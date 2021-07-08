/*
  Warnings:

  - You are about to drop the `Temperature` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Temperature" DROP CONSTRAINT "Temperature_plantsId_fkey";

-- DropTable
DROP TABLE "Temperature";
