/*
  Warnings:

  - You are about to drop the column `likeId` on the `Notification` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[photoId,commentId]` on the table `Notification` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[commentId]` on the table `Notification` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_likeId_fkey";

-- DropIndex
DROP INDEX "Notification.likeId_userId_unique";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "likeId",
ADD COLUMN     "commentId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Notification.photoId_commentId_unique" ON "Notification"("photoId", "commentId");

-- CreateIndex
CREATE UNIQUE INDEX "Notification_commentId_unique" ON "Notification"("commentId");

-- AddForeignKey
ALTER TABLE "Notification" ADD FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
