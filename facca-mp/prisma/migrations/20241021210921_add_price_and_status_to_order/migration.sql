/*
  Warnings:

  - You are about to drop the column `imageURL` on the `Category` table. All the data in the column will be lost.
  - Added the required column `totalPrice` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PAID');

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "imageURL";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "totalPrice" DECIMAL(6,2) NOT NULL;
