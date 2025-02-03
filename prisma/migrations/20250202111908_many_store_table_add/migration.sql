-- CreateTable
CREATE TABLE "Store" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "tagline" VARCHAR(70) NOT NULL,
    "logo" VARCHAR(255) NOT NULL,
    "number" VARCHAR(10) NOT NULL,
    "whatsappNumber" VARCHAR(10) NOT NULL,
    "Email" VARCHAR(255) NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "bio" VARCHAR(255) NOT NULL,
    "feedbackLink" VARCHAR(255),
    "upiId" VARCHAR(255),
    "storeOwnerUserId" INTEGER NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoreService" (
    "id" SERIAL NOT NULL,
    "storeId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "index" INTEGER NOT NULL,

    CONSTRAINT "StoreService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "State" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "stateId" INTEGER NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoreAddress" (
    "id" SERIAL NOT NULL,
    "storeId" INTEGER NOT NULL,
    "addressLine" VARCHAR(255) NOT NULL,
    "stateId" INTEGER NOT NULL,
    "cityId" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "googleMapLink" VARCHAR(255) NOT NULL,

    CONSTRAINT "StoreAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialMedia" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "icon" VARCHAR(255) NOT NULL,

    CONSTRAINT "SocialMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoreSocialMedia" (
    "id" SERIAL NOT NULL,
    "SocialMediaId" INTEGER NOT NULL,
    "storeId" INTEGER NOT NULL,
    "link" VARCHAR(255) NOT NULL,
    "index" INTEGER NOT NULL,

    CONSTRAINT "StoreSocialMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StorePhoto" (
    "id" SERIAL NOT NULL,
    "storeId" INTEGER NOT NULL,
    "path" VARCHAR(255) NOT NULL,
    "index" INTEGER NOT NULL,

    CONSTRAINT "StorePhoto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Store_slug_key" ON "Store"("slug");

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_storeOwnerUserId_fkey" FOREIGN KEY ("storeOwnerUserId") REFERENCES "StoreOwnerUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreService" ADD CONSTRAINT "StoreService_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreService" ADD CONSTRAINT "StoreService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreAddress" ADD CONSTRAINT "StoreAddress_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreAddress" ADD CONSTRAINT "StoreAddress_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreAddress" ADD CONSTRAINT "StoreAddress_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreSocialMedia" ADD CONSTRAINT "StoreSocialMedia_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreSocialMedia" ADD CONSTRAINT "StoreSocialMedia_SocialMediaId_fkey" FOREIGN KEY ("SocialMediaId") REFERENCES "SocialMedia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StorePhoto" ADD CONSTRAINT "StorePhoto_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;
