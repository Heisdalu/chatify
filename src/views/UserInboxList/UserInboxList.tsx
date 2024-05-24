import { FC, Key, memo } from "react";
import InboxHeader from "@/components/InboxHeader/InboxHeader";
import UserInboxCard from "@/components/InboxList/UserInboxCard";
import InboxNavigation from "@/components/InboxNavigation/InboxNavigation";
import { useWindowSize } from "@uidotdev/usehooks";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/utlis/fetcher";
import InboxLoading from "@/components/Loading/InboxLoading";
import NoChatPresent from "@/components/InboxList/NoChatPresent";
import { InboxListDataTypes } from "@/types";
import ErrorDisplay from "@/components/ErrorDisplay/ErrorDisplay";

interface UserInboxListProps {
  email: string | null | undefined;
}

const UserInboxList: FC<UserInboxListProps> = ({ email }) => {
  const { height, width } = useWindowSize();
  const {
    isPending,
    isLoading,
    isSuccess,
    isError,
    isPaused,
    isFetching,
    data: result,
    ...other
  } = useQuery<InboxListDataTypes>({
    queryKey: ["inbox_list"],
    queryFn: () => fetcher(`api/inbox_list?name=${email}`),
    retry: 3,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 1000,
    enabled: true,
  });

  // console.log(result);

  return (
    <>
      {!isPending && isSuccess && (
        <div className="box">
          <InboxNavigation />
          <div className="space-y-[1rem]">
            <InboxHeader
              email={email as String}
              displayName={result.data.displayName}
            />
            <h1 className="fluid font-[600]">Messages</h1>
            <div
              style={{
                height: `${
                  typeof height === "number" && typeof width === "number"
                    ? `${height - (width >= 768 ? 300 : 230)}px`
                    : "700px"
                }`,
              }}
              className="scroll space-y-[1rem] h-[400px] overflow-y-scroll"
            >
              {result.data?.chatsList?.length > 0 ? (
                result.data.chatsList.map((el) => (
                  <UserInboxCard
                    key={el.id as Key}
                    data={el}
                    email={email as String}
                  />
                ))
              ) : (
                <NoChatPresent />
              )}
            </div>
          </div>
        </div>
      )}
      {isLoading && <InboxLoading />}
      {!isLoading && isError && (
        <ErrorDisplay message={other.error?.message} refetch={other.refetch} />
      )}
      {!isLoading && isPaused && (
        <ErrorDisplay
          message={other.failureReason?.message}
          refetch={other.refetch}
        />
      )}
    </>
  );
};
export default memo(UserInboxList);
