-- CreateTable
CREATE TABLE "VisitorUser" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(70),
    "email" VARCHAR(255) NOT NULL,
    "number" VARCHAR(10),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VisitorUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoreOwnerUser" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(70) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "number" VARCHAR(10) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StoreOwnerUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Otp" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "otp" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Otp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VisitorUser_email_key" ON "VisitorUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VisitorUser_number_key" ON "VisitorUser"("number");

-- CreateIndex
CREATE UNIQUE INDEX "StoreOwnerUser_email_key" ON "StoreOwnerUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "StoreOwnerUser_number_key" ON "StoreOwnerUser"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Otp_email_key" ON "Otp"("email");
