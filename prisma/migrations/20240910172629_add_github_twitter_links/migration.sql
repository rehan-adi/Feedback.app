/*
  Warnings:

  - You are about to drop the column `deviceId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "deviceId",
ADD COLUMN     "githubLink" TEXT,
ADD COLUMN     "twitterLink" TEXT;
