-- CreateEnum
CREATE TYPE "Type" AS ENUM ('NONE', 'TEXT', 'PHOTO', 'AUDIO');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "bio" TEXT NOT NULL DEFAULT '',
    "profileImageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chats_participant" (
    "id" SERIAL NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "receiverImageUrl" TEXT NOT NULL,

    CONSTRAINT "chats_participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message" (
    "id" SERIAL NOT NULL,
    "message_senderId" TEXT NOT NULL,
    "message_receiverId" TEXT NOT NULL,
    "message_type" "Type" NOT NULL DEFAULT 'NONE',
    "message_context" TEXT NOT NULL,
    "parent_messageType" "Type" NOT NULL DEFAULT 'NONE',
    "audio_duration" TEXT,
    "parent_messageId" TEXT,
    "parent_messageContext" TEXT,
    "sent_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isSeen" BOOLEAN NOT NULL DEFAULT false,
    "seenAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ChatsparticipantToMessage" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_displayName_key" ON "users"("displayName");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_displayName_key" ON "users"("email", "displayName");

-- CreateIndex
CREATE UNIQUE INDEX "chats_participant_senderId_receiverId_key" ON "chats_participant"("senderId", "receiverId");

-- CreateIndex
CREATE UNIQUE INDEX "_ChatsparticipantToMessage_AB_unique" ON "_ChatsparticipantToMessage"("A", "B");

-- CreateIndex
CREATE INDEX "_ChatsparticipantToMessage_B_index" ON "_ChatsparticipantToMessage"("B");

-- AddForeignKey
ALTER TABLE "chats_participant" ADD CONSTRAINT "chats_participant_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatsparticipantToMessage" ADD CONSTRAINT "_ChatsparticipantToMessage_A_fkey" FOREIGN KEY ("A") REFERENCES "chats_participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatsparticipantToMessage" ADD CONSTRAINT "_ChatsparticipantToMessage_B_fkey" FOREIGN KEY ("B") REFERENCES "message"("id") ON DELETE CASCADE ON UPDATE CASCADE;
