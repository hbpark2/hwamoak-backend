/*
  Warnings:

  - A unique constraint covering the columns `[photoId,likeId]` on the table `Notification` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Notification_commentId_unique";

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "likeId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Notification.photoId_likeId_unique" ON "Notification"("photoId", "likeId");

-- AddForeignKey
ALTER TABLE "Notification" ADD FOREIGN KEY ("likeId") REFERENCES "Like"("id") ON DELETE SET NULL ON UPDATE CASCADE;
