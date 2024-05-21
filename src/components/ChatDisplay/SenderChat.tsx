import ChatDeliveryStatus from "./ChatDeliveryStatus";
import DragComponent from "../DragComponent/DragComponent";
import { Messages } from "@/types";

type Props = {
  item: Omit<Messages, "audioDuration" | "seenAt">;
};

const SenderChat = ({ item }: Props) => {
  return (
    <DragComponent className="p-[0.5rem] rounded-[10px] leading-[1.3rem] ml-auto inline-block border-gray-200 border-[1px] w-auto max-w-[200px] [word-break:break-word] space-y-[5px] md:max-w-[300px]">
      {item.parentMsgType === "TEXT" || item.parentMsgType === "AUDIO" ? (
        <div className=" space-y-[0.3rem] rounded-[5px] border-red-400 border-l-[5px] bg-gray-100 p-[0.3rem] px-[0.5rem]">
          <h1 className="font-[600]">{item?.parentMsgId}</h1>
          <p className="line-clamp-2 text-[0.8rem] leading-[0.9rem]">
            {item?.parentMsgContext}
          </p>
        </div>
      ) : (
        ""
      )}
      <p className="text-[0.9rem]"> {item?.msgContext}</p>

      <ChatDeliveryStatus sentTimestamp={item.sentAt} isSeen={item.isSeen} />
    </DragComponent>
  );
};
export default SenderChat;
