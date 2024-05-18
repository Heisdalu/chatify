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
      const session = await getServerSession(req, res, authOptions);

      if (!session) {
        throw new Error("You need to be authenticated");
      }

      // check if user is present in supbase
      const userInfo = await prisma.user.findFirst({
        where: {
          email: session?.user!.email as string,
        },
      });

      if (!userInfo) {
        throw new Error("Empty bio data");
      }
    } catch (err: unknown) {
      return res.status(404).json({
        status: 404,
        message: (err as Error).message || "something went wrong",
      });
    }

    return res.status(200).json({ message: "user is available" });
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
