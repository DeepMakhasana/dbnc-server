/*
  Warnings:

  - You are about to drop the column `Email` on the `Store` table. All the data in the column will be lost.
  - Added the required column `email` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pincode` to the `StoreAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Store" DROP COLUMN "Email",
ADD COLUMN     "email" VARCHAR(255) NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "StoreAddress" ADD COLUMN     "pincode" INTEGER NOT NULL;
