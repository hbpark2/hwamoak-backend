-- DropIndex
DROP INDEX "Notification.photoId_userId_unique";

-- CreateIndex
CREATE INDEX "Notification.photoId_userId_index" ON "Notification"("photoId", "userId");
