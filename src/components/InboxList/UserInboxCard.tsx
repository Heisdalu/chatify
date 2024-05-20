import { ChatListTypes } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import LastMessage from "../LastMessage/LastMessage";
import { encryptId } from "@/utlis";

interface Props {
  data: ChatListTypes;
  email: String;
}

const UserInboxCard: FC<Props> = ({ data, email }) => {
  // console.log(data.receiverImageUrl, data.receiverImageUrl === "null");
  // check if the initator was the same as the senderId
  // this affect the link, image and profile name
  // const isSender = email === data.senderId;
  const lastChat = data?.messages[0];
  const image =
    email === data.senderId ? data.receiverImageUrl : data.senderImageUrl;
  const displayName =
    email === data.senderId ? data.receiverDisplayName : data.senderDisplayName;

  return (
    <Link
      href={`/inbox/${data.url}`}
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
            src={image}
            className="rounded-full border-[1px] border-gray-200"
            alt=""
          />
        )}
      </div>

      <div className="space-y-[5px] px-[0.5rem] overflow-hidden">
        <h1 className="user display name font-[500]">{displayName}</h1>
        {lastChat && (
          <div
            aria-label="user last message"
            className={`${
              lastChat?.isSeen ? "font-[400]" : "font-[700]"
            } overflow-hidden text-ellipsis`}
          >
            <LastMessage result={lastChat} />
          </div>
        )}
      </div>
      {lastChat && !lastChat?.isSeen && (
        <div className="self-center justify-self-end h-[8px] w-[8px] bg-[#0095f6] rounded-full"></div>
      )}
    </Link>
  );
};
export default UserInboxCard;
