-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "plantsId" INTEGER;

-- AlterTable
ALTER TABLE "Hashtag" ADD COLUMN     "plantsId" INTEGER;

-- AlterTable
ALTER TABLE "Like" ADD COLUMN     "plantsId" INTEGER;

-- CreateTable
CREATE TABLE "Plants" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "file" TEXT NOT NULL,
    "caption" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Plants" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("plantsId") REFERENCES "Plants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hashtag" ADD FOREIGN KEY ("plantsId") REFERENCES "Plants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD FOREIGN KEY ("plantsId") REFERENCES "Plants"("id") ON DELETE SET NULL ON UPDATE CASCADE;
