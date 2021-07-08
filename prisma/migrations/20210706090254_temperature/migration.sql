/*
  Warnings:

  - You are about to drop the column `temperature` on the `Plants` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Plants" DROP COLUMN "temperature";

-- CreateTable
CREATE TABLE "Temperature" (
    "id" SERIAL NOT NULL,
    "minTemperature" INTEGER NOT NULL,
    "maxTemperature" INTEGER NOT NULL,
    "plantsId" INTEGER,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Temperature" ADD FOREIGN KEY ("plantsId") REFERENCES "Plants"("id") ON DELETE SET NULL ON UPDATE CASCADE;
