-- CreateTable
CREATE TABLE "SaveStore" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "storeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SaveStore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SaveStore_userId_storeId_key" ON "SaveStore"("userId", "storeId");

-- AddForeignKey
ALTER TABLE "SaveStore" ADD CONSTRAINT "SaveStore_userId_fkey" FOREIGN KEY ("userId") REFERENCES "VisitorUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaveStore" ADD CONSTRAINT "SaveStore_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;
