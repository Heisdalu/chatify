/*
  Warnings:

  - You are about to drop the column `receiverImageUrl` on the `chats_participant` table. All the data in the column will be lost.
  - Added the required column `receiver_display_name` to the `chats_participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiver_image_url` to the `chats_participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sender_display_name` to the `chats_participant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "chats_participant" DROP CONSTRAINT "chats_participant_senderId_fkey";

-- AlterTable
ALTER TABLE "chats_participant" DROP COLUMN "receiverImageUrl",
ADD COLUMN     "receiver_display_name" TEXT NOT NULL,
ADD COLUMN     "receiver_image_url" TEXT NOT NULL,
ADD COLUMN     "sender_display_name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "chats_participant" ADD CONSTRAINT "chats_participant_senderId_sender_display_name_fkey" FOREIGN KEY ("senderId", "sender_display_name") REFERENCES "users"("email", "displayName") ON DELETE RESTRICT ON UPDATE CASCADE;
