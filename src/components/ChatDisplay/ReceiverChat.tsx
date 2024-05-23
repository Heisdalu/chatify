import { Messages } from "@/types";
import ChatDeliveryStatus from "./ChatDeliveryStatus";

const ReceiverChat = ({ item }: { item: Messages }) => {
  return (
    <div className="mr-auto p-[0.5rem] rounded-[10px] leading-[1.3rem] inline-block border-gray-200 border-[1px] w-auto max-w-[200px] [word-break:break-word] space-y-[5px] md:max-w-[300px]">
      <p className="text-[0.9rem]">{item?.msgContext}</p>
      <ChatDeliveryStatus sentTimestamp={item?.sentAt} isSeen={item?.isSeen} />
    </div>
  );
};
export default ReceiverChat;
