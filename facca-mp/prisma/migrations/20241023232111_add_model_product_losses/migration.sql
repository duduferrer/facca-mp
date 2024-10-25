-- CreateTable
CREATE TABLE "ProductLosses" (
    "id" TEXT NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL,
    "quantity" SMALLINT NOT NULL,
    "productID" TEXT NOT NULL,

    CONSTRAINT "ProductLosses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductLosses_id_key" ON "ProductLosses"("id");

-- AddForeignKey
ALTER TABLE "ProductLosses" ADD CONSTRAINT "ProductLosses_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
