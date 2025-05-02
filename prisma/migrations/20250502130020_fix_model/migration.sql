/*
  Warnings:

  - You are about to drop the column `isPaused` on the `histories` table. All the data in the column will be lost.
  - You are about to drop the column `isRunning` on the `histories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "histories" DROP COLUMN "isPaused",
DROP COLUMN "isRunning";
