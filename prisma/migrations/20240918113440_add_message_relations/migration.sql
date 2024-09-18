-- Step 1: Add columns with default values
ALTER TABLE "Message"
ADD COLUMN "recipientId" TEXT DEFAULT '00000000-0000-0000-0000-000000000000',
ADD COLUMN "senderId" TEXT DEFAULT '00000000-0000-0000-0000-000000000000';

-- Step 2: Update the existing data to have valid UUIDs (if applicable)
-- You should write a script or SQL commands to set valid values for existing records.
-- For example:
-- UPDATE "Message" SET "recipientId" = 'some-valid-uuid', "senderId" = 'some-valid-uuid' WHERE "recipientId" = '00000000-0000-0000-0000-000000000000' OR "senderId" = '00000000-0000-0000-0000-000000000000';

-- Step 3: Drop the old column and constraints
ALTER TABLE "Message"
DROP CONSTRAINT IF EXISTS "Message_userId_fkey",
DROP COLUMN IF EXISTS "userId";

-- Step 4: Alter columns to set them as NOT NULL
ALTER TABLE "Message"
ALTER COLUMN "recipientId" SET NOT NULL,
ALTER COLUMN "senderId" SET NOT NULL;

-- Step 5: Add new foreign key constraints
ALTER TABLE "Message"
ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
ADD CONSTRAINT "Message_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
