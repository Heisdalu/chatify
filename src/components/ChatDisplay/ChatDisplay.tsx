// import { useNetworkState } from "@uidotdev/usehooks";

import Chatbox from "../ChatBox/Chatbox";
import DateGroup from "./DateGroup";
import ReceiverChat from "./ReceiverChat";
import SenderChat from "./SenderChat";

const ChatDisplay = () => {
  //   const network = useNetworkState();
  //   console.log(network);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col space-y-[1rem] px-[1rem]">
        <DateGroup text="15, January, 2023" />
        <SenderChat />
        <SenderChat />
        <DateGroup text="14, April, 2023" />
        <ReceiverChat />
        <SenderChat />
        <DateGroup text="15, January, 2023" />
        <SenderChat />
        <ReceiverChat />
        <ReceiverChat />
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
export default ChatDisplay;