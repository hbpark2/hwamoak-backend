/*
  Warnings:

  - You are about to drop the column `senderId` on the `Notification` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "senderId",
ADD COLUMN     "sendUserId" INTEGER;

-- AddForeignKey
ALTER TABLE "Notification" ADD FOREIGN KEY ("sendUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
