/*
  Warnings:

  - You are about to drop the `VerifiedEmail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "VerifiedEmail";

-- CreateTable
CREATE TABLE "OwnerVerifiedEmail" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OwnerVerifiedEmail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisitorVerifiedEmail" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VisitorVerifiedEmail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OwnerVerifiedEmail_email_key" ON "OwnerVerifiedEmail"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VisitorVerifiedEmail_email_key" ON "VisitorVerifiedEmail"("email");
