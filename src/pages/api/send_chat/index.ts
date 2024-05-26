import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/utlis/prisma";
import { Type } from "@prisma/client";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { senderId, receiverId, message, type } = req.body as {
        senderId: string;
        receiverId: string;
        message: string;
        type: "TEXT" | "AUDIO" | "IMAGE";
      };

      console.log(req.body);

      // console.log(senderId, receiverId, message);

      if (!senderId || !receiverId || !message) {
        return res.status(404).json({ status: 404, message: "Invalid inputs" });
      }

      const session = await getServerSession(req, res, authOptions);

      //   if (!session) {
      //     return res
      //       .status(404)
      //       .json({ status: 404, message: "You need to be authenticated" });
      //   }

      // check if user is present in supbase
      const userInfo = await prisma.chatsparticipant.findFirst({
        where: {
          OR: [
            {
              AND: {
                senderId: senderId,
                receiverId: receiverId,
              },
            },
            {
              AND: {
                senderId: receiverId,
                receiverId: senderId,
              },
            },
          ],
        },
        select: {
          id: true,
        },
      });

      console.log(userInfo);

      // chat exits... update the message array
      if (userInfo?.id) {
        const result = await prisma.message.create({
          data: {
            msgSenderId: senderId,
            msgReceiverId: receiverId,
            msgContext: message,
            msgType: type as Type,
            Chatsparticipant: {
              connect: [{ id: userInfo.id }],
            },
          },
          select: {
            id: true,
            msgContext: true,
            msgReceiverId: true,
            audioDuration: true,
            isSeen: true,
            msgSenderId: true,
            msgType: true,
            sentAt: true,
          },
        });
        return res.status(200).json({ message: "success", data: result });
      }

      // chat does not exit.. either wrong id/invalid user or a new chat is initialized

      // check if sender and receiver are registered users
      const userAvailability = await prisma.user.findMany({
        where: {
          OR: [{ email: senderId }, { email: receiverId }],
        },
        select: {
          email: true,
          displayName: true,
          profileImageUrl: true,
        },
      });

      //if length is not 2.. then there is either an invalid sender or receiver
      if (userAvailability.length !== 2) {
        return res.status(404).json({ status: 404, message: "Invalid user" });
      }

      const [user1, user2] = userAvailability;

      const createParticipants = await prisma.chatsparticipant.create({
        data: {
          receiverId: senderId === user1.email ? user2.email : user1.email,
          receiverDisplayName:
            senderId === user1.email ? user2.displayName : user1.displayName,
          receiverImageUrl:
            senderId === user1.email
              ? (user2.profileImageUrl as string)
              : (user1.profileImageUrl as string),
          sender: {
            connect: {
              email: senderId,
            },
          },
          messages: {
            create: {
              msgSenderId: senderId,
              msgReceiverId: receiverId,
              msgContext: message,
              msgType: type as Type,
            },
          },
        },

        select: {
          messages: {
            select: {
              id: true,
              msgContext: true,
              msgReceiverId: true,
              audioDuration: true,
              isSeen: true,
              msgSenderId: true,
              msgType: true,
              sentAt: true,
            },
          },
        },
      });

      if (!createParticipants) {
        return res
          .status(404)
          .json({ status: 404, message: "something went wrong" });
      }

      return res
        .status(200)
        .json({ message: "success", data: createParticipants.messages[0] });
    } catch (err: unknown) {
      if (
        (err as Error).message.includes(
          "Invalid `prisma.user.findFirst()` invocation"
        )
      ) {
        return res.status(404).json({
          status: 404,
          message: "Failed to Fetch. No/Slow internet connection",
        });
      }
    }
  } else {
    return res.status(404).json({ message: "method not allowed" });
  }
}
// import { NextApiRequest, NextApiResponse } from "next";
