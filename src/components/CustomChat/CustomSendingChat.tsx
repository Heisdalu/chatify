import { Messages } from "@/types";
import ChatDeliveryStatus from "../ChatDisplay/ChatDeliveryStatus";
import { memo } from "react";
import useCustomMutation from "@/hooks/useCustomMutation";

type Props = {
  item: Messages;
};

const CustomSendingChat = ({ item }: Props) => {
  const { mutation, error, resend } = useCustomMutation(item);

  return (
    <div className="p-[0.5rem] rounded-[10px] leading-[1.3rem] ml-auto border-gray-200 border-[1px] w-auto max-w-[200px] [word-break:break-word] space-y-[5px] md:max-w-[300px] flex flex-col">
      <p className="text-[0.9rem]"> {item?.msgContext}</p>

      <ChatDeliveryStatus
        loading={item?.loading}
        sentTimestamp={item.sentAt}
        isSeen={item.isSeen}
      />
      {(mutation.isError || error) && (
        <button
          onClick={() => resend()}
          className="text-[0.6rem] ml-auto text-red-500 border-[1px] border-red-500 rounded-[5px] px-[1rem]"
        >
          Retry
        </button>
      )}
    </div>
  );
};
export default memo(CustomSendingChat);
