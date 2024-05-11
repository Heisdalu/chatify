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

export type ChatType = "none" | "text" | "photo" | "audio";
export type ChatReplyDetail = {
  chatType: ChatType;
  userReplyName: string;
  replyContext: ChatType extends "audio" ? number : string;
};
// export type ChatDetail  

export type ChatReplyingContextType = {
  chatType: ChatType;
  userReplyName: string;
  replyContext: ChatType extends "audio" ? number : string;
  chatReplyStateHandler: (data: ChatReplyDetail) => void;
};
