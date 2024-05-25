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
// TODO: 

const CustomSendingChat = ({ item }: Props) => {
  const queryClient = useQueryClient();
  const [error, setError] = useState(false);

  const mounted = useRef(false);

  const mutation = useMutation({
    mutationFn: (data: any) => fetcherPost("/api/send_chat", data),
    mutationKey: ["send_chat", item.id],
    onSuccess: (result, ctx, variables) => {
      // console.log(result, ctx, variables);
      queryClient.setQueryData(["inbox_list"], (old: InboxListDataTypes) => {
        // console.log(old);
        if (!old) {
          return old;
        }
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
    // console.log("you are running lol");
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

/*
[
    {
        "id": 3,
        "senderId": "divineobi07@gmail.com",
        "senderDisplayName": "dhevine",
        "senderImageUrl": "https://lh3.googleusercontent.com/a/ACg8ocL_VKLmwuqzTbrMOlDMP4D1-aSqxnIQ_4jgmvHP49DXhWUKdEc=s96-c",
        "receiverId": "divineobi007@gmail.com",
        "receiverDisplayName": "dd_boy",
        "receiverImageUrl": "https://lh3.googleusercontent.com/a/ACg8ocLh0NSuSkWk7RUGoGxiBmDdKLbwqMcJoAvl4tOyKyeZMYzZSg=s96-c",
        "messages": [
            {
                "id": 43,
                "audioDuration": null,
                "isSeen": false,
                "msgContext": "okay gg",
                "msgReceiverId": "divineobi007@gmail.com",
                "msgSenderId": "divineobi07@gmail.com",
                "msgType": "TEXT",
                "sentAt": "2024-05-24T14:02:00.506Z"
            }
        ],
        "url": "U2FsdGVkX1%2BOAJmGs6dAVfEKSTscT6kSa9bpndz4fHcTogNq1utcWccVZg%2F5Zviy63qneSgo2MIhVmftXwlJsA%3D%3D"
    },
    {
        "id": 5,
        "senderId": "divineobi100@gmail.com",
        "senderDisplayName": "hack_Sultan",
        "senderImageUrl": "https://lh3.googleusercontent.com/a/ACg8ocLEKCobaY6YN8hHUxgwE6Srzi0qZH1-yCOCnZTHCwVG9rmNog=s96-c",
        "receiverId": "divineobi07@gmail.com",
        "receiverDisplayName": "dhevine",
        "receiverImageUrl": "https://lh3.googleusercontent.com/a/ACg8ocL_VKLmwuqzTbrMOlDMP4D1-aSqxnIQ_4jgmvHP49DXhWUKdEc=s96-c",
        "messages": [
            {
                "id": 6,
                "audioDuration": "0:50",
                "isSeen": false,
                "msgContext": "lol geeeee",
                "msgReceiverId": "divineobi07@gmail.com",
                "msgSenderId": "divineobi100@gmail.com",
                "msgType": "AUDIO",
                "sentAt": "2024-05-19T17:25:38.436Z"
            }
        ],
        "url": "U2FsdGVkX19Wjc19qrAeCg%2BW1xbCuBUVfXd8TR%2BG3ZWlP%2Fr5EBlXX4ENZeyix9jXPahIf0MMTAYsUZxePMVWYw%3D%3D"
    },
    {
        "id": 7,
        "senderId": "divineobi07@gmail.com",
        "senderDisplayName": "dhevine",
        "senderImageUrl": "https://lh3.googleusercontent.com/a/ACg8ocL_VKLmwuqzTbrMOlDMP4D1-aSqxnIQ_4jgmvHP49DXhWUKdEc=s96-c",
        "receiverId": "prosperobi100@gmail.com",
        "receiverDisplayName": "propser_baller",
        "receiverImageUrl": "https://lh3.googleusercontent.com/a/ACg8ocIBzRpGcnref0ckuyBgxC4BH4Cw5-Kc77W1Yz3CCF2w5-tbKA=s96-c",
        "messages": [],
        "url": "U2FsdGVkX1%2FtoqTTI62poRwWlIxtyKvvRazAR7oZW7xtBuf4Ds2EMU4fZhvHmOjUEeaDYuuLYgkahlNV71SK7Q%3D%3D"
    }
]
*/
