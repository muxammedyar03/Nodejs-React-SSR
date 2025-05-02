/*
  Warnings:

  - You are about to drop the column `endTime` on the `History` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `History` table. All the data in the column will be lost.
  - Added the required column `closedAt` to the `History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startedAt` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "History" DROP COLUMN "endTime",
DROP COLUMN "startTime",
ADD COLUMN     "closedAt" TEXT NOT NULL,
ADD COLUMN     "startedAt" TEXT NOT NULL;
