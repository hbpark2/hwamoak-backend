-- CreateTable
CREATE TABLE "_HashtagToPlants" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_HashtagToPlants_AB_unique" ON "_HashtagToPlants"("A", "B");

-- CreateIndex
CREATE INDEX "_HashtagToPlants_B_index" ON "_HashtagToPlants"("B");

-- AddForeignKey
ALTER TABLE "_HashtagToPlants" ADD FOREIGN KEY ("A") REFERENCES "Hashtag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HashtagToPlants" ADD FOREIGN KEY ("B") REFERENCES "Plants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
