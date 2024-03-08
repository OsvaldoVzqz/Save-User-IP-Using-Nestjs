/*
  Warnings:

  - You are about to drop the column `userId` on the `IPRecord` table. All the data in the column will be lost.
  - Added the required column `user` to the `IPRecord` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "IPRecord" DROP CONSTRAINT "IPRecord_userId_fkey";

-- AlterTable
ALTER TABLE "IPRecord" DROP COLUMN "userId",
ADD COLUMN     "user" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "IPRecord" ADD CONSTRAINT "IPRecord_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
