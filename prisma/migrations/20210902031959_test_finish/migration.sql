/*
  Warnings:

  - You are about to drop the column `test` on the `Notification` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "test",
ALTER COLUMN "notificationType" DROP NOT NULL;
