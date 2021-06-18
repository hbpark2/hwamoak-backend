/*
  Warnings:

  - You are about to drop the column `plantsId` on the `Like` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_plantsId_fkey";

-- DropIndex
DROP INDEX "Like.plantsId_userId_unique";

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "plantsId";

-- CreateTable
CREATE TABLE "PlantLike" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "plantsId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlantLike.plantsId_userId_unique" ON "PlantLike"("plantsId", "userId");

-- AddForeignKey
ALTER TABLE "PlantLike" ADD FOREIGN KEY ("plantsId") REFERENCES "Plants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlantLike" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
