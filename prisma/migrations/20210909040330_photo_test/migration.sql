/*
  Warnings:

  - You are about to drop the column `file` on the `Photo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "file";

-- CreateTable
CREATE TABLE "PhotoImage" (
    "id" SERIAL NOT NULL,
    "file" TEXT NOT NULL,
    "photoId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PhotoImage" ADD FOREIGN KEY ("photoId") REFERENCES "Photo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
