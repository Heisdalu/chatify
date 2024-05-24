import { Messages } from "@/types";
import ChatDeliveryStatus from "../ChatDisplay/ChatDeliveryStatus";
import { useMutation } from "@tanstack/react-query";
import { fetcherPost } from "@/utlis/fetcher";

type Props = {
  item: Omit<Messages, "audioDuration" | "seenAt">;
};

const CustomSendingChat = ({ item }: Props) => {
  const p = useMutation({
    mutationFn: (data) => fetcherPost("/api/chat", data),
  });

  console.log('dddd');
  

  return (
    <div className="p-[0.5rem] rounded-[10px] leading-[1.3rem] ml-auto inline-block border-gray-200 border-[1px] w-auto max-w-[200px] [word-break:break-word] space-y-[5px] md:max-w-[300px]">
      <p className="text-[0.9rem]"> {item?.msgContext}</p>

      <ChatDeliveryStatus sentTimestamp={item.sentAt} isSeen={item.isSeen} />
    </div>
  );
};
export default CustomSendingChat;
