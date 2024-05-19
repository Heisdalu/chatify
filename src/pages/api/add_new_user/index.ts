import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import prisma from "@/utlis/prisma";
import { authOptions } from "../auth/[...nextauth]";

/// note- supabse time issues.. it gives 7:00pm to 6pm
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const data = req.body;
      console.log(data);

      const session = await getServerSession(req, res, authOptions);

      if (!session || !session.user || !session.user.email) {
        throw new Error("You need to be authenticated");
      }

      if (
        !data.name ||
        !data.bio ||
        !data.date ||
        data.name.length > 15 ||
        data.bio.length > 40 ||
        data.name.length === 0 ||
        data.bio.length === 0
      ) {
        throw new Error("Invalid Input");
      }

      const checkUserPresent = await prisma.user.findFirst({
        where: {
          email: session.user.email,
        },
        select: {
          id: true,
        },
      });

      if (checkUserPresent?.id) {
        throw new Error("Account registered already");
      }

      console.log(data.date);

      const createNewUser = await prisma.user.create({
        data: {
          email: session.user.email,
          displayName: data.name,
          bio: data.bio,
          profileImageUrl: session.user.image,
          createdAt: data.date,
        },
        select: {
          id: true,
        },
      });

      if (!createNewUser.id) {
        res.status(404).json({ message: "Cannot create new user" });
      }

      res.status(200).json({ message: "User created" });

      return res.status(200).json({ message: "display name can be used" });
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

      return res.status(404).json({
        status: 404,
        message: (err as Error).message || "something went wrong",
      });
    }
  } else {
    return res.status(404).json({ message: "method not allowed" });
  }
}
// import { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "GET") {
//     console.log("ddd");
//   } else {
//     return res.status(404).json({ message: "method not allowed" });
//   }
// }
