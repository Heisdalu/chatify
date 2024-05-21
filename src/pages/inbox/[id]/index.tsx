import "@/styles/style.module.css";
import ChatLoading from "@/components/ChatDisplay/ChatLoading";
import DirectChatLayout from "@/components/Layouts/DirectChatLayout";
import Authenticated from "@/components/Wrapper/Authenticated";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/utlis/fetcher";
import ErrorDisplay from "@/components/ErrorDisplay/ErrorDisplay";
import ChatDisplayContainer from "@/components/ChatDisplayContainer/ChatDisplayContainer";
import ChatHeader from "@/components/ChatDisplayContainer/ChatHeader";
import { Messages, UserTypes } from "@/types";
import Chatbox from "@/components/ChatBox/Chatbox";
import { useSession } from "next-auth/react";

type UserDirectChatIDTypes = {
  data: Messages[];
  sender: UserTypes;
  receiver: UserTypes;
  message: string;
};

const UserDirectChatID = () => {
  const router = useRouter();
  const { data } = useSession();
  const {
    isError,
    isPaused,
    refetch,
    data: result,
    ...other
  } = useQuery<UserDirectChatIDTypes>({
    queryKey: ["direct_chat", router.query.id],
    queryFn: () =>
      fetcher(`/api/inbox_list/direct_chat?chat_id=${router.query.id}`),
    staleTime: 30 * 1000,
    enabled: !!router.query.id,
    refetchOnWindowFocus: false,
  });

  // TODO: message is empty a..display emptox box
  // TODO: internet is paused ...
  // TODO: connection failed ...
  // TODO: display message if it exist ...
  // TODO: display message if it exist ...

  // console.log(isError, isPaused, other);
  // console.log(result);

  return (
    <Authenticated>
      {other.isLoading && <ChatLoading />}
      {!other.isLoading && isError && (
        <ErrorDisplay
          message={other.error?.message || "Something went wrong"}
          refetch={refetch}
        />
      )}
      {!other.isLoading && isPaused && (
        <ErrorDisplay
          message="No/Slow internet connection. Check your internet connection"
          refetch={refetch}
        />
      )}
      {!other.isPending && other.isSuccess && result?.data && (
        <DirectChatLayout>
          {" "}
          <div className="h-[100vh] [max-height:-webkit-fill-available] overflow-hidden py-[1rem] max-w-[700px] mx-auto lg:py-[1rem] relative">
            <ChatHeader
              email={data?.user?.email as String}
              sender={result.sender}
              receiver={result.receiver}
            />
            {/* 170 // when replay box is not on*/}
            <ChatDisplayContainer
              data={result.data}
              email={data?.user?.email as String}
            />
            <Chatbox />
          </div>
        </DirectChatLayout>
      )}
    </Authenticated>
  );
};

export default UserDirectChatID;
