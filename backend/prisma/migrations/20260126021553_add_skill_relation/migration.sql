/*
  Warnings:

  - You are about to drop the column `category` on the `Skills` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Skills` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Skills" DROP COLUMN "category",
ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Skills" ADD CONSTRAINT "Skills_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "SkillCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
