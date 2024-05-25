import { UserTypes } from "@/types";
import { generateRandomString } from "@/utlis";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

type Props = {
  url: string;
  email: string;
  audioDuration?: string;
  message: string;
  messageType: "TEXT" | "AUDIO" | "IMAGE";
  participant: {
    sender: UserTypes;
    receiver: UserTypes;
  };
};

const useSendMessage = () => {
  const queryClient = useQueryClient();

  const sendMessage = ({
    email,
    message,
    messageType,
    participant,
    url,
    audioDuration,
  }: Props) => {
    queryClient.setQueryData(["direct_chat", url], (old: any) => {
      // console.log(old);
      const newData = {
        loading: true,
        url: url,
        audioDuration: audioDuration || null,
        id: generateRandomString(),
        isSeen: false,
        msgContext: message,
        msgSenderId: email,
        msgReceiverId:
          participant.sender.email === email
            ? participant.receiver.email
            : participant.sender.email,
        msgType: messageType,
        sentAt: new Date().toISOString(),
      };

      const updatedCacheData = { ...old, data: [...old.data, newData] };
      // console.log(newP);

      return updatedCacheData;
    });
  };

  return { sendMessage };
};
export default useSendMessage;
