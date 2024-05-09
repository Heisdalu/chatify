import { cloudinary } from "@/utlis/cloudinary";
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
          throw new Error("No audio found");
        }

        const file = files.file[0];
        console.log(file);

        // must be an image format
        if (!file.mimetype?.includes("audio")) {
          throw new Error("Format not allowed. Upload an Audio Format");
        }

        const fileBuffer = fs.readFileSync(file.filepath);

        const base64Data = fileBuffer.toString("base64");

        const mimeType = file.mimetype;
        const encoding = "base64";

        // contruct file uri
        const fileUri = `data:${mimeType};${encoding},${base64Data}`;

        const cloudinaryResponse = await cloudinary.uploader.upload(fileUri, {
          invalidate: true,
          resource_type: "raw",
          filename_override: file.newFilename,
          folder: `chatify/chatify_audios`,
          use_filename: true,
          format: "mp3",
        });

        console.log(cloudinaryResponse);

        if (cloudinaryResponse.secure_url) {
          return res.status(200).json({
            message: "success",
          });
        } else {
          throw new Error("Failed to Upload. Internal Server Error");
        }
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
