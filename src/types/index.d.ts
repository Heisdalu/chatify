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

export type ChatType = "NONE" | "TEXT" | "PHOTO" | "AUDIO";
export type ChatReplyDetail = {
  chatType: ChatType;
  userReplyName: string;
  replyContext: ChatType extends "AUDIO" ? number : string;
};
// export type ChatDetail

export type ChatReplyingContextType = {
  chatType: ChatType;
  userReplyName: string;
  replyContext: ChatType extends "AUDIO" ? number : string;
  chatReplyStateHandler: (data: ChatReplyDetail) => void;
};

export type Messages = {
  id: Number;
  audioDuration: string | null;
  isSeen: Boolean;
  msgContext: String;
  msgReceiverId: String;
  msgSenderId: String;
  msgType: Uppercase<ChatType>;
  sentAt: String;
};

export type ChatListTypes = {
  url: String;
  id: Number;
  receiverId: String;
  receiverDisplayName: String;
  receiverImageUrl: String;
  senderDisplayName: String;
  senderId: String;
  senderImageUrl: String;
  messages: Messages[];
};

export type InboxListDataTypes = {
  message: String;
  data: {
    email: String;
    displayName: String;
    chatsList: ChatListTypes[];
  };
};

export type UserTypes = {
  displayName: String;
  email: String;
  profileImageUrl: String;
};

export type AccTypes = {
  [timestamp: number]: Messages[];
};
