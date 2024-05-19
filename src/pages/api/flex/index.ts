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
      //   const { name } = req.query;

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
                receiverId: "divineobi07@gmail.com",
                senderId: "divineobi007@gmail.com",
              },
            },
            {
              AND: {
                senderId: "divineobi07@gmail.com",
                receiverId: "divineobi007@gmail.com",
              },
            },
          ],
        },
      });

      // new chat
      // const userInfo = await prisma.chatsparticipant.create({
      //   data: {
      //     receiverId: "divineobi007@gmail.com",
      //     receiverDisplayName: "dd_boy",
      //     receiverImageUrl:
      //       "https://lh3.googleusercontent.com/a/ACg8ocLh0NSuSkWk7RUGoGxiBmDdKLbwqMcJoAvl4tOyKyeZMYzZSg=s96-c",
      //     sender: {
      //       connect: {
      //         email: "divineobi07@gmail.com",
      //       },
      //     },
      //     messages: {
      //       create: {
      //         msgContext: "Hi bruh",
      //         msgReceiverId: "divineobi007@gmail.com",
      //         msgSenderId: "divineobi07@gmail.com",
      //         msgType: "TEXT",
      //       },
      //     },
      //   },
      // });

      console.log(userInfo);

      const lol = await prisma.chatsparticipant.update({
        where: {
          id: 1,
        },
        data: {
          messages: {
            create: {
              msgContext: "i am dope bruh.. how are you?",
              msgReceiverId: "divineobi07@gmail.com",
              msgSenderId: "divineobi007@gmail.com",
              msgType: "PHOTO",
            },
          },
        },
      });

      if (!userInfo) {
        return res
          .status(404)
          .json({ status: 404, message: "user not available" });
      }

      console.log(lol);

      return res.status(200).json({ message: "success" });
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
