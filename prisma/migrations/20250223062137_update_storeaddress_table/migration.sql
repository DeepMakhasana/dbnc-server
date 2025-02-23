/*
  Warnings:

  - You are about to drop the column `addressLine` on the `StoreAddress` table. All the data in the column will be lost.
  - Added the required column `addressLine1` to the `StoreAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressLine2` to the `StoreAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StoreAddress" DROP COLUMN "addressLine",
ADD COLUMN     "addressLine1" VARCHAR(255) NOT NULL,
ADD COLUMN     "addressLine2" VARCHAR(255) NOT NULL;
