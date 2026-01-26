-- AlterTable
ALTER TABLE "AboutMe" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "github" TEXT,
ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "title" TEXT,
ADD COLUMN     "twitter" TEXT,
ALTER COLUMN "content" DROP NOT NULL;
