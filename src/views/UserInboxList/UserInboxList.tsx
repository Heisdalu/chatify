import InboxHeader from "@/components/InboxHeader/InboxHeader";
import UserInboxCard from "@/components/InboxList/UserInboxCard";
import InboxNavigation from "@/components/InboxNavigation/InboxNavigation";
import { useWindowSize } from "@uidotdev/usehooks";
const UserInboxList = () => {
  const { height, width } = useWindowSize();

  return (
    <div className="box">
      <InboxNavigation />
      <div className="space-y-[1rem]">
        <InboxHeader />
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
          <UserInboxCard />
          <UserInboxCard />
          <UserInboxCard />
          <UserInboxCard />
          <UserInboxCard />
          <UserInboxCard />
          <UserInboxCard />
          <UserInboxCard />
          <UserInboxCard />
          <UserInboxCard />
          <UserInboxCard />
          <UserInboxCard />
          <UserInboxCard />
          <UserInboxCard />
          <UserInboxCard />
        </div>
      </div>
    </div>
  );
};
export default UserInboxList;
