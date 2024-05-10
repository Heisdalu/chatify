// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { supabase } from "@/utlis/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    // Download the audio file from Cloudinary
    const url =
      "https://res.cloudinary.com/dfusdfpfh/video/upload/v1715339673/chatify/chatify_audios/eaa4a1562e865f16d5e199a07_koiwp1.mp3";

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to download file from ${url}`);
    }

    const result = await response.arrayBuffer();

    console.log(result);

    // Upload the audio file to Supabase storage
    const { data, error } = await supabase.storage
      .from("audios")
      .upload("test", result, {
        contentType: "audio/mpeg",
      });

    if (error) {
      throw error;
    }

    // Return fetched data as response
    // console.log(data?.publicUrl);
    //@ts-ignore
    return res.status(200).json({ success: true,data });
    // return res.status(200).json({ success: true, data });
  } else {
    return res.status(404).json({ name: "method not allowed" });
  }
}
