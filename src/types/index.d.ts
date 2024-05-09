declare module "react-audio-visualize";

export type AudioStateType = "idle" | "granted" | "prompt" | "denied";

export type UploadError = {
  message: string;
  name: string;
  http_code: number;
};

export type UploadSuccess = {
  secure_url: string;
};
