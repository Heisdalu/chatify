import { InboxListDataTypes, VisblityResultTypes } from "@/types";
import { fetcherPost } from "@/utlis/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useVisiblity = ({ id, isSeen }: { id: number; isSeen: boolean }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [seenOnce, setSeenOnce] = useState(false);
  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });

  const mutation = useMutation({
    mutationFn: (data: any) => fetcherPost("/api/seen_chat", data),
    retry: 5,
    onSuccess(result: VisblityResultTypes, _variables, _context) {
      const getInboxList: InboxListDataTypes | undefined =
        queryClient.getQueryData(["inbox_list"]);
      //   console.log(result, getInboxList);

      const findChat = getInboxList?.data.chatsList.find(
        (el) =>
          (el.senderId === result.data.msgSenderId &&
            el.receiverId === result.data.msgReceiverId) ||
          (el.senderId === result.data.msgReceiverId &&
            el.receiverId === result.data.msgSenderId)
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
            (el.senderId === result.data.msgSenderId &&
              el.receiverId === result.data.msgReceiverId &&
              el.messages[0].id === result.data.id) ||
            (el.senderId === result.data.msgReceiverId &&
              el.receiverId === result.data.msgSenderId &&
              el.messages[0].id === result.data.id)
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

      if (!router.query.id) return;

      //update personal chat
      queryClient.setQueryData(["direct_chat", router.query.id], (old: any) => {
        // console.log(old);

        const newItem = [...old.data]?.map((el) =>
          el.id === result.data.id ? { ...el, isSeen: result.data.isSeen } : el
        );
        // console.log(newItem);

        const updatedData = { ...old, data: [...newItem] };
        // console.log(updatedData);

        return updatedData;
      });
    },
  });

  useEffect(() => {
    //   console.log(entry, id);
    entry;
    if (entry?.isIntersecting && !seenOnce && !isSeen && router.query.id) {
      setSeenOnce(true);
      // do the update request here
      mutation.mutate({ id: id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry, id, isSeen, seenOnce]);

  useEffect(() => {}, []);

  return { ref };
};
export default useVisiblity;
