/*
  Warnings:

  - You are about to drop the `_HashtagToPlants` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_HashtagToPlants" DROP CONSTRAINT "_HashtagToPlants_A_fkey";

-- DropForeignKey
ALTER TABLE "_HashtagToPlants" DROP CONSTRAINT "_HashtagToPlants_B_fkey";

-- DropTable
DROP TABLE "_HashtagToPlants";
