-- CreateTable
CREATE TABLE "UpiId" (
    "id" SERIAL NOT NULL,
    "upiId" VARCHAR(255) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UpiId_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "upiId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UpiId_upiId_key" ON "UpiId"("upiId");

-- AddForeignKey
ALTER TABLE "UpiId" ADD CONSTRAINT "UpiId_userId_fkey" FOREIGN KEY ("userId") REFERENCES "StoreOwnerUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_upiId_fkey" FOREIGN KEY ("upiId") REFERENCES "UpiId"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
