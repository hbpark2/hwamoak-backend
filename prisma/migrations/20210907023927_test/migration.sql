/*
  Warnings:

  - A unique constraint covering the columns `[photoId,userId]` on the table `Notification` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Notification.photoId_userId_index";

-- CreateIndex
CREATE UNIQUE INDEX "Notification.photoId_userId_unique" ON "Notification"("photoId", "userId");
