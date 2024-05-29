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
      const { name } = req.query as { name: string };

      console.log(name);

      if (!name) {
        return res.status(404).json({
          status: 404,
          message: "Invalid Id. Input an Id",
        });
      }

      const findId = await prisma.user.findFirst({
        where: {
          displayName: name,
        },
        select: {
          bio: true,
          displayName: true,
          profileImageUrl: true,
        },
      });
      if (!findId) {
        return res.status(404).json({
          status: 404,
          message: "Failed to Fetch. No/Slow internet connection",
        });
      }

      return res.status(200).json({
        message: "success",
        data: findId,
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
