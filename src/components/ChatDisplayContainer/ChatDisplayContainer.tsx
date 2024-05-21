import { useWindowSize } from "@uidotdev/usehooks";
import ChatDisplay from "../ChatDisplay/ChatDisplay";
import { ChatReplyingContext } from "@/context/ChatReplyingProvider";
import { useCallback, useContext } from "react";
import { Messages } from "@/types";

const ChatDisplayContainer = ({
  data,
  email,
}: {
  data: Messages[];
  email: String;
}) => {
  const { height } = useWindowSize();
  const { chatType } = useContext(ChatReplyingContext);

  const scrollDown = useCallback(
    (element: HTMLDivElement) => {
      if (!element) return;
      const elem_height = element.scrollHeight;
      element.scrollTop = elem_height;
    },

    //TODO: do not data.length .. it will trigger a rerender when context increase..
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [height]
  );

  return (
    <div>
      <div
        ref={scrollDown}
        style={{
          height: `${
            typeof height === "number" && chatType === "none"
              ? `${height - 172}px`
              : chatType !== "none" && typeof height === "number"
              ? `${height - 210}px`
              : "700px"
          }`,
        }}
        className={`scroll overflow-y-scroll overflow-x-hidden py-[1rem] pb-[0.5rem] relative`}
      >
        {data.length > 0 ? <ChatDisplay email={email} data={data} /> : ""}
      </div>
    </div>
  );
};
export default ChatDisplayContainer;
