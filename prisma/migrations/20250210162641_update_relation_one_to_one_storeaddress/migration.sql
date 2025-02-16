/*
  Warnings:

  - A unique constraint covering the columns `[storeId]` on the table `StoreAddress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "StoreAddress_storeId_key" ON "StoreAddress"("storeId");
