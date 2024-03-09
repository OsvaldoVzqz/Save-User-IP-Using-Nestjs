/*
  Warnings:

  - You are about to drop the column `user` on the `IPRecord` table. All the data in the column will be lost.
  - Added the required column `userId` to the `IPRecord` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "IPRecord" DROP CONSTRAINT "IPRecord_user_fkey";

-- AlterTable
ALTER TABLE "IPRecord" DROP COLUMN "user",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "IPRecord" ADD CONSTRAINT "IPRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
