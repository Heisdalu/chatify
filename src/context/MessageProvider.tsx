import LastMessage from "@/components/LastMessage/LastMessage";
import { InboxListDataTypes, LatestMessage, Messages } from "@/types";
import { supabase } from "@/utlis/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { ReactNode, createContext, useEffect } from "react";

const MessageContext = createContext({});

const MessageProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const { status, data } = useSession();
  // data?.user?.email

  useEffect(() => {
    if (status === "authenticated" && data?.user?.email) {
      // changes to insert... if new user messages are received
      const channel_One = supabase
        .channel("room1")
        .on(
          //@ts-ignore
          "postgres_changes",
          {
            event: "INSERT", // Listen only to UPDATEs
            schema: "public",
            table: "message",
            filter: `message_receiverId=eq.${data.user.email}`,
          },
          ({
            errors,
            new: latestInsert,
          }: {
            new: LatestMessage;
            errors: String[] | null;
          }) => {
            // console.log(payload);
            if (errors || !latestInsert) {
              return;
            }
            // console.log(queryClient);
            const getInboxList: InboxListDataTypes | undefined =
              queryClient.getQueryData(["inbox_list"]);
            // console.log("new insert", latestInsert, getInboxList);

            const findChat = getInboxList?.data.chatsList.find(
              (el) =>
                (el.senderId === latestInsert.message_senderId &&
                  el.receiverId === latestInsert.message_receiverId) ||
                (el.senderId === latestInsert.message_receiverId &&
                  el.receiverId === latestInsert.message_senderId)
            );

            // for firstime initating..inboxlist might not have the updated chatpaticpant in it
            if (getInboxList && !findChat) {
              queryClient.invalidateQueries({ queryKey: ["inbox_list"] });
            }

            //for when inbox list is already fetched and user is found in the chat..
            if (getInboxList && findChat) {
              const newInfo: Messages = {
                id: latestInsert.id,
                audioDuration: latestInsert.audio_duration,
                msgContext: latestInsert.message_context,
                msgReceiverId: latestInsert.message_receiverId,
                msgSenderId: latestInsert.message_senderId,
                msgType: latestInsert.message_type,
                sentAt: latestInsert.sent_at,
                isSeen: latestInsert.isSeen,
              };
              queryClient.setQueryData(
                ["inbox_list"],
                (old: InboxListDataTypes) => {
                  const filteredChatList = [...old.data.chatsList].map((el) =>
                    (el.senderId === latestInsert.message_senderId &&
                      el.receiverId === latestInsert.message_receiverId) ||
                    (el.senderId === latestInsert.message_receiverId &&
                      el.receiverId === latestInsert.message_senderId)
                      ? { ...el, messages: [newInfo] }
                      : el
                  );

                  // console.log(filteredChatList);
                  const updatedChatlist = {
                    ...old,
                    data: { ...old.data, chatsList: filteredChatList },
                  };

                  //   console.log(updatedChatlist);

                  return updatedChatlist;
                }
              );
            }

            const personalChat = queryClient.getQueriesData({
              queryKey: ["direct_chat"],
            });

            if (personalChat.length === 0) return;

            //@ts-nocheck
            const selectChats = personalChat.filter(
              (el: any) =>
                (el[1]?.sender?.email === latestInsert.message_senderId &&
                  el[1]?.receiver?.email === latestInsert.message_receiverId) ||
                (el[1]?.sender?.email === latestInsert.message_receiverId &&
                  el[1]?.receiver?.email === latestInsert.message_senderId)
            );

            // console.log(findChat, personalChat, selectChats);

            if (selectChats.length === 0) return;
            selectChats.forEach((item) => {
              queryClient.setQueryData(
                ["direct_chat", item[0][1]],
                (old: any) => {
                  const newChatInfo: Messages = {
                    id: latestInsert.id,
                    audioDuration: latestInsert.audio_duration,
                    msgContext: latestInsert.message_context,
                    msgReceiverId: latestInsert.message_receiverId,
                    msgSenderId: latestInsert.message_senderId,
                    msgType: latestInsert.message_type,
                    sentAt: latestInsert.sent_at,
                    isSeen: latestInsert.isSeen,
                  };

                  const updatedList = {
                    ...old,
                    data: [...old.data, newChatInfo],
                  };

                  //   console.log(updatedList);

                  return updatedList;
                }
              );
            });
          }
        )
        .subscribe();

      //   changes to updates... if user messages are sent only
      const channel_Two = supabase
        .channel("room2")
        .on(
          // @ts-ignore
          "postgres_changes",
          {
            event: "UPDATE", // Listen only to UPDATEs
            schema: "public",
            table: "message",
            filter: `message_senderId=eq.${data.user.email}`,
          },
          ({
            errors,
            new: latestUpdate,
          }: {
            new: LatestMessage;
            errors: String[] | null;
          }) => {
            // console.log("new updates", latestUpdate);
            // this updates.. listen if a message is sent and update it
            //only used on direct chat

            if (errors || !latestUpdate) {
              return;
            }

            const personalChat = queryClient.getQueriesData({
              queryKey: ["direct_chat"],
            });

            if (personalChat.length === 0) return;

            //@ts-nocheck
            const selectChats = personalChat.filter(
              (el: any) =>
                (el[1]?.sender?.email === latestUpdate.message_senderId &&
                  el[1]?.receiver?.email === latestUpdate.message_receiverId) ||
                (el[1]?.sender?.email === latestUpdate.message_receiverId &&
                  el[1]?.receiver?.email === latestUpdate.message_senderId)
            );

            // console.log(findChat, personalChat, selectChats);

            if (selectChats.length === 0) return;
            selectChats.forEach((item) => {
              queryClient.setQueryData(
                ["direct_chat", item[0][1]],
                (old: any) => {
                  //update the seen
                  const updatedChatList = {
                    ...old,
                    data: [...old.data].map((el) =>
                      el.id === latestUpdate.id
                        ? { ...el, isSeen: latestUpdate.isSeen }
                        : el
                    ),
                  };

                  return updatedChatList;
                }
              );
            });
          }
        )
        .subscribe();
    }

    // return () => {
    //   supabase.removeAllChannels();
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <MessageContext.Provider value={{}}>{children}</MessageContext.Provider>
  );
};
export default MessageProvider;
