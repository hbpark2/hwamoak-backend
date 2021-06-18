/*
  Warnings:

  - A unique constraint covering the columns `[plantsId,userId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Like.plantsId_userId_unique" ON "Like"("plantsId", "userId");
