/*
  Warnings:

  - You are about to drop the column `userId` on the `histories` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "histories" DROP CONSTRAINT "histories_userId_fkey";

-- AlterTable
ALTER TABLE "histories" DROP COLUMN "userId";
