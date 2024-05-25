import { InboxListDataTypes, Messages } from "@/types";
import ChatDeliveryStatus from "../ChatDisplay/ChatDeliveryStatus";
import {
  useMutation,
  useQueryClient,
  useIsMutating,
} from "@tanstack/react-query";
import { fetcherPost } from "@/utlis/fetcher";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  item: Omit<Messages, "seenAt">;
};

// TODO: bug-- when user intiated chat for the first time... inboxlist should be updated
// TODO: bug-- when user chat send post request twice.. useIsMutation prevent his

const CustomSendingChat = ({ item }: Props) => {
  const queryClient = useQueryClient();
  const [error, setError] = useState(false);

  const mounted = useRef(false);

  const mutation = useMutation({
    mutationFn: (data: any) => fetcherPost("/api/send_chat", data),
    mutationKey: ["send_chat", item.id],
    onSuccess: (result, ctx, variables) => {
      
      // cache logic explained..

      /*
      check if getInboxList is present in the cache.. if it is not that means inboxlist is visited...
      so we just update only our chat.. when inboxlist is visited.. it will fetch new data...

      but if inboxlist is present.. we check if the findcChat i.e (sender id and recever id) are present in the cache
      if inboxlist is true and findChat is false.. we invalidate the inboxlist query and update the chat also
      this is for first time chat initator.. i.e.. user had no previous chat history with the receiver

      if both are true .. that means we update both the inboxlist and the chat 
      */


      const getInboxList: InboxListDataTypes | undefined =
        queryClient.getQueryData(["inbox_list"]);
      
      const findChat = getInboxList?.data.chatsList.find(
        (el) =>
          (el.senderId === item.msgSenderId &&
            el.receiverId === item.msgReceiverId) ||
          (el.senderId === item.msgReceiverId &&
            el.receiverId === item.msgSenderId)
      );

      // console.log(getInboxList, findChat);
      // for firstime initating..inboxlist might not have the updated chatpaticpant in it
      if (getInboxList && !findChat) {
        queryClient.invalidateQueries({ queryKey: ["inbox_list"] });
      }

      //for when inbox list is already fetched and user is found in the chat..
      if (getInboxList && findChat) {
        queryClient.setQueryData(["inbox_list"], (old: InboxListDataTypes) => {
          const filteredChatList = [...old.data.chatsList].map((el) =>
            (el.senderId === item.msgSenderId &&
              el.receiverId === item.msgReceiverId) ||
            (el.senderId === item.msgReceiverId &&
              el.receiverId === item.msgSenderId)
              ? { ...el, messages: [result.data] }
              : el
          );

          // console.log(filteredChatList);
          const updatedChatlist = {
            ...old,
            data: { ...old.data, chatsList: filteredChatList },
          };

          // console.log(updatedChatlist);

          return updatedChatlist;
        });
      }

      //it is general..update the current chat
      queryClient.setQueryData(["direct_chat", item.url], (old: any) => {
        // console.log(old);

        const newItem = [...old.data].filter((el) => el.id !== item.id);
        // console.log(newItem);

        const updatedData = { ...old, data: [...newItem, result.data] };
        // console.log(updatedData);

        return updatedData;
      });
    },
    onError: (error, variables, context) => {
      setError(true);
      // console.log(error);
      toast.error(`failed to send "${variables.message}"`);
    },
    retry: 3,
  });

  const mutating = useIsMutating({ mutationKey: ["send_chat", item.id] });

  const run = useCallback(() => {
    // console.log("you are running getInboxList");
    // console.log(entry);

    mutation.mutate({
      senderId: item.msgSenderId,
      receiverId: item.msgReceiverId,
      message: item.msgContext,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const retry = () => {
    run();
  };

  // console.log(mutation);

  useEffect(() => {
    // mutation prevent user making 2 post request when this component is still loading initally
    if (!mounted.current && mutating === 0) {
      run();
      mounted.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          onClick={retry}
          className="text-[0.6rem] ml-auto text-red-500 border-[1px] border-red-500 rounded-[5px] px-[1rem]"
        >
          Retry
        </button>
      )}
    </div>
  );
};
export default memo(CustomSendingChat);

