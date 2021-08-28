/*
  Warnings:

  - You are about to drop the column `fails` on the `Provider` table. All the data in the column will be lost.
  - You are about to drop the column `success` on the `Provider` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Provider" DROP COLUMN "fails",
DROP COLUMN "success",
ADD COLUMN     "score" INTEGER NOT NULL DEFAULT 0;
