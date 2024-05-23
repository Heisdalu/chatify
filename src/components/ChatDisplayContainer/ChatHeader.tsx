import Link from "next/link";
import LeftArrow from "../../../public/icons/LeftArrow";
import Image from "next/image";
import Information from "../../../public/icons/Information";
import { UserTypes } from "@/types";

const ChatHeader = ({
  email,
  participant,
}: {
  email: String;
  participant: { sender: UserTypes; receiver: UserTypes };
}) => {
  return (
    <div className="sticky top-[0] bg-white px-[1rem] border-b-[1px] border-b-gray-200 py-[0.5rem] flex items-center space-x-[1rem] ">
      <Link
        href="/inbox"
        className="rounded-[10px] hover:bg-gray-200 md:p-[0.5rem] active:border-gray-300 active:border-[1px]"
        aria-label="Go back"
      >
        <span aria-hidden={true}>
          <LeftArrow />
        </span>
      </Link>
      <div>
        <Image
          height={50}
          width={50}
          alt={
            email === participant.sender.email
              ? participant.receiver.displayName + "pic"
              : participant.sender.displayName + "pic"
          }
          src={
            email === participant.sender.email
              ? `${participant.receiver.profileImageUrl}`
              : `${participant.sender.profileImageUrl}`
          }
          className="rounded-full border-[1px] border-gray-200"
        />
      </div>
      <h1 className="text-[1.1rem] font-[600] overflow-hidden text-ellipsis">
        {email === participant.sender.email
          ? participant.receiver.displayName
          : participant.sender.displayName}
      </h1>

      <div
        className=" ml-[auto] flex items-center"
        style={{ marginLeft: "auto" }}
        title="user profile"
      >
        <Link href="/inbox/135768/profile" className="active:bg-gray-400">
          <Information />
        </Link>
      </div>
    </div>
  );
};
export default ChatHeader;
