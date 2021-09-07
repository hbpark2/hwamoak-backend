/*
  Warnings:

  - A unique constraint covering the columns `[likeId,userId]` on the table `Notification` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "likeId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Notification.likeId_userId_unique" ON "Notification"("likeId", "userId");

-- AddForeignKey
ALTER TABLE "Notification" ADD FOREIGN KEY ("likeId") REFERENCES "Like"("id") ON DELETE SET NULL ON UPDATE CASCADE;
