import { ChatReplyingContextType, ChatReplyDetail } from "@/types";
import React, { ReactNode, createContext, useCallback, useState } from "react";

const inital: ChatReplyingContextType = {
  chatType: "none",
  userReplyName: "",
  replyContext: "",
  chatReplyStateHandler: (data: ChatReplyDetail) => {},
};

export const ChatReplyingContext = createContext(inital);

const ChatReplyingProvider = ({ children }: { children: ReactNode }) => {
  const [chatReplyState, setChatReplyState] = useState({
    chatType: "none",
    userReplyName: "",
    replyContext: "",
  });

  const chatReplyStateHandler = useCallback((data: ChatReplyDetail) => {
    setChatReplyState(data);
  }, []);

  const ctxstate = {
    ...chatReplyState,
    chatReplyStateHandler,
  } as ChatReplyingContextType;

  // console.log(ctxstate);

  return (
    <ChatReplyingContext.Provider value={ctxstate}>
      {children}
    </ChatReplyingContext.Provider>
  );
};
export default ChatReplyingProvider;
