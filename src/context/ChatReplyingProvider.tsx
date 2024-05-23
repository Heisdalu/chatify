import { ChatReplyingContextType, ChatReplyDetail } from "@/types";
import React, { ReactNode, createContext, useCallback, useState } from "react";

const inital: ChatReplyingContextType = {
  chatType: "NONE",
  userReplyName: "",
  replyContext: "",
  chatReplyStateHandler: (data: ChatReplyDetail) => {},
};

export const ChatReplyingContext = createContext(inital);

const ChatReplyingProvider = ({ children }: { children: ReactNode }) => {
  const [chatReplyState, setChatReplyState] = useState({
    chatType: "NONE",
    userReplyName: "",
    replyContext: "",
  });

  const chatReplyStateHandler = useCallback((data: ChatReplyDetail) => {
    setChatReplyState(data);
    // console.log(data);

    if (data.chatType !== "NONE") {
      document.querySelector(".chatbox")?.classList.add("hideTopBorder");
    } else {
      document.querySelector(".chatbox")?.classList.remove("hideTopBorder");
    }
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
