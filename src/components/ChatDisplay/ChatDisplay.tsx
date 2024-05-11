// import { useNetworkState } from "@uidotdev/usehooks";

import Chatbox from "../ChatBox/Chatbox";
import ImageDisplay from "./ImageDisplay";
import DateGroup from "./DateGroup";
import ReceiverChat from "./ReceiverChat";
import SenderChat from "./SenderChat";
import AudioDisplay from "./AudioDisplay";
import { ChatReplyingContextType } from "@/types";
import { memo } from "react";

const ChatDisplay = () => {
  //   const network = useNetworkState();
  //   console.log(network);
console.log('ddddd');


  return (
    <div className="flex flex-col">
      <div className="flex flex-col space-y-[1rem] px-[1rem]">
        <DateGroup text="15, January, 2023" />
        <SenderChat />
        <SenderChat />
        <AudioDisplay />
        <DateGroup text="14, April, 2023" />
        <ReceiverChat />
        <SenderChat />
        <DateGroup text="15, January, 2023" />
        <SenderChat />
        <ReceiverChat />
        <ReceiverChat />
        <ImageDisplay />
        <ReceiverChat />
        <ReceiverChat />
        <ReceiverChat />
        <DateGroup text="15, March, 2023" />
        <SenderChat />
        <ReceiverChat />
        <DateGroup text="18, March, 2023" />
        <ReceiverChat />
        <ReceiverChat />
        <ReceiverChat />
        <ReceiverChat />
        <ReceiverChat />
      </div>
      <Chatbox />
    </div>
  );
};
export default memo(ChatDisplay);
