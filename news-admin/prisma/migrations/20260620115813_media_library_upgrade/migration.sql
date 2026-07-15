-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "category" TEXT;

-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "category" TEXT,
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "type" TEXT;
