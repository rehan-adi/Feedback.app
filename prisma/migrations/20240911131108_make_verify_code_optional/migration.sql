-- AlterTable
ALTER TABLE "User" ALTER COLUMN "verifyCodeExpiry" DROP NOT NULL,
ALTER COLUMN "verifyCode" DROP NOT NULL;
