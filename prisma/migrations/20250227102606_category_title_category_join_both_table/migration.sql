-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "categoryTitleId" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "icon" VARCHAR(255) NOT NULL DEFAULT 'none';

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_categoryTitleId_fkey" FOREIGN KEY ("categoryTitleId") REFERENCES "CategoryTitle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
