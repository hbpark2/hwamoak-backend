/*
  Warnings:

  - A unique constraint covering the columns `[photoId,userId]` on the table `Notification` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Notification.photoId_userId_unique" ON "Notification"("photoId", "userId");
