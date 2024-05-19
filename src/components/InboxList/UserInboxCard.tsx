import { ChatListTypes, InboxListDataTypes } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface Props {
  data: ChatListTypes;
}

const UserInboxCard: FC<Props> = ({ data }) => {
  // console.log(data.receiverImageUrl, data.receiverImageUrl === "null");
  const result = data?.messages[0];

  return (
    <Link
      href="/inbox/1"
      className="py-[0.2rem] fluid grid [grid-template-columns:70px_5fr_1fr] space-x-[0.5rem] hover:bg-gray-100 cursor-pointer"
    >
      <div
        aria-label="user image"
        className="h-[60px] w-[60px] rounded-[50%] overflow-hidden bg-gray-200"
      >
        {data.receiverImageUrl !== "null" && (
          <Image
            height={60}
            width={60}
            //@ts-ignore
            src={data.receiverImageUrl}
            className="rounded-full border-[1px] border-gray-200"
            alt=""
          />
        )}
      </div>

      <div className="space-y-[5px] px-[0.5rem] overflow-hidden">
        <h1 className="user display name font-[500]">
          {data.receiverDisplayName}
        </h1>
        <p
          aria-label="user last message"
          className={`${
            result.isSeen ? "font-[400]" : "font-[700]"
          } overflow-hidden text-ellipsis`}
        >
          lasteeeeeeeeeeeeeeeee
        </p>
      </div>
      {!result.isSeen && (
        <div className="self-center justify-self-end h-[8px] w-[8px] bg-[#0095f6] rounded-full"></div>
      )}
    </Link>
  );
};
export default UserInboxCard;
