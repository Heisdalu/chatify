import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import prisma from "@/utlis/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { name } = req.query;

    try {
      const session = await getServerSession(req, res, authOptions);

      if (!session) {
        throw new Error("You need to be authenticated");
      }

      if (!name || (name as String).trim() === "" || typeof name !== "string") {
        throw new Error("Input a valid display name");
      }

      if (name.length > 15) {
        throw new Error("Maximum of 15 characters");
      }

      // check if user is present in supbase.. then return error if present
      const userInfo = await prisma.user.findFirst({
        where: {
          displayName: name,
        },
      });

      if (userInfo) {
        throw new Error("display name taken. Try another one");
      }

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
