/*
  Warnings:

  - Changed the type of `userId` on the `IPRecord` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "IPRecord" DROP CONSTRAINT "IPRecord_userId_fkey";

-- AlterTable
ALTER TABLE "IPRecord" DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "IPRecord" ADD CONSTRAINT "IPRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
