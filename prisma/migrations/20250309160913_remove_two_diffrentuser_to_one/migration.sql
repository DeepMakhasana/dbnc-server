/*
  Warnings:

  - You are about to drop the `OwnerVerifiedEmail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VisitorUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VisitorVerifiedEmail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SaveStore" DROP CONSTRAINT "SaveStore_userId_fkey";

-- AlterTable
ALTER TABLE "Store" ALTER COLUMN "tagline" DROP NOT NULL;

-- DropTable
DROP TABLE "OwnerVerifiedEmail";

-- DropTable
DROP TABLE "VisitorUser";

-- DropTable
DROP TABLE "VisitorVerifiedEmail";

-- CreateTable
CREATE TABLE "UserVerifiedEmail" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserVerifiedEmail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserVerifiedEmail_email_key" ON "UserVerifiedEmail"("email");

-- AddForeignKey
ALTER TABLE "SaveStore" ADD CONSTRAINT "SaveStore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "StoreOwnerUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
