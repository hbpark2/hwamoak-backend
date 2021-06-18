-- AlterTable
ALTER TABLE "Plants" ADD COLUMN     "userDataId" INTEGER;

-- CreateTable
CREATE TABLE "UserData" (
    "id" SERIAL NOT NULL,
    "space" TEXT,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserData" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plants" ADD FOREIGN KEY ("userDataId") REFERENCES "UserData"("id") ON DELETE SET NULL ON UPDATE CASCADE;
