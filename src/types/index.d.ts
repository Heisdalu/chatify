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

export type Messages = {
  id: Number;
  audioDuration: String | null;
  isSeen: Boolean;
  msgContext: String;
  msgReceiverId: String;
  msgSenderId: String;
  msgType: Uppercase<ChatType>;
  parentMsgContext: String | null;
  parentMsgId: String | null;
  parentMsgType: Uppercase<ChatType>;
  seenAt: String;
  sentAt: String;
};

export type ChatListTypes = {
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
