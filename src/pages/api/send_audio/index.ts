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
        const duration = fields?.duration || "";

        if (!senderId[0] || !receiverId[0] || !type[0] || !duration[0]) {
          return res.status(404).json({
            status: 404,
            message: "Invalid input",
          });
        }

        console.log(senderId[0], receiverId[0], type[0], duration[0]);
        // must be an image format
        if (
          !file.mimetype?.includes("audio") &&
          !file.mimetype?.includes("video")
        ) {
          // throw new Error("Format not allowed. Upload an Audio Format");
          return res.status(404).json({
            status: 404,
            message: "Audio format not allowed",
          });
        }

        const fileBuffer = fs.readFileSync(file.filepath);

        const base64Data = fileBuffer.toString("base64");

        const mimeType = file.mimetype;
        const encoding = "base64";

        // contruct file uri
        const fileUri = `data:${"video/webm"};${encoding},${base64Data}`;

        // console.log(file, fileUri.slice(0, 200));

        const cloudinaryResponse = await cloudinary.uploader.upload(fileUri, {
          invalidate: true,
          resource_type: "video",
          folder: `chatify/chatify_audios`,
          //   use_filename: true,
          format: "mp3",
        });

        console.log(cloudinaryResponse?.secure_url);

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
            type: "AUDIO",
            duration: duration[0],
          }
        );

        if (result.data.status === 404) {
          return res.status(404).json({
            status: 404,
            message: "Failed to Upload to main server",
          });
        }

        console.log(result.data, result.status);

        return res.status(200).json({
          status: 200,
          message: "Success",
          data: result.data,
        });
      } catch (e) {
        console.log(e);

        res.status(404).json({
          error: (e as Error).message || "Failed to connect",
        });
      }
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
