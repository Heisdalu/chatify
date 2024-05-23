import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import prisma from "@/utlis/prisma";
import AES from "crypto-js/aes";
import { enc } from "crypto-js";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { chat_id } = req.query;

      //   const session = await getServerSession(req, res, authOptions);
      //   if (!session) {
      //     return res
      //       .status(404)
      //       .json({ status: 404, message: "You need to be authenticated" });
      //   }

      if (!chat_id || typeof chat_id !== "string") {
        throw new Error("Invalid user");
      }

      const filterString = chat_id.split(" ").join("+");

      const decodedStr = decodeURIComponent(filterString);
      const value = AES.decrypt(decodedStr, process.env.HASH!).toString(
        enc.Utf8
      );

      if (!value.includes("&")) {
        throw new Error("Invalid user");
      }

      const [sender, receiver] = value.split("&");

      if (!sender || !receiver) {
        throw new Error("Invalid chat conversion");
      }

      console.log(sender, receiver);

      // TODO: // add a vliadation to check if user is authorized to view the chats..
      // FIXME: session.email === sender | recevier

      // check if sender and receiver are registered users
      const userAvailability = await prisma.user.findMany({
        where: {
          OR: [{ email: sender }, { email: receiver }],
        },
        select: {
          email: true,
          displayName: true,
          profileImageUrl: true,
        },
      });

      //if length is not 2.. then there is either an invalid sender or receiver
      if (userAvailability.length !== 2) {
        throw new Error("Unauthorized sender or receiver");
      }

      //once sender and receiver are confirmed... checck if their had initated a chat or not
      // if they had initiated a chat.. return the messages
      // if not.. return an empty array

      const user_direct_chats = await prisma.chatsparticipant.findFirst({
        where: {
          OR: [
            {
              AND: {
                receiverId: sender,
                senderId: receiver,
              },
            },
            {
              AND: {
                senderId: sender,
                receiverId: receiver,
              },
            },
          ],
        },
        include: {
          //messags should be paginated
          messages: {
            orderBy: {
              sentAt: "desc",
            },
            take: 15,

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

      const data = user_direct_chats
        ? { ...user_direct_chats }.messages.reverse()
        : [];

      return res.status(200).json({
        message: "success",
        data,
        sender: userAvailability[0],
        receiver: userAvailability[1],
      });
    } catch (err: unknown) {
      if (
        (err as Error).message.includes(
          "Invalid `prisma.user.findFirst()` invocation"
        ) ||
        (err as Error).message.includes(
          "Invalid `prisma.user.findMany()` invocation"
        )
      ) {
        return res.status(404).json({
          status: 404,
          message: "Failed to Fetch. No/Slow internet connection",
        });
      }
      return res.status(404).json({
        status: 404,
        message: (err as Error).message || "Something went wrong",
      });
    }
  } else {
    return res.status(404).json({ message: "method not allowed" });
  }
}
