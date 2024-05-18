/*
  Warnings:

  - You are about to drop the column `sender_display_name` on the `chats_participant` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "chats_participant" DROP CONSTRAINT "chats_participant_senderId_sender_display_name_fkey";

-- AlterTable
ALTER TABLE "chats_participant" DROP COLUMN "sender_display_name";

-- AddForeignKey
ALTER TABLE "chats_participant" ADD CONSTRAINT "chats_participant_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
