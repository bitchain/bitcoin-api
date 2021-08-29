/*
  Warnings:

  - You are about to drop the column `implementation` on the `Provider` table. All the data in the column will be lost.
  - You are about to drop the column `interface` on the `Provider` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[instance]` on the table `Provider` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `injectionToken` to the `Provider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instance` to the `Provider` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Provider.implementation_unique";

-- AlterTable
ALTER TABLE "Provider" DROP COLUMN "implementation",
DROP COLUMN "interface",
ADD COLUMN     "injectionToken" TEXT NOT NULL,
ADD COLUMN     "instance" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Provider.instance_unique" ON "Provider"("instance");
