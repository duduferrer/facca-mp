/*
  Warnings:

  - Added the required column `discount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finalPrice` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productsSum` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "discount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "finalPrice" DECIMAL(6,2) NOT NULL,
ADD COLUMN     "productsSum" DECIMAL(6,2) NOT NULL;
