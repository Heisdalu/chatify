import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/utlis/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { name } = req.query;

      const session = await getServerSession(req, res, authOptions);
      if (!session) {
        return res
          .status(404)
          .json({ status: 404, message: "You need to be authenticated" });
      }

      if (!name || typeof name !== "string") {
        throw new Error("Input a valid user");
      }

      // check if user is present in supbase
      const userInfo = await prisma.user.findFirst({
        where: {
          email: name,
        },
        select: {
          displayName: true,
          email: true,
        },
      });

      const chatsList = await prisma.chatsparticipant.findMany({
        where: {
          OR: [{ senderId: name }, { receiverId: name }],
        },
        include: {
          messages: {
            orderBy: {
              sentAt: "desc",
            },
            select: {
              id: true,
              audioDuration: true,
              isSeen: true,
              msgContext: true,
              msgReceiverId: true,
              msgSenderId: true,
              msgType: true,
              sentAt: true,
            },
            take: 1,
          },
        },
      });

      if (!userInfo) {
        return res
          .status(404)
          .json({ status: 404, message: "User not available" });
      }

      return res.status(200).json({
        message: "success",
        data: {
          ...userInfo,
          chatsList,
        },
      });
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
