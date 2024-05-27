import { cloudinary } from "@/utlis/cloudinary";
import axios from "axios";
import { IncomingForm } from "formidable";
import fs from "fs";

import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    //set up authenticated user logic here
    const form = new IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      try {
        if (!files.file || !files?.file[0].filepath) {
          return res.status(404).json({
            status: 404,
            message: "No audio found",
          });
        }

        const file = files.file[0];
        const senderId = fields?.senderId || "";
        const receiverId = fields?.receiverId || "";
        const type = fields?.type || "";
        const sentAt = fields?.sentAt || "";

        if (!senderId[0] || !receiverId[0] || !type[0] || !sentAt[0]) {
          return res.status(404).json({
            status: 404,
            message: "Invalid input",
          });
        }

        // console.log(senderId[0], receiverId[0], type[0], sentAt[0]);

        if (!file.mimetype?.includes("image")) {
          return res.status(404).json({
            status: 404,
            message: "Format not allowed. Upload an Image Format",
          });
        }

        const fileBuffer = fs.readFileSync(file.filepath);

        const base64Data = fileBuffer.toString("base64");

        const mimeType = file.mimetype;
        const encoding = "base64";

        // contruct file uri
        const fileUri = `data:${mimeType};${encoding},${base64Data}`;

        // console.log(file, fileUri.slice(0, 200));

        const cloudinaryResponse = await cloudinary.uploader.upload(fileUri, {
          invalidate: true,
          resource_type: "image",
          folder: `chatify/chatify_images`,
          transformation: [{ height: 300, width: 300, crop: "fill" }],
        });

        // console.log(cloudinaryResponse?.secure_url);

        if (!cloudinaryResponse.secure_url) {
          return res.status(404).json({
            status: 404,
            message: "Failed to Upload",
          });
        }

        const result = await axios.post(
          `${process.env.NEXTAUTH_URL}/api/send_chat`,
          {
            senderId: senderId[0],
            receiverId: receiverId[0],
            message: cloudinaryResponse.secure_url,
            type: "PHOTO",
            sentAt: sentAt[0],
          }
        );

        if (result.data.data.status === 404) {
          return res.status(404).json({
            status: 404,
            message: "Failed to Upload to main server",
          });
        }

        // console.log(result.data, result.status);

        return res.status(200).json({
          status: 200,
          message: "Success",
          data: result.data.data,
        });
      } catch (e) {
        // console.log(e);

        res.status(404).json({
          error: (e as Error).message || "Failed to connect",
        });
      }
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
