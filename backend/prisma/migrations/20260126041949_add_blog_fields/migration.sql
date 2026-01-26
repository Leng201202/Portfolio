-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN     "author" TEXT,
ADD COLUMN     "category" TEXT,
ADD COLUMN     "date" TEXT,
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "readTime" TEXT,
ADD COLUMN     "tags" TEXT[];
