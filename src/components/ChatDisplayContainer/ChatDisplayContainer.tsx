import { useWindowSize } from "@uidotdev/usehooks";
import ChatDisplay from "../ChatDisplay/ChatDisplay";
import { useCallback, useContext, useMemo } from "react";
import { Messages, UserTypes } from "@/types";

const ChatDisplayContainer = ({
  data,
  email,
}: {
  data: Messages[];
  email: String;
}) => {
  const { height } = useWindowSize();

  const memonizedData = useMemo(() => data, [data]);

  const scrollDown = useCallback(
    (element: HTMLDivElement) => {
      if (!element) return;
      const elem_height = element.scrollHeight;
      element.scrollTop = elem_height;
    },

    //TODO: do not data.length .. it will trigger a rerender when context increase..
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [height, memonizedData.length]
  );

  return (
    <div>
      <div
        ref={scrollDown}
        style={{
          height: `${
            typeof height === "number" ? `${height - 172}px` : "700px"
          }`,
        }}
        className={`scroll overflow-y-scroll overflow-x-hidden py-[1rem] pb-[0.5rem] relative`}
      >
        {memonizedData.length > 0 ? (
          <ChatDisplay email={email} data={memonizedData} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default ChatDisplayContainer;
