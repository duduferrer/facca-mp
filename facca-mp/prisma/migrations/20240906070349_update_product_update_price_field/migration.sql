/*
  Warnings:

  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - Added the required column `buyPrice` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellPrice` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "price",
ADD COLUMN     "buyPrice" DECIMAL(6,2) NOT NULL,
ADD COLUMN     "sellPrice" DECIMAL(6,2) NOT NULL;
