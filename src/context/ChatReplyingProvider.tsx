import { ChatReplyingContextType } from "@/types";
import React, { ReactNode, createContext, useCallback, useState } from "react";

const inital: ChatReplyingContextType = {
  chatType: "none",
  userReplyName: "",
  replyContext: "",
};

export const ChatReplyingContext = createContext(inital);

const ChatReplyingProvider = ({ children }: { children: ReactNode }) => {
  const [chatReplyState, setChatReplyState] = useState(inital);

  const chatReplyStateHandler = useCallback((data: ChatReplyingContextType) => {
    setChatReplyState(data);
  }, []);

  const ctxstate = {
    ...chatReplyState,
    chatReplyStateHandler,
  };

  console.log(ctxstate);

  return (
    <ChatReplyingContext.Provider value={ctxstate}>
      {children}
    </ChatReplyingContext.Provider>
  );
};
export default ChatReplyingProvider;
