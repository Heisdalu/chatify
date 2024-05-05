import Logo from "../Logo/Logo";
import Image from "next/image";
import UserInboxCard from "../InboxList/UserInboxCard";
import InboxUserLoading from "./InboxUserLoading";

const InboxLoading = () => {
  return (
    <div className="">
      <div className="px-[1rem] py-[1.5rem] space-y-[1rem]">
        <div className="h-[40px] effect"></div>
        <div className="h-[25px] w-[120px] effect"></div>
        <div className="space-y-[1rem]">
          <InboxUserLoading />
          <InboxUserLoading />
          <InboxUserLoading />
          <InboxUserLoading />
        </div>
      </div>
    </div>
  );
};
export default InboxLoading;
