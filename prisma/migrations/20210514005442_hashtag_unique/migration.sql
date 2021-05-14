/*
  Warnings:

  - A unique constraint covering the columns `[hashtag]` on the table `Hastag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Hastag.hashtag_unique" ON "Hastag"("hashtag");
