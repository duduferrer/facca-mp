/*
  Warnings:

  - Added the required column `transactionBy` to the `FACCAOperation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionBy` to the `FinancialOperation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FACCAOperation" ADD COLUMN     "transactionBy" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "FinancialOperation" ADD COLUMN     "transactionBy" TEXT NOT NULL;
