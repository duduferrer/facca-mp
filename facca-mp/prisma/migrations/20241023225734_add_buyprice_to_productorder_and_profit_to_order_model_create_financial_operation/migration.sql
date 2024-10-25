/*
  Warnings:

  - Added the required column `profit` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buyPrice` to the `ProductOrder` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FaccaOpType" AS ENUM ('INCOME', 'OUTCOME');

-- CreateEnum
CREATE TYPE "UserOpType" AS ENUM ('PAYMENT', 'REFUND');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "profit" DECIMAL(6,2) NOT NULL;

-- AlterTable
ALTER TABLE "ProductOrder" ADD COLUMN     "buyPrice" DECIMAL(6,2) NOT NULL;

-- CreateTable
CREATE TABLE "FACCAOperation" (
    "id" TEXT NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL,
    "type" "FaccaOpType" NOT NULL,
    "value" DECIMAL(6,2) NOT NULL,
    "observation" TEXT,
    "isMP" BOOLEAN NOT NULL,

    CONSTRAINT "FACCAOperation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Absence" (
    "id" TEXT NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL,
    "beginDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "observation" TEXT,
    "userID" TEXT NOT NULL,

    CONSTRAINT "Absence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinancialOperation" (
    "id" TEXT NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL,
    "value" DECIMAL(6,2) NOT NULL,
    "type" "UserOpType" NOT NULL,
    "observation" TEXT,
    "userID" TEXT NOT NULL,

    CONSTRAINT "FinancialOperation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FACCAOperation_id_key" ON "FACCAOperation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Absence_id_key" ON "Absence"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FinancialOperation_id_key" ON "FinancialOperation"("id");

-- AddForeignKey
ALTER TABLE "Absence" ADD CONSTRAINT "Absence_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialOperation" ADD CONSTRAINT "FinancialOperation_userID_fkey" FOREIGN KEY ("userID") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
