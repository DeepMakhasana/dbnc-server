/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "CategoryTitle" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "index" INTEGER NOT NULL,

    CONSTRAINT "CategoryTitle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CategoryTitle_title_key" ON "CategoryTitle"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");
