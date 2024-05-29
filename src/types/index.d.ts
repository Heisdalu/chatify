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
  loading?: boolean;
  url?: string;
  id: number;
  audioDuration: string | null;
  isSeen: boolean;
  msgContext: string;
  msgReceiverId: string;
  msgSenderId: string;
  msgType: Uppercase<ChatType>;
  sentAt: string;
};

export type ChatListTypes = {
  url: string;
  id: number;
  receiverId: string;
  receiverDisplayName: string;
  receiverImageUrl: string;
  senderDisplayName: string;
  senderId: string;
  senderImageUrl: string;
  messages: Messages[];
};

export type InboxListDataTypes = {
  message: string;
  data: {
    email: string;
    displayName: string;
    chatsList: ChatListTypes[];
  };
};

export type UserTypes = {
  displayName: string;
  email: string;
  profileImageUrl: string;
};

export type AccTypes = {
  [timestamp: number]: Messages[];
};

export type SearchUserTypes = {
  message: string;
  data: {
    id: number;
    email: string;
    displayName: string;
    profileImageUrl: string;
  }[];
};

export type VisblityResultTypes = {
  message: string;
  data: Messages;
};

export type LatestMessage = {
  id: number;
  message_senderId: string;
  message_receiverId: string;
  message_context: string;
  message_type: ChatType;
  audio_duration: string;
  sent_at: string;
  isSeen: boolean;
};

export type profileTypes = {
  message: string;
  data: {
    bio: string;
    displayName: string;
    profileImageUrl: string;
  };
};
