import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "@/utlis/prisma";

export const config = {
  api: {
    externalResolver: true,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { name } = req.query;

      // console.log(name);

      if (!name) {
        return res.status(404).json({ status: 404, message: "Invalid inputs" });
      }

      const session = await getServerSession(req, res, authOptions);

      if (!session) {
        return res.status(404).json({
          status: 404,
          message: "You need to be authenticated to use this",
        });
      }

      const users = await prisma.user.findMany({
        where: {
          displayName: {
            startsWith: name as string,
          },
          email: {
            not: session.user?.email as string,
          },
        },
        select: {
          id: true,
          email: true,
          displayName: true,
          profileImageUrl: true,
        },
      });

      return res.status(200).json({ message: "success", data: users });
    } catch (err: unknown) {
      if (
        (err as Error).message.includes(
          "Invalid `prisma.user.findMany()` invocation"
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
