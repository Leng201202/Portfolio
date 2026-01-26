/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Skills` table. All the data in the column will be lost.
  - Added the required column `category` to the `Skills` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Skills" DROP CONSTRAINT "Skills_categoryId_fkey";

-- AlterTable
ALTER TABLE "Skills" DROP COLUMN "categoryId",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "icon" TEXT,
ADD COLUMN     "level" TEXT;
